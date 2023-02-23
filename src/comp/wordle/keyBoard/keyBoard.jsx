import styled from "@emotion/styled";
import React, { useCallback, useEffect } from "react";
import KeyPad from "./key/keyPad";
import { useAtom } from "jotai";
import {
  boardDefault,
  currentValues,
  wordSets,
} from "../../store/globalState/index";

function KeyBoard() {
  const keys1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const keys2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const keys3 = ["Z", "X", "C", "V", "B", "N", "M"];

  /* 
  boardVlaue: 디폴트보드다. 5x5 배열이다. 
  currentValue: 현재 가리키고 있는 위치 이곳에 키패드의 값이 저장될 boardVlaue 내에서의 위치를 가리킨다.
    -{letterPos: 가로  attemptVal: 세로}
  wordSet: set으로 값을 저장했다. 단어 뱅크다.*/
  const [boardVlaue, setBoardValue] = useAtom(boardDefault);
  const [currentValue, setcurrentValue] = useAtom(currentValues);
  const [wordSet, setWordSrt] = useAtom(wordSets);
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
    // currword는 비어있으며 값을 하나씩 추가 하는 식으로 단어를 구성한다.
    let currword = "";
    for (let i = 0; i < 5; i++) {
      currword += boardVlaue[i][currentValue.attemptVal];
    }
    //has란 뭘까? has() 메서드는 Set 객체에 주어진 요소가 존재하는지 여부를 판별해 반환합니다.

    if (wordSet.has(currword.toLocaleLowerCase())) {
      setcurrentValue({
        letterPos: 0,
        attemptVal: currentValue.attemptVal + 1,
      });
    } else {
      alert("단어를 찾을 수 없어");
    }
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
