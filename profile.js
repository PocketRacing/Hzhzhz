/* =================================
   KARTAVIY — PLAYER PROFILE
================================= */

const Profile = {

    getPlayer() {
        if (!window.Account) return null;
        return Account.getCurrent();
    },

    getLevelProgress(player) {
        if (!player) return 0;

        const required = player.level * 100;

        return Math.min(
            100,
            Math.round((player.experience / required) * 100)
        );
    },

    getAchievements(player) {
        if (!player) return [];

        return player.achievements || [];
    },

    render(elementId) {
        const container = document.getElementById(elementId);

        if (!container) return;

        const player = this.getPlayer();

        if (!player) {
            container.innerHTML = `
                <div class="profile-empty">
                    <h2>Профиль игрока</h2>
                    <p>Войди в аккаунт KARTAVIY.</p>
                </div>
            `;
            return;
        }

        const progress = this.getLevelProgress(player);

        container.innerHTML = `
            <div class="player-profile">

                <div class="player-avatar">
                    ${this.escape(player.name.charAt(0).toUpperCase())}
                </div>

                <h2>${this.escape(player.name)}</h2>

                <p>ID: ${this.escape(player.id)}</p>

                <div class="profile-stats">
                    <div>
                        <strong>${player.level}</strong>
                        <span>Уровень</span>
                    </div>

                    <div>
                        <strong>${player.experience}</strong>
                        <span>Опыт</span>
                    </div>

                    <div>
                        <strong>${player.balance || 0}</strong>
                        <span>Баланс</span>
                    </div>
                </div>

                <div class="experience-bar">
                    <div style="width:${progress}%"></div>
                </div>

                <p>Прогресс уровня: ${progress}%</p>

                <p>Достижений: ${this.getAchievements(player).length}</p>

                <button onclick="Account.logout()">
                    Выйти из аккаунта
                </button>

            </div>
        `;
    },

    escape(value) {
        return String(value).replace(/[&<>"']/g, char => ({
            "&":"&amp;",
            "<":"&lt;",
            ">":"&gt;",
            '"':"&quot;",
            "'":"&#39;"
        })[char]);
    }
};

window.Profile = Profile;

console.log("KARTAVIY PROFILE SYSTEM READY");
