// src/apps/main/franchisee.js

import Component from "../../core/component.js";
import Style_EE from "../../styles/style_ee.js";
import eeT from "../../styles/lang/franchisee.js"

export default class Franchisee extends Component {

	constructor(ObjectForDI) {
		super(ObjectForDI);
	}

	template() {
		Style_EE();
		return this.htmlContent;
	}

	#render() {
		const template = this.template();
		this.$page.innerHTML = template;
	}

	setEvent() {
		const buttonArrange = this.$page.querySelector("#arrange");
		if (buttonArrange) {
			buttonArrange.addEventListener("click", () => this.router.navigate("/franchisee/arrange"));
		}
		const buttonMenu = this.$page.querySelector("#menu");
		if (buttonMenu) {
			buttonMenu.addEventListener("click", () => this.router.navigate("/franchisee/menu"));
		}
		const buttonStock = this.$page.querySelector("#stock");
		if (buttonStock) {
			buttonStock.addEventListener("click", () => this.router.navigate("/franchisee/stock"));
		}
		const buttonStatics = this.$page.querySelector("#statics");
		if (buttonStatics) {
			buttonStatics.addEventListener("click", () => this.router.navigate("/franchisee/statics"));
		}
		const buttonSetting = this.$page.querySelector("#setting");
		if (buttonSetting) {
			buttonSetting.addEventListener("click", () => this.router.navigate("/franchisee/setting"));
		}
	}

	async renderSequnce(state) {
		this,state = state;
		this.htmlContent = await this.init();
		this.#render();
		this.setEvent();
		await this.addText();
		await this.addImage();
	}

	async init() {
		try {
			const response = await fetch("/src/pages/franchisee.html");
			if (!response.ok) {
				throw new Error("Failed to load franchisee.html");
			}

			const htmlContent = await response.text();

			return htmlContent;
		} catch (error) {
			console.error(error);
			this.$page.innerHTML = "Failed to load franchisee.html";
		}
	}

	async addText() {
		const buttonArrange = this.$page.querySelector("#arrange");
		if (buttonArrange) {
			buttonArrange.innerHTML = eeT.arrange[this.state.lang];
			buttonArrange.style.textAlign = "center";
            buttonArrange.style.fontSize = "24px";
            buttonArrange.style.fontWeight = "bold";
		}
		const buttonMenu = this.$page.querySelector("#menu");
		if (buttonMenu) {
			buttonMenu.innerHTML = eeT.menu[this.state.lang];
			buttonMenu.style.textAlign = "center";
			buttonMenu.style.fontSize = "24px";
			buttonMenu.style.fontWeight = "bold";
		}
		const buttonStock = this.$page.querySelector("#stock");
		if (buttonStock) {
			buttonStock.innerHTML = eeT.stock[this.state.lang];
			buttonStock.style.textAlign = "center";
			buttonStock.style.fontSize = "24px";
			buttonStock.style.fontWeight = "bold";
		}
		const buttonStatics = this.$page.querySelector("#statics");
		if (buttonStatics) {
			buttonStatics.innerHTML = eeT.statics[this.state.lang];
			buttonStatics.style.textAlign = "center";
			buttonStatics.style.fontSize = "24px";
			buttonStatics.style.fontWeight = "bold";
		}
		const buttonSetting = this.$page.querySelector("#setting");
		if (buttonSetting) {
			buttonSetting.innerHTML = eeT.setting[this.state.lang];
			buttonSetting.style.textAlign = "center";
			buttonSetting.style.fontSize = "24px";
			buttonSetting.style.fontWeight = "bold";
		}
	}

	async addImage() {
		// 이미지 받아와서 이미지 갱신
		return ;
	}
}