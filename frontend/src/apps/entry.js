// src/apps/entry.js

import Component from "../core/component.js";
import Style_Entry from "../styles/style_entry.js";
import eT from "../styles/lang/entry.js";

export default class Entry extends Component {
    constructor(ObjectForDI) {
        super(ObjectForDI);
    }

    template() {
        Style_Entry();
        return this.htmlContent;
    }

    #render() {
        const template = this.template();

        if (this.$page) {
            this.$page.innerHTML = template;
        }
    }

    setEvent() {
        const loginButton = this.$page.querySelector("#login");
        if (loginButton) {
            loginButton.addEventListener("click", () => this.router.navigate("/login"));
        }

        const signupButton = this.$page.querySelector("#signup");
        if (signupButton) {
            signupButton.addEventListener("click", () => this.router.navigate("/signup"));
        }
    }

    async renderSequnce(state) {
        this.state = state;

        if (this.state.authed !== 0) {
            this.router.navigate("/main");
            return;
        }

        this.htmlContent = await this.init();
        this.#render();
        this.setEvent();
        this.addText();
        this.addImage();
    }

    ///
    /// func
    ///

    async init() {
        try {
            const response = await fetch("/src/pages/entry_page.html");
            if (!response.ok) {
                throw new Error("Failed to load entry.html");
            }

            const htmlContent = await response.text();

            return htmlContent;
        } catch (error) {
            console.error(error);
            this.$parent.innerHTML = `<p>Error loading page</p>`;
        }
    }

    addText() {
        const loginButton = this.$page.querySelector("#login");
        if (loginButton) {
            loginButton.innerHTML = eT.login[this.state.lang];
            loginButton.style.textAlign = "center";
            loginButton.style.fontSize = "24px";
            loginButton.style.fontWeight = "bold";

        }

        const signupButton = this.$page.querySelector("#signup");
        if (signupButton) {
            signupButton.innerHTML = eT.signup[this.state.lang];
            signupButton.style.textAlign = "center";
            signupButton.style.fontSize = "24px";
            signupButton.style.fontWeight = "bold";
        }
    }

    addImage() {
        // const entry = this.$parent.querySelector(".page");
        // if (entry) {
        //     entry.style.width = "100vw";
        //     entry.style.height = "100vh";
        //     entry.style.backgroundImage = "url('/src/static/img/background.png')";
        //     entry.style.backgroundSize = "cover";
        //     entry.style.backgroundRepeat = "no-repeat";
        //     entry.style.backgroundPosition = "center";
        // }
    }
}