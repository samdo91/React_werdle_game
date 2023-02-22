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

  const correct = correctword.toUpperCase()[letterPos] === letters;
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

// ? "#528d4e"
// : props.backColor === "almost"
// ? "#b49f39"
// : "#3a393c"};
