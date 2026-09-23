// src/App.jsx
import { VALID_WORDS, getRandomWord } from "./word";
import Board from "./component/Board";
import Keyboard from "./Keyboard";
import { useState, useEffect } from "react";
import { getGuessStatuses } from "./wordUtils";
import Modal from "./Modal";

import logoImg from "./assets/logo.jpg";

const MAX_GUESSES = 6;
const WORD_LENGTH = 5;

function App() {
  
  const [answer, setAnswer] = useState(() => getRandomWord());

  
  const [guesses, setGuesses] = useState([]);

  
  const [currentGuess, setCurrentGuess] = useState("");

  
  const [gameStatus, setGameStatus] = useState("playing");

  const [startTime] = useState(() => Date.now());

  const [elapsedSeconds, setElapsedSeconds] = useState(null);

  const [isInvalid, setIsInvalid] = useState(false);

  useEffect(() => {
    function handleKeyDown(e) {
      const key = e.key.toUpperCase();

      if (key === "ENTER") {
        handleEnter();
      } else if (key === "BACKSPACE") {
        handleBackspace();
      } else if (/^[A-Z]$/.test(key)) {
        handleLetter(key);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);}, [currentGuess, gameStatus]);


   function triggerShake() {
     setIsInvalid(true);
    setTimeout(() => setIsInvalid(false), 500);
     } 

  // Called when the player presses a letter key
 function handleLetter(letter) {
  if (gameStatus !== "playing") return;
  if (currentGuess.length >= WORD_LENGTH) return;

  setCurrentGuess((prev) => prev + letter);
 }
  // Called when the player presses backspace
  function handleBackspace() {
    setCurrentGuess((prev) => prev.slice(0, -1));
  }

  function handleEnter() {
    if (gameStatus !== "playing") return;

    if (currentGuess.length !== WORD_LENGTH) {
      triggerShake();
      return;
    }

    if (!VALID_WORDS.includes(currentGuess)) {
      triggerShake();
      return;
    }

    const newGuesses = [...guesses, currentGuess];
    setGuesses(newGuesses);
    setCurrentGuess("");

    if (currentGuess === answer) {
      setGameStatus("won");
      setElapsedSeconds(Math.round((Date.now() - startTime) / 1000));
    } else if (newGuesses.length >= MAX_GUESSES) {
      setGameStatus("lost");
      setElapsedSeconds(Math.round((Date.now() - startTime) / 1000));
    }
  }
    function handlePlayAgain() {
    setAnswer(getRandomWord());
    setGuesses([]);
    setCurrentGuess("");
    setGameStatus("playing");
    setElapsedSeconds(null);
  }

  return (
    <div className="app">
        <div className="title">
          <img src={logoImg} alt="Bugs Bunny" className="logo" />
          <h1>Wordle Showdown</h1>
        </div>
      <Board guesses={guesses} currentGuess={currentGuess} answer={answer} isInvalid={isInvalid} />
      <Keyboard
        guesses={guesses}
        answer={answer}
        onLetter={handleLetter}
        onEnter={handleEnter}
        onBackspace={handleBackspace}
      />
      {gameStatus !== "playing" && (
        <Modal
          status={gameStatus}
          answer={answer}
          guessCount={guesses.length}
          elapsedSeconds={elapsedSeconds}
          onPlayAgain={handlePlayAgain}
        />
      )}
    </div>
  );
}
export default App;