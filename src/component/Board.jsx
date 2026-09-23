// src/Board.jsx
import Tile from "./Tile";
import { getGuessStatuses } from "../wordUtils";

const MAX_GUESSES = 6;
const WORD_LENGTH = 5;

function Board({ guesses, currentGuess, answer }) {
  // Build exactly 6 rows, no matter how many guesses have been made so far
  const rows = [];

  for (let i = 0; i < MAX_GUESSES; i++) {
    if (i < guesses.length) {
      // A completed guess — show its letters with correct/present/absent coloring
      rows.push(
        <Row key={i} guess={guesses[i]} answer={answer} isSubmitted={true} />
      );
    } else if (i === guesses.length) {
      // The row currently being typed — no coloring yet, just letters
      rows.push(
        <Row key={i} guess={currentGuess} answer={answer} isSubmitted={false} />
      );
    } else {
      // An empty future row
      rows.push(<Row key={i} guess="" answer={answer} isSubmitted={false} />);
    }
  }

  return <div className="board">{rows}</div>;
}

// A single row of 5 tiles
function Row({ guess, answer, isSubmitted }) {
  const statuses = isSubmitted ? getGuessStatuses(guess, answer) : null;
  const tiles = [];

  for (let i = 0; i < WORD_LENGTH; i++) {
    const letter = guess[i] || "";
    tiles.push(
      <Tile key={i} letter={letter} status={isSubmitted ? statuses[i] : "empty"} />
    );
  }

  return <div className="row">{tiles}</div>;
}



// Figures out if a letter is correct (right spot), present (wrong spot), or absent
function getLetterStatus(letter, index, answer) {
  if (!letter) return "empty";
  if (answer[index] === letter) return "correct";
  if (answer.includes(letter)) return "present";
  return "absent";
}

export default Board;