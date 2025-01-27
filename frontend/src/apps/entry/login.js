// src/apps/entry/login.js

import Component from "../../core/component.js";

export default class Login extends Component {

	constructor(ObjectForDI) {
        super(ObjectForDI);
	}

	template() { // 함수 안에 html을 넣어서 반환
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

		// 2025/01/25
		// 로그인 기능 구현하고 연결할 것
		const confirmButton = this.$page.querySelector("#confirm");
		if (confirmButton) {
			confirmButton.addEventListener("click", () => {
				const id = this.$page.querySelector("#id");
				const pw = this.$page.querySelector("#pw");
				if (id.value === "test1" && pw.value === "test1") {
					this.state.authed = 1;
					this.router.navigate("/main");
				} else if (id.value === "test2" && pw.value === "test2") {
					this.state.authed = 2;
					this.router.navigate("/main");
				} else {
					this.state.authed = 0;
				}
				
			});
		}

		const iKakao = this.$page.querySelector("#iKakao");
		if (iKakao) {
			
		}

		const iLine = this.$page.querySelector("#iLine");
		if (iLine) {
			
		}

		const iGoogle = this.$page.querySelector("#iGoogle");
		if (iGoogle) {
			
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
			const response = await fetch("/src/pages/login.html");
			if (!response.ok) {
				throw new Error("Failed to load login.html");
			}

			const htmlContent = await response.text();

			return htmlContent;
		} catch (error) {
			console.error(error);
			this.$page.innerHTML = "Failed to load login.html";
		}
	}

	addText() {
		const idField = this.$page.querySelector("#id");
		if (idField) {
			idField.placeholder = "ID or Phone Number";
			idField.style.border = "none";
			idField.style.paddingLeft = "10px";
			idField.style.textAlign = "center";
			idField.style.fontSize = "14px";
			idField.style.outline = "none";
			idField.style.boxSizing = "border-box";
			idField.addEventListener("focus", () => {
				idField.style.textAlign = "left";
			});
			idField.addEventListener("blur", () => {
				if (idField.value === "") {
					idField.style.textAlign = "center";
				}
			});
		}

		const pwField = this.$page.querySelector("#pw");
		if (pwField) {
			pwField.placeholder = "Password";
			pwField.style.border = "none";
			pwField.style.paddingLeft = "10px";
			pwField.style.textAlign = "center";
			pwField.style.fontSize = "14px";
			pwField.style.outline = "none";
			pwField.style.boxSizing = "border-box";
			pwField.addEventListener("focus", () => {
				pwField.style.textAlign = "left";
			});
			pwField.addEventListener("blur", () => {
				if (pwField.value === "") {
					pwField.style.textAlign = "center";
				}
			});
		}

		const confirmButton = this.$page.querySelector("#confirm");
		if (confirmButton) {
			confirmButton.innerHTML = "Login";
			confirmButton.style.display = "flex";
			confirmButton.style.alignItems = "center";
			confirmButton.style.justifyContent = "center";
			confirmButton.style.textAlign = "center";
			confirmButton.style.fontSize = "14px";
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

		const iKakao = this.$page.querySelector("#iKakao");
		if (iKakao) {
			iKakao.style.backgroundImage = "url('/src/static/img/kakao.png')";
			iKakao.style.backgroundSize = "cover";
			iKakao.style.backgroundRepeat = "no-repeat";
			iKakao.style.backgroundPosition = "center";
		}

		const iline = this.$page.querySelector("#iLine");
		if (iline) {
			iline.style.backgroundImage = "url('/src/static/img/line.png')";
			iline.style.backgroundSize = "cover";
			iline.style.backgroundRepeat = "no-repeat";
			iline.style.backgroundPosition = "center";
		}

		const igoogle = this.$page.querySelector("#iGoogle");
		if (igoogle) {
			igoogle.style.backgroundImage = "url('/src/static/img/google.png')";
			igoogle.style.backgroundSize = "cover";
			igoogle.style.backgroundRepeat = "no-repeat";
			igoogle.style.backgroundPosition = "center";
		}
	}
}