import "./Style.css";
import React, { useState, useRef, useEffect } from "react";
import heart from "./gameheart.png";
import GameOver from "./GameOver";
import NewGameButton from "./NewGameButton";

//still need to make it so conditions are not repeated. might need to create some kind of memory and if the same number for condition comes up again
// we randomise number again

const PickACard = () => {
  const [time, setTime] = useState(60);
  const intervalRef = useRef(null);
  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [numberArray, setNumberArray] = useState([]);
  const [conditionRule, setConditionRule] = useState();
  const [conditionInteger, setConditionInteger] = useState();

  useEffect(() => {
    createNumberArray();
  }, []);

  const createNumberArray = () => {
    let orderedArray = [];
    for (let i = 1; i <= 100; i++) {
      orderedArray.push(i);
    }
    setNumberArray(orderedArray);
    console.log(numberArray);
  };

  const newGame = () => {
    setGameStarted(true);
    setTime(60);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setLives(3);
    setScore(0);
    setIsGameOver(false);
    createNumberArray();
    setConditionRule(Math.ceil(Math.random() * 10));
    setConditionInteger(Math.ceil(Math.random() * 10));
    intervalRef.current = setInterval(reduceTime, 1000);
  };

  const reduceTime = () => {
    setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
  };


  const livesDisplay = () => {
    const heartIcons = Array.from({ length: lives }, (_, index) => (
      <img src={heart} key={index} className="heartIcon" />
    ));
    return heartIcons;
  };

  const timerBar = () => {
    const timerBarWidth = (time / 60) * 100 + "%";
    return (
      <div className="outerbox">
        <div
          className="innerbox"
          style={{
            width: timerBarWidth,
            backgroundColor:
              time > 30 ? "green" : time > 10 ? "#DAA520" : "red",
          }}
        ></div>
      </div>
    );
  };

  useEffect(() => {
    if (time < 60 && time % 10 === 0) {
      console.log("new condition time!");
      setConditionRule(Math.ceil(Math.random() * 10));
      setConditionInteger(Math.ceil(Math.random() * 10));
    }
  }, [time]);

  useEffect(() => {
    if (lives === 0 || time === 0) {
      setIsGameOver(true);
      if (score > highScore) {
        setHighScore(score);
      }
      clearInterval(intervalRef.current);
    }
  }, [lives, time]);

  const checkPrime = (n) => {
    for (let i = 2; i <= Math.sqrt(n); i++) {
      if (n % i === 0) {
        return false;
      }
    }
    return true;
  };

  const conditionSuccess = (clickedNumber) => {
    setScore((prevScore) => prevScore + 1);
    setNumberArray((prevNumberArray) =>
      prevNumberArray.map((number, index) =>
        index === clickedNumber - 1 ? "" : number
      )
    );
  };

  const handleClick = (event) => {
    let clickedNumber = parseInt(event.target.value, 10);
    if (clickedNumber == NaN) {
      return;
    }
    if (conditionRule < 7) {
      if (clickedNumber % conditionInteger === 0) {
        conditionSuccess(clickedNumber);
      } else if (clickedNumber % conditionInteger !== 0) {
        setLives(lives - 1);
      }
    } else if (conditionRule === 7) {
      if (60 % clickedNumber === 0) {
        conditionSuccess(clickedNumber);
      } else if (60 % clickedNumber !== 0) {
        setLives(lives - 1);
      }
    } else if (conditionRule > 7) {
      if (checkPrime(clickedNumber)) {
        conditionSuccess(clickedNumber);
      } else {
        setLives(lives - 1);
      }
    }
  };

  const conditionRender = () => {
    if (conditionRule < 7)
      return <div className="condition">Multiple of {conditionInteger}</div>;
    if (conditionRule === 7)
      return <div className="condition">Factor of 60</div>;
    if (conditionRule > 7)
      return <div className="condition">Prime Numbers</div>;
  };

  return (
    <div className="main">
      {isGameOver ? <GameOver score={score} highScore={highScore} newGame = {newGame}/> : ""}
      {gameStarted === false ? <NewGameButton newGame={newGame} />: ""}
      <div className="condition">{conditionRender()}</div>
      <div className="pick-a-card-grid">
        {numberArray.map((number, index) => (
          <button
            key={index}
            value={number}
            onClick={handleClick}
            className="pick-a-card-grid-square"
            disabled={number === " "}
          >
            {number}
          </button>
        ))}
      </div>
      <h3
        style={{
          color: time <= 5 ? "red" : "",
        }}
      >
        Time remaining: {time}
      </h3>
      <div className="timerContainer">{timerBar()}</div>
      {/*temporary container here to keep score and check it's working based on condition */}
      <div>Score: {score} </div>
      <div className="livesContainer">{livesDisplay()}</div>
    </div>
  );
};

export default PickACard