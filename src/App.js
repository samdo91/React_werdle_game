import "./App.css";
import WordleMainPage from "./comp/wordle/wordleMainPage";
import { Provider } from "jotai";
import styled from "@emotion/styled";
function App() {
  return (
    <Provider>
      <div className="App">
        <Game>
          <WordleMainPage />
        </Game>
      </div>
    </Provider>
  );
}

const Game = styled.div`
  width: 100vw;
  height: calc(100vh - 170px);
  display: flex;
  align-items: center;
  padding-top: 50px;
  flex-direction: column;
`;
export default App;
