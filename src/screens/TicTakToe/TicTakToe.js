import React, { Fragment, useState } from "react";
import GoBackButton from "../../components/GoBackButton/GoBackButton";
import "./TicTakToe.css";

// ? SCOREBOARD COMPONENT
const ScoreBoard = ({ scores, xPlaying }) => {
  const { xScore, oScore } = scores;
  return (
    <Fragment>
      <div className="score_board">
        <span className={`score x_score ${!xPlaying && "inactive"}`}>
          X - {xScore}
        </span>
        <span className={`score o_score ${xPlaying && "inactive"}`}>
          O - {oScore}
        </span>
      </div>
    </Fragment>
  );
};

// ? BOX COMPONENT
const Box = ({ value, onClick }) => {
  const style = value === "X" ? "box x" : "box o";
  return (
    <Fragment>
      <button className={style} onClick={onClick}>
        {value}
      </button>
    </Fragment>
  );
};

// ? BOARD COMPONENT
const Board = ({ board, onClick }) => {
  //? JSX START
  return (
    <Fragment>
      <div className="board">
        {board.map((value, index) => {
          return (
            <Box
              value={value}
              onClick={() => {
                value === null && onClick(index);
              }}
            />
          );
        })}
      </div>
    </Fragment>
  );
};

// ? TIC TAC TOE GAME COMPONENT
const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xPlaying, setXPlaying] = useState(true);
  const [scores, setScores] = useState({ xScore: 0, oScore: 0 });
  const [gameOver, setGameOver] = useState(false);

  const WIN_CONDITION = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // ? CHECK WINNER FUNCTION
  const checkWinner = (board) => {
    for (let i = 0; i < WIN_CONDITION.length; i++) {
      const [x, y, z] = WIN_CONDITION[i];
      if (board[x] && board[x] === board[y] && board[y] === board[z]) {
        setGameOver(true);
        return board[x];
      }
    }
  };

  // ? HANDLER CLICK ON BOX FUNCTION
  const handleBoxFn = (index) => {
    let updatedBox = board.map((item, idx) => {
      if (idx === index) {
        return xPlaying ? "X" : "O";
      } else {
        return item;
      }
    });

    const winner = checkWinner(updatedBox);

    if (winner) {
      if (winner === "O") {
        let { oScore } = scores;
        oScore += 1;
        setScores({ ...scores, oScore });
      } else {
        let { xScore } = scores;
        xScore += 1;
        setScores({ ...scores, xScore });
      }
    }

    setBoard(updatedBox);
    setXPlaying(!xPlaying);
  };

  // ? RESET BOARD FUNCTION
  const resetBoard = () => {
    setGameOver(false);
    setBoard(Array(9).fill(null));
  };

  // ? JSX START
  return (
    <Fragment>
      <ScoreBoard scores={scores} xPlaying={xPlaying} />
      <Board board={board} onClick={gameOver ? resetBoard : handleBoxFn} />
      <div className="button__container">
        <button className="reset_button" onClick={resetBoard}>
          Reset Board
        </button>
        <GoBackButton />
      </div>
    </Fragment>
  );
};

export default TicTacToe;
