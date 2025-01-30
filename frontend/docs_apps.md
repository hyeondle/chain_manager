app.js는 spa 구성에 있어 중심점이 되며, 모든 스크립트의 공통 자원을 들고있다.

구성

0. 페이지는
common, page, script 3가지로 구성이 되며,
common은 모든 화면에서 공통으로 사용/나타내질 요소를,
page는 라우팅 된 페이지에서 보여줄 내용을,
script는 SPA의 상태 관리 및 초기화를 담당한다.
스크립트는 app.js로 시작한다.

1. constructor
각 컴포넌트가 공통으로 필요로 하는 의존성을 모아둔
ObjectForDI를 생성한다.

ObjectForDI = {
	$parent: this.root,			//root (최상위 요소)
	$common: this.common,		//공통 UI
	$page: this.page,			//개별 페이지
	setstate: this.setState.bind(this),	//상태 변경 함수 (현재 불필요)
	state: this.state,			//상태 요소
	router: null				//라우터
};

이렇게 구성되어 있다.

setState의 경우 router에 bind되어 있으며, 주소 갱신을 위해 사용되므로 ObjectForDI내부에는 필요없는 상태로 판단된다.

생성자의 진행 순서는 다음과 같다.
-1)
state가 세션 스토리지에 존재할 시, 해당 요소를 불러오며 없을 시 새로 생성한다.
-2)
이후, proxy 설정을 통해 state갱신이 이루어 질 시 자동으로 변수의 갱신이 이루어진다.
-3)
ObjectForDI에 추가할 요소들을 매칭시켜준다
-4)
ObjectForDI를 생성한다.
-5)
라우터를 생성 후, 라우터를 매칭시켜준다
-6)
공통 요소를 생성 후, 공통요소를 매칭시켜준다.
-7)
입구 페이지로 돌아간다 (해당 부분에서 state의 locate를 보고 이동할지 로직 결정 필요)

2. 기타 함수
히스토리 관리, 뒤로가기 앞으로가기 등에 관한 요소가 추가되어있다.



*별도*
이전에는 이곳에 공통 요소를 추가했으나, common요소를 도입한 이후 기본 스크립트 구성이 단순해졌다. 이곳에는 앞으로 공통 함수나 기능 위주로 추가하는 것이 바람직하다고 판단한다.
