/* =================================
   KARTAVIY — MAIN SYSTEM
   Главная логика игровой платформы
================================= */

const KARTAVIY = {
    name: "KARTAVIY",
    version: "1.0.0",
    year: 2026,

    games: [
        {id:"black-russia",name:"BLACK RUSSIA RP",file:"black-russia.html"},
        {id:"pocket-racing",name:"POCKET RACING",file:"pocket-racing.html"},
        {id:"horror",name:"KARTAVIY HORROR",file:"horror.html"},
        {id:"gas-station",name:"GAS STATION",file:"gas-station.html"},
        {id:"pvz",name:"PVZ SIMULATOR",file:"pvz.html"},
        {id:"casino",name:"KARTAVIY CASINO",file:"casino.html"},
        {id:"minecraft",name:"MINECRAFT",file:"minecraft.html"}
    ],

    getPlayer() {
        return JSON.parse(
            localStorage.getItem("kartaviy_player") || "null"
        );
    },

    createPlayer(name) {
        const player = {
            id: "K" + Date.now(),
            name: name.trim(),
            balance: 0,
            level: 1,
            experience: 0,
            achievements: [],
            created: new Date().toISOString()
        };

        localStorage.setItem(
            "kartaviy_player",
            JSON.stringify(player)
        );

        return player;
    },

    updatePlayer(data) {
        const player = this.getPlayer();
        if (!player) return false;

        const updated = {...player, ...data};

        localStorage.setItem(
            "kartaviy_player",
            JSON.stringify(updated)
        );

        return true;
    },

    openGame(id) {
        const game = this.games.find(item => item.id === id);

        if (!game) {
            alert("Проект не найден.");
            return;
        }

        window.location.href = game.file;
    },

    addExperience(amount) {
        const player = this.getPlayer();
        if (!player) return;

        let experience = player.experience + amount;
        let level = player.level;

        while (experience >= level * 100) {
            experience -= level * 100;
            level++;
        }

        this.updatePlayer({
            experience,
            level
        });
    },

    logout() {
        localStorage.removeItem("kartaviy_player");
        location.reload();
    }
};

window.KARTAVIY = KARTAVIY;

console.log(
    "KARTAVIY SYSTEM READY",
    KARTAVIY.version
);
