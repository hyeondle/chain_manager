// src/apps/entry/signup/franchisee.js

import Component from "../../../core/component.js";

export default class Franchisee extends Component {

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
		const confirmButton = this.$page.querySelector("#confirm");
		if (confirmButton) {
			confirmButton.addEventListener("click", () => {
				const formData = {
					id: document.querySelector("#id").value,
					password: document.querySelector("#password").value,
					email: document.querySelector("#email").value,
					region_number: document.querySelector("#region_number").value,
					phone_number: document.querySelector("#phone_number").value,
					company_name: document.querySelector("#company_name").value,
				};
				// console.log("전송할 데이터:", JSON.stringify(formData));

				fetch("/api/accounts/register/franchisee/", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(formData)
				})
				.then(response => {
					if (!response.ok) {
						throw new Error(`HTTP error! Status: ${response.status}`);
					}
					return response.json();
				})
				.then(() => {
					alert("가입이 완료되었습니다.");
					window.location.href = "/entry";
					// this.router.navigate("/entry");
				})
				.catch((error) => {
					console.error("Error:", error);
					alert("가입에 실패하였습니다.");
					// 실패 이유 나중에 출력하기
				});
			});
		}
	}


	async renderSequnce(state) {
		this.state = state;
		this.htmlContent = await this.init();
		this.#render();
		this.setEvent();
	}

	async init() {
		try {
			const response = await fetch("/src/pages/signup/signup_franchisee.html");
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

	addText() {

	}
}