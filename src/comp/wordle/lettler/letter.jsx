import React, { useState } from "react";
import styled from "@emotion/styled";
import { useAtom } from "jotai";
import {
  boardDefault,
  corrects,
  currentValues,
} from "../../store/globalState/index";
function Letter(props) {
  const { letterPos, attemptVal } = props;
  const [boardVlaue, setBoardValue] = useAtom(boardDefault);
  const [currentValue, setcurrentValue] = useAtom(currentValues);
  const [correctword] = useAtom(corrects);
  //   letters는  boardVlaue안에서 매트릭스를 찾아내는 것이다. 즉 이것은 이 letters의 자리이다.
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
