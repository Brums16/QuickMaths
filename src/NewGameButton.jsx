const NewGameButton = ({newGame}) => {
    return (
      <div>
        <button onClick={newGame} id="newgame">
          New Game
        </button>
      </div>
    );
  };

export default NewGameButton