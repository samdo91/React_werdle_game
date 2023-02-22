import { atom, Atom } from "jotai";
import wordBank from "../wordle-bank/wordle-bank.txt";
export const boardDefault = atom([
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
]);

export const currentValues = atom({ letterPos: 0, attemptVal: 0 });

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

export const corrects = atom("RIGHT");
export const wordSets = atom(new Set());
