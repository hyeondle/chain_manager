// src/apps/login.js

import Component from "../core/component.js";
import Style_Entry from "../styles/style_entry.js";

export default class Entry extends Component {
    constructor(ObjectForDI) {
        super(ObjectForDI);

        if (ObjectForDI.state.authed !== 0) {
            this.router.navigate("/main");
        }
    }

    template() {
        Style_Entry();
        return this.htmlContent;
    }

    #render() {
        const template = this.template();

        if (this.$common) {
            this.$common.innerHTML = this.htmlContentCommon;
        }

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
        this.htmlContentCommon = await this.init_common();
        this.htmlContent = await this.init();
        this.#render();
        this.setEvent();
        this.addText();
        this.addImage();
    }

    ///
    /// func
    ///

    async init_common() {
        try {
            const response = await fetch("/src/pages/entry_common.html");
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
            loginButton.innerHTML = "Log in";
            loginButton.style.textAlign = "center";
            loginButton.style.fontSize = "24px";
            loginButton.style.fontWeight = "bold";

        }

        const signupButton = this.$page.querySelector("#signup");
        if (signupButton) {
            signupButton.innerHTML = "Sign up";
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