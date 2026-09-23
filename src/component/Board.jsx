
import Tile from "./Tile";
import { getGuessStatuses } from "../wordUtils";

const MAX_GUESSES = 6;
const WORD_LENGTH = 5;

function Board({ guesses, currentGuess, answer, isInvalid }) {
  const rows = [];

  for (let i = 0; i < MAX_GUESSES; i++) {
    if (i < guesses.length) {
      rows.push(<Row key={i} guess={guesses[i]} answer={answer} isSubmitted={true} />);
    } else if (i === guesses.length) {
      rows.push(
        <Row
          key={i}
          guess={currentGuess}
          answer={answer}
          isSubmitted={false}
          shake={isInvalid}
        />
      );
    } else {
      rows.push(<Row key={i} guess="" answer={answer} isSubmitted={false} />);
    }
  }

  return <div className="board">{rows}</div>;
}

function Row({ guess, answer, isSubmitted, shake }) {
  const statuses = isSubmitted ? getGuessStatuses(guess, answer) : null;
  const tiles = [];

  for (let i = 0; i < WORD_LENGTH; i++) {
    const letter = guess[i] || "";
    tiles.push(
      <Tile key={i} letter={letter} status={isSubmitted ? statuses[i] : "empty"} />
    );
  }

  return <div className={`row ${shake ? "shake" : ""}`}>{tiles}</div>;
}







function getLetterStatus(letter, index, answer) {
  if (!letter) return "empty";
  if (answer[index] === letter) return "correct";
  if (answer.includes(letter)) return "present";
  return "absent";
}

export default Board;