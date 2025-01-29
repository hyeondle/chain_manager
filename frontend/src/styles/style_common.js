// src/styles/style_common.js

export default function Style_Common() {
	let style;

	style = document.querySelector('style');

	if (!style) {
		style = document.createElement('style');
		style.type = 'text/css';
		document.head.appendChild(style);
	}

	style.innerHTML += `
	.LangIcon {
		width: 50px;
		height: 50px;
		border-radius: 9999px;
		cursor: pointer;
		border: solid 1px #000;
	}
	`;
}