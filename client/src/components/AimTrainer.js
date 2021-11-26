import React, { useState } from "react";
import './AimTrainer.css';
import randomNumber from "./RandomNumber";
import target from "../Target.png"


const AimTrainer = () => {
  const [left, setLeft] = useState(null);
  const [top, setTop] = useState(null);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [timer, setTimer] = useState(null);

  const getPosition = () => {
    let leftPosition = randomNumber(0, 90);
    let topPosition = randomNumber(0, 90);
    setLeft(leftPosition);
    setTop(topPosition);
  };

  const decreaseTimer = (i) => {
    setTimeout(() => {
      setTimer(60 - i);
      console.log(60 - i);
    }, 1000 * i);
  };

  const resetTimer = () => {
    setTimer(60);
  };

  const launchTimer = () => {
    for (let i = 60; i > 0; i--) {
      decreaseTimer(i);
    }
    console.log("end of the decrease")
  };


  const countShot = () => {
    if (score + 10 > bestScore) setBestScore(score + 10);
    setScore(score + 10);
  };


  return (
    <div className="aimTrainerMainContainer">
      <h1 style={{color: 'white'}}>AIM RNG</h1>
      <div className="statsAimTrainerContainer">
        <h3 style={{color: 'white'}}>Score : {score > 0 ? <span style={{ color: "yellow"}}>{score}</span> : null}</h3>
        <h3 style={{color: 'white'}}>Best score : {bestScore > 0 ? <span style={{ color: "yellow"}}>{bestScore}</span> : null}</h3>
      </div>
      <div className={`gameContainer`}>
        {
          timer && timer > 0 ?
            <div className="target"
                 style={{
                   'position': 'relative',
                   'left': `${left}%`,
                   'top': `${top}%`
                 }}
                 onClick={(event) => {
                   getPosition();
                   countShot();
                 }}
            >
              <img src={target} style={{width:"65px", height:"65px"}} alt="target1"/>
            </div>
            : <p className="launchGameButton" onClick={() => {
              setScore(0);
              resetTimer();
              launchTimer();
              getPosition();
            }}>GO</p>
        }
      </div>
    </div>
  )
};

export default AimTrainer;