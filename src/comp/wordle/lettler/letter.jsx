import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useAtom } from "jotai";
import {
  boardDefault,
  corrects,
  currentValues,
  disabledLetters,
  almostLetters,
  correctLetters,
} from "../../store/globalState/index";
function Letter(props) {
  /*
  boardVlaue: 5*5의 레터 박스 를 구성한 메트릭스를 의미한다. 
  letterPos: 가로 
  attemptVa: 세로
   이 두개로 이 레터박스의 위치를 알 수 있다. 
  currentValue: 현재 가리키고 있는 위치 이곳에 키패드의 값이 저장될 boardVlaue 내에서의 위치를 가리킨다.
    -{letterPos: 가로  attemptVal: 세로}
    주의-이것이 레테박스을 가르키고 있는 게 아니다. 레터박스자체를 보는게 아니라 카운터가 어느 레터박스의 값을 가르키고 있냐다
  correctword: 정답
  disabledLetter: 판별된 단어 중 "error"에 속하는 단어를 모아주는 Arry
  almostLetter: 판별된 단어 중 "alost"에 속하는 단어를 모아주는 Arry
  correctLetter: 판별된 단어 중 "correct"에 속하는 단어를 모아주는 Arry
    */
  const { letterPos, attemptVal } = props;
  const [boardVlaue, setBoardValue] = useAtom(boardDefault);
  const [currentValue, setcurrentValue] = useAtom(currentValues);
  const [correctword] = useAtom(corrects);
  const [disabledLetter, setDisabledLetter] = useAtom(disabledLetters);
  const [almostLetter, setAlmostLetter] = useAtom(almostLetters);
  const [correctLetter, setCorrectLetter] = useAtom(correctLetters);

  //   letters는  boardVlaue안에서 매트릭스를 찾아내는 것이다. 즉 이것은 이 letters의 자리값이다.
  const letters = boardVlaue[letterPos][attemptVal];

  // correctword는 정답이고 정답을 letterPos로 하나씩 뜯어낸다. 그리고 letters는 지금 있는 자리의 값, 그 값이 같으니 정답이다.
  const correct = correctword.toUpperCase()[letterPos] === letters;

  /* almost는 커랙트가 아닐수도 있다. 그리고(and) letters는 비어있지 않다. 그리고 정답 안에 이 알파벳이 들어있다.
  결과적으로 정답이 아님에도 포함되어 있다는 것은 정답의 자리(letters)에 있지는 않지만 이 단어는 포함되어있다. 그렇기에
  almost   */
  const almost =
    !correct && letters !== "" && correctword.toUpperCase().includes(letters);

  const letterState =
    currentValue.attemptVal > attemptVal &&
    (correct ? "correct" : almost ? "almost" : "error");

  useEffect(() => {
    if (letters !== "" && !correct && !almost) {
      /* setDisabledLetters([...disabledLetter, letters]) 
      이 코드는 사용 될 수 없다 문제가 뭐냐고 간단하다. 업데이트가 되지 않는다.
      이 코드는 currentValue.attemptVa가 변경 될때마다 한 번씩 실행된다. 즉 disabledLetter로 전달 되었다가 다시
      돌아와서 전달되는게 아니라 단 한 번 전달 된다. 그래서 첫 글자만 배열에 추가되는 것이다. */

      setDisabledLetter((letter) => [...letter, letters]);
    } else if (
      !correct &&
      letters !== "" &&
      correctword.toUpperCase().includes(letters)
    ) {
      setAlmostLetter((letter) => [...letter, letters]);
    } else {
      setCorrectLetter((letter) => [...letter, letters]);
    }
  }, [currentValue.attemptVal]);

  return <LetterDiv backColor={letterState}>{letters}</LetterDiv>;
}

const LetterDiv = styled.div`
  flex: 33%;
  height: 100%;
  border: 1px solid grey;
  margin: 5px;
  display: grid;
  place-items: center;
  font-size: 30px;
  font-weight: bolder;
  color: white;
  font-family: Arial, Helvetica, sans-serif;
  background-color: ${(props) => {
    if (props.backColor === "correct") {
      return "#528d4e";
    } else if (props.backColor === "almost") {
      return "#b49f39";
    } else if (props.backColor === "error") {
      return "#3a393c";
    }
  }};
`;
export default Letter;
