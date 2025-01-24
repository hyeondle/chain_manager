// src/app.js

import Router from "./routers/router.js";

class app {
    constructor() {
        this.state = {
            locate: window.location.pathname,
            login: parseInt(sessionStorage.getItem("login")) || 0,
            authed: 0,
            visitor: 1,
        };

        this.root = document.querySelector('.app');
        this.common = document.querySelector('.common');
        this.page = document.querySelector('.page');

        const ObjectForDI = { 
            $parent: this.root, 
            $common: this.common,
            $page: this.page,
            setstate: this.setState.bind(this), 
            state: this.state,
            router: null
        };

        this.router = new Router(
            ObjectForDI,
            this.setState.bind(this)
        );

        ObjectForDI.router = this.router;

        this.router.navigate('/entry');

        this.initPopStateEvent();
    }

    setState(newState) {
        this.state = { ...this.state, ...newState };
        sessionStorage.setItem("login", this.state.login);
    }

    historyRouterPush(locate) {
        if (window.location.pathname !== locate) {
            window.history.pushState({}, "", locate);
        }
    }

    initPopStateEvent() {
        window.addEventListener("popstate", () => {
            const login_ = parseInt(sessionStorage.getItem("login")) || 0
            const updatedState = { locate: window.location.pathname, login: login_ };
            this.setState(updatedState);
            this.router.navigate(updatedState.locate);
        });
    }

    getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return "";
    }
}

window.app = new app();