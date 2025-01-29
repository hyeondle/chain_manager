// src/styles/style_entry.js

export default function Style_Entry() {
    let style;

	style = document.querySelector('style');

	if (!style) {
		style = document.createElement('style');
		style.type = 'text/css';
		document.head.appendChild(style);
	}

    style.innerHTML += `
    .Entry {
        width: 1440px;
        height: 900px;
        padding: 0 20px 112px 520px;
        background-color: #fff;
    }
    .BBox {
        width: 450px;
        height: 600px;
        border-radius: 100px 100px 100px 0;
        background-color: #d8f2ff;
    }
    .BBox2 {
        width: 450px;
        height: 600px;
        border-radius: 100px;
        background-color: #d8f2ff;
    }
    .CBoxBig {
        width: 370px;
        height: 100px;
        border-radius: 20px;
        background-color: #fff4fd;
        cursor: pointer;
    }
    .CBoxSmall {
        width: 370px;
        height: 60px;
        border-radius: 20px;
        background-color: #fff4fd;
        cursor: pointer;
    }
    .CBoxSmall2 {
        width: 370px;
        height: 60px;
        border-radius: 20px;
        background-color: #ffd6f6;
        cursor: pointer;

    }
    .IconBox {
        width: 50px;
        height: 50px;
        border-radius: 9999px;
        cursor: pointer;
        border: solid 1px #000;
    }
    .LIBox {
        width: 95px;
        height: 95px;
        border-radius: 9999px;
        cursor: pointer;
    }
    .LBox {
        width: 30px;
        height: 20px;
        background-color: #d9d9d9;
        cursor: pointer;
    }
    .SBox {
        width: 1062px;
        height: 600px;
        border-radius: 100px;
        background-color: #d8f2ff;
    }
    `;
}