// src/apps/main/franchisee.js

import Component from "../../core/component.js";
import Style_EE from "../../styles/style_ee.js";

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
		// 정보 받아와서 글씨 갱신
		return ;
	}

	async addImage() {
		// 이미지 받아와서 이미지 갱신
		return ;
	}
}