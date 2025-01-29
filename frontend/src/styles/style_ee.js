// src/styles/style_ee.js

export default function Style_EE() {
	let style;

	style = document.querySelector('style');

	if (!style) {
		style = document.createElement('style');
		style.type = 'text/css';
		document.head.appendChild(style);
	}

	style.innerHTML += `
	.BSquare {
		width: 213px;
		height: 213px;
		border-radius: 25px;
		background-color: #d8f2ff;
	}
	.MornitoringBox {
		width: 926px;
		height: 213px;
		border-radius: 25px;
		background-color: #d8f2ff;
	}
	.LogoBox {
		width: 100px;
		height: 100px;
		background-color: #d9d9d9;
	}
	.MenuSelectBox {
		width: 142px;
		height: 62px;
		border-radius: 10px;
		background-color: #d9d9d9;
		cursor: pointer;
	}
	.MenuBox {
		width: 213px;
		height: 662px;
		border-radius: 25px;
		background-color: #d9fff7;
	}
	.ShowBox {
		width: 926px;
		height: 662px;
		border-radius: 25px;
		background-color: #d9fff7;
	}
	.ShowBox2 {
		width: 332px;
		height: 662px;
		border-radius: 25px;
		background-color: #d9fff7;
	`;
}