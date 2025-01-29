다중 언어 지원은 lang/docs.txt 참고

모든 코드는 다음 양식을 따른다.

export default function Style_<페이지명>() {
	// 스타일 선언
	let style;
	// 스타일 존재 시 기존 스타일 사용
	style = document.querySelector('style')
	// 스타일 미존재 시 새 스타일 생성 후, DOM에 추가
	if (!style) {
		style = document.createElement('style');
		style.type = 'text/css';
		document.head.appendChild(style);
	}

	// css 스타일 서식에 맞추어 제작
	style.innerHTML += `

	`;
}

이후, 각 컴포넌트에서 호출 시, template 부분에서 호출하도록 한다.