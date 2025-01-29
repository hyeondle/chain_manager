import Component from "../core/component.js";
import Style_Common from "../styles/style_common.js";

export default class Common extends Component {
	constructor(ObjectForDI) {
		super(ObjectForDI);
	}

	template() {
		Style_Common();
		return this.htmlContent;
	}

	#render() {
		const template = this.template();

		if (this.$common) {
			this.$common.innerHTML = template;
		}
	}

	setEvent() {
		const langButton = this.$common.querySelector("#lang");
        if (langButton) {
            langButton.innerHTML = this.state.lang;
            langButton.addEventListener("click", () => {
                if (this.state.lang === "ko") {
                    this.state.lang = "en";
                    langButton.innerHTML = "en";
                } else if (this.state.lang === "en") {
                    this.state.lang = "jp";
                    langButton.innerHTML = "jp";
                } else {
                    this.state.lang = "ko";
                    langButton.innerHTML = "ko";
                }
            });
        }
	}

	async init() {
		try {
			const response = await fetch("/src/pages/common.html");
			if (!response.ok) {
				throw new Error("Failed to load common.html");
			}

			const htmlContent = await response.text();

			return htmlContent;
		} catch (error) {
			console.error(error);
			this.$common.innerHTML = `<p>Error loading page</p>`;
		}
	}

	async renderSequnce(state) {
		this.state = state;
		this.htmlContent = await this.init();
		this.#render();
		this.setEvent();
	}
}
