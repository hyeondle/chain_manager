// src/core/component.js

export default class Component {

	constructor(ObjectForDI) {
		this.$parent = ObjectForDI.$parent;
		this.$common = ObjectForDI.$common;
		this.$page = ObjectForDI.$page;
		this.router = ObjectForDI.router;
		this.setState = ObjectForDI.setState;
		this.state = ObjectForDI.state;
	}

	template() { // 함수 안에 html을 넣어서 반환
		console.log("empty template");
		return '';
	}

	#render() {	// 렌더링
		const template = this.template();
		this.$page.innerHTML = template;
	}

	setEvent() {} // 이벤트 설정

	renderSequnce(state) {	// 렌더링 순서
		this.state = state;	// state 설정
		this.#render();		// html 렌더링
		this.setEvent();	// 이벤트 설정
		// additional function (html 이미지 삽입 등)
	}
}