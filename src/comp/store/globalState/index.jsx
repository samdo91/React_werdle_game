import { atom } from "jotai";
import wordBank from "../wordle-bank/wordle-bank.txt";
// 보드 박스 만들기
export const boardDefault = atom([
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
]);
//가리키고 있는 레터 박스의 위치
export const currentValues = atom({ letterPos: 0, attemptVal: 0 });

// wordBank는 txt 이기 때문에 불러와야 한다. 그것을 스플릿으로 자르고 셋 해준다.
export const generrateWordSet = async () => {
  let wordSet;
  await fetch(wordBank)
    .then((response) => response.text())
    .then((result) => {
      const wordArr = result.split("\r\n");

      wordSet = new Set(wordArr);
    });
  return { wordSet };
};
export const wordSets = atom(new Set());

// 정답
export const corrects = atom("RIGHT");

// "error" 인지 확인 하여 키패드 백그라운드 컬러 변경
export const disabledLetters = atom([]);
// "almost" 인지 확인하여 키패드 백그라운드 컬러 변경
export const almostLetters = atom([]);
// "correct" 인지 확인하여 키패드 백그라운드 컬러 변경
export const correctLetters = atom([]);
//게임 승패 판독
export const gameOvers = atom({ gameOver: false, win: false });
