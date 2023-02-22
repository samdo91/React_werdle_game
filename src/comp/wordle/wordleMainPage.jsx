import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import Board from "./board/board";
import KeyBoard from "./keyBoard/keyBoard";
import { generrateWordSet } from "../store/globalState";
import { wordSets } from "../store/globalState";
function WordleMainPage() {
  const [wordSet, setWordSrt] = useAtom(wordSets);
  useEffect(() => {
    generrateWordSet().then((words) => {
      setWordSrt(words.wordSet);
    });
  }, {});

  return (
    <div>
      <nav>
        <h1>Wordle</h1>
        <Board />
        <KeyBoard />
      </nav>
    </div>
  );
}

export default WordleMainPage;
