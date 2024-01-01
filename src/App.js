import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [status, setStatus] = useState();
  const [gameActive, setGameActive] = useState(true);
  const [gameState, setGameState] = useState(["", "", "", "", "", "", "", "", ""]);
  const [currentPlayer, setCurrentPlayer] = useState("X");

  const winningMessage = () => `Player ${currentPlayer === "X" ? "O" : "X"} has won!`;
  const drawMessage = () => `Game ended in a draw!`;
  const currentPlayerTurn = () => `It's ${currentPlayer === "X" ? "O" : "X"}'s turn`;

  function handleCellPlayed(clickedCell, i) {
    const newGameState = [...gameState];
    newGameState[i] = currentPlayer;
    setGameState((prev) => (prev = newGameState));
    clickedCell.innerHTML = currentPlayer;
  }

  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
      const winCondition = winningConditions[i];
      let a = gameState[winCondition[0]];
      let b = gameState[winCondition[1]];
      let c = gameState[winCondition[2]];
      if (a === "" || b === "" || c === "") {
        continue;
      }
      if (a === b && b === c) {
        roundWon = true;
        break;
      }
    }
    if (roundWon) {
      setStatus(winningMessage());
      setGameActive(false);
      return;
    }
    let roundDraw = !gameState.includes("");
    if (roundDraw) {
      setStatus(drawMessage());
      setGameActive(false);
      return;
    }

    handlePlayerChange();
  }

  function handlePlayerChange() {
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    setStatus(currentPlayerTurn());
  }
  function restart() {
    setGameActive(true);
    setCurrentPlayer("X");
    setGameState(["", "", "", "", "", "", "", "", ""]);
    setStatus(currentPlayerTurn());
    document.querySelectorAll(".cell").forEach((cell) => (cell.innerHTML = ""));
  }
  return (
    <section>
      <h1 className="game--title">Tic Tac Toe</h1>
      <div className="game--container">
        {[...Array(9)].map((e, i) => (
          <div
            key={i}
            className="cell"
            onClick={(e) => {
              if (gameState[i] !== "" || !gameActive) {
                return;
              }
              handleCellPlayed(e.target, i);
              handleResultValidation();
            }}
          ></div>
        ))}
      </div>
      <h2 className="game--status">{status}</h2>
      <button className="game--restart" onClick={restart}>
        Restart Game
      </button>
    </section>
  );
}

export default App;
