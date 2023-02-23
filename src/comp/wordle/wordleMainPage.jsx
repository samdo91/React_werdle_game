import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import Board from "./board/board";
import KeyBoard from "./keyBoard/keyBoard";
import GameOver from "./gameOver/gameOver";
import { generrateWordSet } from "../store/globalState";
import { wordSets, gameOvers } from "../store/globalState";
function WordleMainPage() {
  const [wordSet, setWordSrt] = useAtom(wordSets);
  const [gameOver] = useAtom(gameOvers);
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
        {gameOver.gameOver ? <GameOver /> : <KeyBoard />}
      </nav>
    </div>
  );
}

export default WordleMainPage;
