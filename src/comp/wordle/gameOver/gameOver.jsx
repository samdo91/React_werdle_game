import React from "react";
import { useAtom } from "jotai";
import styled from "@emotion/styled";
import { gameOvers, corrects, currentValues } from "../../store/globalState";

function GameOver() {
  /*
  gameOver: 게임에 이겼는지 졌는지 판단
  correct:정답
  currentValue: 현재 가리키고 있는 위치 이곳에 키패드의 값이 저장될 boardVlaue 내에서의 위치를 가리킨다.
  */

  const [gameOver] = useAtom(gameOvers);
  const [correct] = useAtom(corrects);
  const [currentValue, setcurrentValue] = useAtom(currentValues);

  return (
    <GameOverBox>
      {gameOver.win ? (
        <div>
          <h3> 게임에 승리했습니다.</h3>
          <h1> 정답은 {correct} 입니다!</h1>
          <h4>
            당신은 {currentValue.attemptVal}번 시도하여 정답을 찾았습니다.
          </h4>
        </div>
      ) : (
        <div>
          <h1>형편없이 졌어요.</h1>
          <h2>정답은 {correct} 입니다! </h2>
        </div>
      )}
    </GameOverBox>
  );
}

const GameOverBox = styled.div` 
width: 100vw;
height: calc(100vh - 170px);
display: flex;
align-items: center;
padding-top: 50px;
flex-direction: column;
}

`;

export default GameOver;
