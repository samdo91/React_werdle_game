1. 이 프로젝트는 무엇인가?
- 예전에 Vanilla JS 만들었던 wardle을 최근에 배운 기술로 업그레이드 해서 다시 만들었다. 

2. 무엇을 사용하였는가? 

  소스 코드 에디터

    Visual Studio Code


  프로그래밍 언어

    react 


  라이브러리

    emotion/styled
    jotai
 
3.어떻게 사용하였는가?

-1.  react 컴포넌트로 다시 만들었다. 
  
-2.  Vanilla JS에서는 필요 없었던 전역관리를 위하여 jotai를 사용했다.
  
-3. emotion/styled로 태그를 컴포넌트로 해서 스타일을 적용하였다. 
    -여기서 오늘 배운 것 이전에 컴포넌트에 props를 선언하여 구성요소의 스타일을 바꿀 수 있다고 했다. 
     그때는 삼항연산자를 사용했는데 조건문을 이용하여 더욱 다양한 조건 부여할 수 있다. 
        
        background-color: ${(props) => {
        if (props.backColor === "correct") {return "#528d4e";
        } else if (props.backColor === "almost") {return "#b49f39";
        } else if (props.backColor === "error") {
        return "#3a393c";
        }}



-4.!!! 중요!!! 진짜 wordle!!!

이전에 내가 만들었던 워들은 단순히 내가 지정한 정답은 다섯 글자의 인클루드와 랭스만을 체크하는 반쪽짜리였다.
그러나 진짜 워들은 내가 답으로 재출한 단어가 실제로 쓰이는 단어인지 검증하는 단계를 거쳐한다. 

그러기 위해서 필요한 것 wordle bank!
  검증을 위한 데이터다. 이는 인터넷에서 wordle bank를 찾으니 금방 찾을 수 있었다. 근데 이게 txt 파일이다. 
  물론 이 뱅크 데이터를 컴포넌트로 만들거나 api로 만들어서 연결 할 수도 있겠다. 
  하지만 txt를 연결하는 방식도 있다는 걸 검색으로 알아냈고 적용해 보았다. 
  바로 fetch!
  fetch api를 알아보자!  
  
  (https://developer.mozilla.org/ko/docs/Web/API/Fetch_API/Using_Fetch)
  
  간단히 말하면 fetch는 연결 파이프인 것이다! 
  promis나 async await로 비동기로 가져온다.
  
  fetch()를 사용하면 간단하게 외부 파일을 가져올 수 있다.
  프로그램에서는 데이터 다운로드의 시간 예측이 불가능하므로 Promise의 then()을 사용해 비동기로 처리한다.
  fetch()로 데이터를 가져온 뒤 then()을 호출한다.
  
      export const generrateWordSet = async () => {  let wordSet;   
      await fetch(wordBank)  
      .then((response) => response.text())  
      .then((result) => {  const wordArr = result.split("\r\n"); wordSet = new Set(wordArr);});
       return { wordSet };};

  로 간단하게 만들어볼 수 있다. 
  
  
  
4. 무엇을 배웠는가
    1. emotion/styled의 사용법 심화
    2. fetch API의 정의와 사용법

