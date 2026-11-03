/* =================================
   KARTAVIY — ACCOUNT SYSTEM
================================= */

const Account = {

    register(name, password) {
        name = name.trim();

        if (name.length < 3) {
            return {success:false, message:"Минимум 3 символа в нике."};
        }

        if (password.length < 6) {
            return {success:false, message:"Пароль должен содержать минимум 6 символов."};
        }

        const accounts = this.getAccounts();

        if (accounts.some(a => a.name.toLowerCase() === name.toLowerCase())) {
            return {success:false, message:"Такой аккаунт уже существует."};
        }

        const account = {
            id: "K" + Date.now(),
            name,
            password,
            level: 1,
            experience: 0,
            balance: 0,
            created: new Date().toISOString()
        };

        accounts.push(account);

        localStorage.setItem(
            "kartaviy_accounts",
            JSON.stringify(accounts)
        );

        this.login(name, password);

        return {success:true, message:"Аккаунт создан!"};
    },

    login(name, password) {
        const accounts = this.getAccounts();

        const account = accounts.find(a =>
            a.name.toLowerCase() === name.trim().toLowerCase() &&
            a.password === password
        );

        if (!account) {
            return {success:false, message:"Неверный ник или пароль."};
        }

        localStorage.setItem(
            "kartaviy_session",
            account.id
        );

        return {success:true, message:"Добро пожаловать, " + account.name + "!"};
    },

    logout() {
        localStorage.removeItem("kartaviy_session");
        location.reload();
    },

    getAccounts() {
        return JSON.parse(
            localStorage.getItem("kartaviy_accounts") || "[]"
        );
    },

    getCurrent() {
        const id = localStorage.getItem("kartaviy_session");

        if (!id) return null;

        return this.getAccounts().find(a => a.id === id) || null;
    },

    update(data) {
        const current = this.getCurrent();

        if (!current) return false;

        const accounts = this.getAccounts();

        const index = accounts.findIndex(a => a.id === current.id);

        if (index === -1) return false;

        accounts[index] = {...accounts[index], ...data};

        localStorage.setItem(
            "kartaviy_accounts",
            JSON.stringify(accounts)
        );

        return true;
    },

    isLoggedIn() {
        return this.getCurrent() !== null;
    }
};

window.Account = Account;

console.log("KARTAVIY ACCOUNT SYSTEM READY");
