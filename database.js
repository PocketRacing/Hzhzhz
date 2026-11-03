/* =================================
   KARTAVIY — DATABASE SYSTEM
================================= */

const Database = {

    prefix: "kartaviy_db_",

    get(key, fallback = null) {
        try {
            const value = localStorage.getItem(this.prefix + key);
            return value === null ? fallback : JSON.parse(value);
        } catch (error) {
            console.error("Database read error:", error);
            return fallback;
        }
    },

    set(key, value) {
        try {
            localStorage.setItem(
                this.prefix + key,
                JSON.stringify(value)
            );
            return true;
        } catch (error) {
            console.error("Database write error:", error);
            return false;
        }
    },

    remove(key) {
        localStorage.removeItem(this.prefix + key);
    },

    clear() {
        Object.keys(localStorage)
            .filter(key => key.startsWith(this.prefix))
            .forEach(key => localStorage.removeItem(key));
    },

    getGameData(gameId) {
        return this.get("game_" + gameId, {});
    },

    saveGameData(gameId, data) {
        return this.set("game_" + gameId, data);
    },

    getRecord(gameId) {
        return this.get("record_" + gameId, 0);
    },

    saveRecord(gameId, score) {
        const current = this.getRecord(gameId);

        if (score > current) {
            this.set("record_" + gameId, score);
            return true;
        }

        return false;
    },

    getHistory() {
        return this.get("history", []);
    },

    addHistory(action) {
        const history = this.getHistory();

        history.unshift({
            action,
            date: new Date().toISOString()
        });

        return this.set("history", history.slice(0, 100));
    },

    getSettings() {
        return this.get("settings", {
            sound: true,
            music: true,
            language: "ru",
            theme: "dark"
        });
    },

    updateSettings(settings) {
        const current = this.getSettings();

        return this.set("settings", {
            ...current,
            ...settings
        });
    }
};

window.Database = Database;

console.log("KARTAVIY DATABASE READY");
