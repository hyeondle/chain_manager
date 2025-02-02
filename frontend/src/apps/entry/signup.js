// src/apps/entry/signup.js

import Component from "../../core/component.js";
import suT from "../../styles/lang/signup.js";

export default class Signup extends Component {

	constructor(ObjectForDI) {
		super(ObjectForDI);
	}

	template() {
		return this.htmlContent;
	}

	#render() {
		const template = this.template();
		this.$page.innerHTML = template;
	}

	setEvent() {
		const backButton = this.$page.querySelector("#back");
		if (backButton) {
			backButton.addEventListener("click", () => this.router.navigate("/entry"));
		}

		const headquarterButton = this.$page.querySelector("#headquarter");
		if (headquarterButton) {
			headquarterButton.addEventListener("click", () => this.router.navigate("/signup/headquarter"));
		}

		const franchiseeButton = this.$page.querySelector("#franchisee");
		if (franchiseeButton) {
			franchiseeButton.addEventListener("click", () => this.router.navigate("/signup/franchisee"));
		}

		const individualButton = this.$page.querySelector("#individual");
		if (individualButton) {
			individualButton.addEventListener("click", () => this.router.navigate("/signup/individual"));
		}
	}

	async renderSequnce(state) {
		this.state = state;
		this.htmlContent = await this.init();
		this.#render();
		this.setEvent();
		this.addText();
		this.addImage();
	}

	async init() {
		try {
			const response = await fetch("/src/pages/signup/signup.html");
			if (!response.ok) {
				throw new Error("Failed to load signup.html");
			}

			const htmlContent = await response.text();

			return htmlContent;
		} catch (error) {
			console.error(error);
			this.$page.innerHTML = "Failed to load signup.html";
		}
	}

	addText() {
		const headquarterButton = this.$page.querySelector("#headquarter");
		if (headquarterButton) {
			headquarterButton.innerHTML = suT.headquarter[this.state.lang];
			headquarterButton.style.textAlign = "center";
			headquarterButton.style.fontSize = "24px";
			headquarterButton.style.fontWeight = "bold";
		}

		const franchiseeButton = this.$page.querySelector("#franchisee");
		if (franchiseeButton) {
			franchiseeButton.innerHTML = suT.franchisee[this.state.lang];
			franchiseeButton.style.textAlign = "center";
			franchiseeButton.style.fontSize = "24px";
			franchiseeButton.style.fontWeight = "bold";
		}

		const individualButton = this.$page.querySelector("#individual");
		if (individualButton) {
			individualButton.innerHTML = suT.individual[this.state.lang];
			individualButton.style.textAlign = "center";
			individualButton.style.fontSize = "24px";
			individualButton.style.fontWeight = "bold";
		}
	}

	addImage() {
		const returnButton = this.$page.querySelector("#back");
		if (returnButton) {
			returnButton.style.backgroundImage = "url('/src/static/img/back-button.png')";
			returnButton.style.backgroundSize = "cover";
			returnButton.style.backgroundRepeat = "no-repeat";
			returnButton.style.backgroundPosition = "center";
		}
	}
}