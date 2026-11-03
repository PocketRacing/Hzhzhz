/* =================================
   KARTAVIY — SHARED SYSTEM
================================= */

const Shared = {

    version: "1.0.0",

    notify(message, type = "info") {
        let box = document.getElementById("kartaviy-notifications");

        if (!box) {
            box = document.createElement("div");
            box.id = "kartaviy-notifications";

            Object.assign(box.style, {
                position: "fixed",
                top: "20px",
                right: "20px",
                zIndex: "99999",
                display: "flex",
                flexDirection: "column",
                gap: "10px"
            });

            document.body.appendChild(box);
        }

        const item = document.createElement("div");

        const colors = {
            info: "#e87822",
            success: "#238b55",
            error: "#c73535",
            warning: "#c58a20"
        };

        item.textContent = message;

        Object.assign(item.style, {
            background: "#19191e",
            border: "1px solid " + (colors[type] || colors.info),
            color: "#fff",
            padding: "15px 20px",
            borderRadius: "10px",
            fontSize: "14px",
            boxShadow: "0 5px 25px #0008",
            maxWidth: "300px",
            opacity: "0",
            transition: "opacity .2s"
        });

        box.appendChild(item);

        requestAnimationFrame(() => {
            item.style.opacity = "1";
        });

        setTimeout(() => {
            item.style.opacity = "0";

            setTimeout(() => item.remove(), 250);
        }, 3000);
    },

    getPlayer() {
        return window.Account?.getCurrent() || null;
    },

    requireLogin() {
        if (!this.getPlayer()) {
            this.notify("Сначала войдите в аккаунт!", "warning");
            return false;
        }

        return true;
    },

    openProject(project) {
        const game = window.KARTAVIY?.games.find(
            item => item.id === project
        );

        if (!game) {
            this.notify("Проект не найден.", "error");
            return;
        }

        location.href = game.file;
    },

    getPlayerName() {
        return this.getPlayer()?.name || "Гость";
    },

    getPlayerLevel() {
        return this.getPlayer()?.level || 0;
    },

    addAchievement(id) {
        const player = this.getPlayer();

        if (!player) return false;

        const achievements = player.achievements || [];

        if (achievements.includes(id)) return false;

        const updated = [
            ...achievements,
            id
        ];

        Account.update({
            achievements: updated
        });

        this.notify("Получено новое достижение!", "success");

        return true;
    },

    emit(event, data = {}) {
        window.dispatchEvent(
            new CustomEvent("kartaviy:" + event, {
                detail: data
            })
        );
    },

    on(event, callback) {
        window.addEventListener(
            "kartaviy:" + event,
            e => callback(e.detail)
        );
    }
};

window.Shared = Shared;

console.log("KARTAVIY SHARED SYSTEM READY");
