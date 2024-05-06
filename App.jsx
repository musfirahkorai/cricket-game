import React, { useState } from 'react';
import './App.css'; // Import your CSS file

function App() {
  const [score, setScore] = useState({
    win: 0,
    lost: 0,
    tie: 0,
  });

  const generateComputerChoice = () => {
    const randomNumber = Math.random() * 3;
    if (randomNumber > 0 && randomNumber <= 1) {
      return 'Bat';
    } else if (randomNumber > 1 && randomNumber <= 2) {
      return 'Ball';
    } else {
      return 'Stump';
    }
  };

  const getResult = (userMove, computerMove) => {
    if (userMove === 'Bat') {
      if (computerMove === 'Ball') {
        return 'User won.';
      } else if (computerMove === 'Bat') {
        return `It's a tie`;
      } else if (computerMove === 'Stump') {
        return 'Computer has won';
      }
    } else if (userMove === 'Ball') {
      if (computerMove === 'Ball') {
        return `It's a tie`;
      } else if (computerMove === 'Bat') {
        return 'Computer has won';
      } else if (computerMove === 'Stump') {
        return 'User won.';
      }
    } else {
      if (computerMove === 'Ball') {
        return 'Computer has won';
      } else if (computerMove === 'Bat') {
        return 'User won.';
      } else if (computerMove === 'Stump') {
        return `It's a tie`;
      }
    }
  };

  const handleChoiceClick = (userMove) => {
    const computerChoice = generateComputerChoice();
    const resultMsg = getResult(userMove, computerChoice);
    const updatedScore = { ...score };

    if (resultMsg.includes('User')) {
      updatedScore.win++;
    } else if (resultMsg.includes('Computer')) {
      updatedScore.lost++;
    } else {
      updatedScore.tie++;
    }

    setScore(updatedScore);
    showResult(userMove, computerChoice, resultMsg);
  };

  const showResult = (userMove, computerMove, result) => {
    document.querySelector('#user-move').innerText =
      userMove ? `You have chosen ${userMove}` : '';

    document.querySelector('#computer-move').innerText =
      computerMove ? `Computer choice is ${computerMove}` : '';

    document.querySelector('#result').innerText = result || '';

    document.querySelector('#score').innerText = `Score: Won: ${score.win}, Lost: ${score.lost}, Tie: ${score.tie}`;
  };

  const handleReset = () => {
    localStorage.clear();
    setScore({ win: 0, lost: 0, tie: 0 });
  };

  return (
    <>
      <h1>Bat Ball Stump Game</h1>

      <button className="choice-button" onClick={() => handleChoiceClick('Bat')}>
        <img src="images/bat.png" alt="Bat Image" className="choice-image" />
      </button>

      <button className="choice-button" onClick={() => handleChoiceClick('Ball')}>
        <img src="images/ball.png" alt="Ball Image" className="choice-image" />
      </button>

      <button className="choice-button" onClick={() => handleChoiceClick('Stump')}>
        <img src="images/stump.png" alt="Stump Image" className="choice-image" />
      </button>

      <h3 id="user-move"></h3>
      <h3 id="computer-move"></h3>
      <h3 id="result"></h3>
      <h3 id="score">Score: Won: {score.win}, Lost: {score.lost}, Tie: {score.tie}</h3>

      <button onClick={handleReset}>Reset</button>
    </>
  );
}

export default App;
