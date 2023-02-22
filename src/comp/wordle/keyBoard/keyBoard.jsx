import styled from "@emotion/styled";
import React, { useCallback, useEffect } from "react";
import KeyPad from "./key/keyPad";
import { useAtom } from "jotai";
import { boardDefault, currentValues } from "../../store/globalState/index";

function KeyBoard() {
  const keys1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const keys2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const keys3 = ["Z", "X", "C", "V", "B", "N", "M"];
  const [boardVlaue, setBoardValue] = useAtom(boardDefault);
  const [currentValue, setcurrentValue] = useAtom(currentValues);

  const handleKeyboard = useCallback((e) => {
    if (e.key === "Enter") {
      answerCheck();
    } else if (e.key === "Backspace") {
      deleteFuntion();
    } else {
      keys1.forEach((key) => {
        if (e.key.toUpperCase() === key.toUpperCase()) {
          onselect(key);
        }
      });
      keys2.forEach((key) => {
        if (e.key.toUpperCase() === key.toUpperCase()) {
          onselect(key);
        }
      });
      keys3.forEach((key) => {
        if (e.key.toUpperCase() === key.toUpperCase()) {
          onselect(key);
        }
      });
    }
  });

  const answerCheck = () => {
    if (currentValue.letterPos < 4) {
      alert("총 5개의 알파벳이 필요합니다.");
    }
    setcurrentValue({ letterPos: 0, attemptVal: currentValue.attemptVal + 1 });
  };

  const onselect = (keyVlaue) => {
    if (currentValue.letterPos <= 4) {
      const newBoard = [...boardVlaue];
      newBoard[currentValue.letterPos][currentValue.attemptVal] = keyVlaue;
      setBoardValue(newBoard);
      setcurrentValue({
        ...currentValue,
        letterPos: currentValue.letterPos + 1,
      });
    } else {
      return;
    }
  };

  const deleteFuntion = () => {
    if (currentValue.letterPos === 0) return;
    const newBoard = [...boardVlaue];
    newBoard[currentValue.letterPos - 1][currentValue.attemptVal] = "";
    setBoardValue(newBoard);
    setcurrentValue({
      ...currentValue,
      letterPos: currentValue.letterPos - 1,
    });
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyboard);

    return () => {
      document.removeEventListener("keydown", handleKeyboard);
    };
  }, [handleKeyboard]);

  return (
    <KeyBoardDiv onKeyDown={handleKeyboard}>
      <Line1>
        {keys1.map((keys) => {
          return <KeyPad key={keys} keyVlaue={keys} bigkey={"false"} />;
        })}
      </Line1>
      <Line2>
        {keys2.map((keys) => {
          return <KeyPad key={keys} keyVlaue={keys} bigkey={"false"} />;
        })}
      </Line2>
      <Line3>
        <KeyPad keyVlaue={"Enter"} bigkey={"ture"} />
        {keys3.map((keys) => {
          return <KeyPad key={keys} keyVlaue={keys} bigkey={"false"} />;
        })}
        <KeyPad keyVlaue={"Deleter"} bigkey={"ture"} />
      </Line3>
    </KeyBoardDiv>
  );
}

const KeyBoardDiv = styled.div`
  width: 700px;
  height: 300px;
  margin-top: 60px;
`;
const Line1 = styled.div`
  flex: 33%;
  display: flex;
  flex-direction: row;
  display: flex;
  justify-content: center;
  margin: 5px;
`;
const Line2 = styled.div`
  flex: 33%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 5px;
`;
const Line3 = styled.div`
  flex: 33%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 5px;
`;

export default KeyBoard;
