import React, { useState } from "react";
import rockImg from './rock.png';
import paperImg from './paper.png';
import scissorsImg from './scissors.png';
import "./App.css";

const App = () => {
  const [userScore, setUserScore] = useState(0);
  const [compScore, setCompScore] = useState(0);
  const [msg, setMsg] = useState("Play Your Move!!");
  const [msgVisible, setMsgVisible] = useState(true); // Set to true initially to show the message

  const genCompChoice = () => {
    const options = ["rock", "paper", "scissors"];
    const randIdx = Math.floor(Math.random() * 3);
    return options[randIdx];
  };

  const drawGame = () => {
    setMsg("It's a Draw! Play Again.");
    document.querySelector(".msg-container").style.backgroundColor = "#081b31";
    setMsgVisible(true);
  };

  const showWinner = (userWin, userChoice, compChoice) => {
    if (userWin) {
      setUserScore((prevScore) => prevScore + 1);
      setMsg(`You Win ! ${userChoice} beats ${compChoice}.`);
      document.querySelector(".msg-container").style.backgroundColor = "green";
    } else {
      setCompScore((prevScore) => prevScore + 1);
      setMsg(`You Lost ! ${compChoice} beats ${userChoice}.`);
      document.querySelector(".msg-container").style.backgroundColor = "red";
    }
    setMsgVisible(true);
  };

  const playGame = (userChoice) => {
    setMsgVisible(false); // Hide the message briefly for the new game round
    const compChoice = genCompChoice();

    if (userChoice.toLowerCase() === compChoice) { // Compare the lowercase values for case-insensitivity
      drawGame(); // Handle the draw scenario
    } else {
      let userWin = true;
      if (userChoice.toLowerCase() === "rock") {
        userWin = compChoice === "paper" ? false : true; // Rock loses to Paper
      } else if (userChoice.toLowerCase() === "paper") {
        userWin = compChoice === "scissors" ? false : true; // Paper loses to Scissors
      } else {
        userWin = compChoice === "rock" ? false : true; // Scissors lose to Rock
      }
      showWinner(userWin, userChoice, compChoice);
    }
  };

  return (
    <div className="app">
      <h1>Rock Paper Scissors</h1>

      <div className="choices">
        <div className="choice" onClick={() => playGame("Rock")}>
          <img src={rockImg} alt="Rock" />
        </div>
        <div className="choice" onClick={() => playGame("Paper")}>
          <img src={paperImg} alt="Paper" />
        </div>
        <div className="choice" onClick={() => playGame("Scissors")}>
          <img src={scissorsImg} alt="Scissors" />
        </div>
      </div>

      <div className="score-board">
        <div className="score">
          <p>{userScore}</p>
          <p>You</p>
        </div>
        <div className="score">
          <p>{compScore}</p>
          <p>Computer</p>
        </div>
      </div>

      <div className={`msg-container ${msgVisible ? "show" : ""}`}>
        <p>{msg}</p>
      </div>
    </div>
  );
};

export default App;
