const GameOver = ({score, highScore, newGame}) => {
    return (
      <div className="gameOver">
        <h2
          style={{
            color: "red",
          }}
        >
          GAME OVER
        </h2>
        <h2 className="scoreMessage">Score: {score}</h2>

        <h2>High Score: {highScore}</h2>

        <button onClick={newGame} id="playAgain">
          Play again
        </button>
      </div>
    );
  };

export default GameOver