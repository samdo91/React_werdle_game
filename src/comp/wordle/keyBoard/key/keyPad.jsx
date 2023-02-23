import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useAtom } from "jotai";
import {
  boardDefault,
  currentValues,
  wordSets,
  corrects,
  gameOvers,
} from "../../../store/globalState";

function KeyPad(props) {
  /*
  keyVlaue: 이 패드의 값
  bigkey: 키의 너비 설정을 위한 값
  boardVlaue: 디폴트보드를 저장히기 위한 아톰 즉 여기에 저장된 값은 출력된다.
  currentValue: 현재 가리키고 있는 위치 이곳에 키패드의 값이 저장될 boardVlaue 내에서의 위치를 가리킨다.
  correct:정답
  gameOver: 게임에 이겼는지 졌는지 판단
  */
  const { keyVlaue, bigkey, disabledLetter, almostLetter, correctLetter } =
    props;
  const [boardVlaue, setBoardValue] = useAtom(boardDefault);
  const [currentValue, setcurrentValue] = useAtom(currentValues);
  const [correct] = useAtom(corrects);
  const [wordSet, setWordSrt] = useAtom(wordSets);
  const [gameOver, setGameover] = useAtom(gameOvers);
  const [padColor, setPadColor] = useState("gray");

  useEffect(() => {
    if (correctLetter === true) {
      setPadColor("#528d4e");
      return;
    } else if (almostLetter === true) {
      setPadColor("#b49f39");
      return;
    } else if (disabledLetter === true) {
      setPadColor("#3a393c");
      return;
    } else {
      setPadColor("gray");
      return;
    }
  }, [almostLetter, correctLetter, disabledLetter]);

  //키 패드가 눌렸을 때 동작이다
  const selecLetter = () => {
    //Enter를 누르면 정답이 맞는지 확인해야한다.
    if (keyVlaue === "Enter") {
      answerCheck();
    } else if (keyVlaue === "Deleter") {
      deleteFuntion();
    }
    //키페드의 알바펫 값을 입력하면 된다.
    else {
      onselect();
    }
  };
  // 정답 체크 함수
  const answerCheck = () => {
    if (currentValue.letterPos < 4) {
      alert("총 5개의 알파벳이 필요합니다.");
      return;
    }
    let currword = "";
    for (let i = 0; i < 5; i++) {
      currword += boardVlaue[i][currentValue.attemptVal];
    }
    //has() 메서드는 Set 객체에 주어진 요소가 존재하는지 여부를 판별해 반환합니다.
    if (wordSet.has(currword.toLocaleLowerCase())) {
      setcurrentValue({
        letterPos: 0,
        attemptVal: currentValue.attemptVal + 1,
      });
    } else {
      alert("단어를 찾을 수 없어");
      return;
    }
    if (correct === currword) {
      setGameover({ gameOver: true, win: true });
    } else if (currentValue.attemptVal === 4) {
      setGameover({ gameOver: true, win: false });
    }
  };
  // 삭제버튼
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

  const onselect = () => {
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

  return (
    <Key
      bigkey={bigkey}
      padColor={padColor}
      disabledLetter={disabledLetter}
      almostLetter={almostLetter}
      correctLetter={correctLetter}
      onClick={selecLetter}
    >
      {keyVlaue}
    </Key>
  );
}

const Key = styled.div`
  width: ${(props) => (props.bigkey === "ture" ? "100px" : "50px")};
  height: 70px;
  margin: 5px;
  border-radius: 4px;
  display: grid;
  place-items: center;
  font-size: 20px;
  background-color: ${(props) => props.padColor};
  color: white;
  font-family: Arial, Helvetica, sans-serif;
  cursor: pointer;
`;

export default KeyPad;
