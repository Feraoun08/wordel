
import { getGuessStatuses } from "./wordUtils";
const ROWS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "BACKSPACE"],
];

function Keyboard({ guesses, answer, onLetter, onEnter, onBackspace }) {
 
function getKeyStatus(letter) {
  let status = "unused";

  for (const guess of guesses) {
    const statuses = getGuessStatuses(guess, answer);
    for (let i = 0; i < guess.length; i++) {
      if (guess[i] !== letter) continue;
      if (statuses[i] === "correct") return "correct";
      if (statuses[i] === "present") status = "present";
      else if (statuses[i] === "absent" && status === "unused") status = "absent";
    }
  }

  return status;
}


  function handleClick(key) {
    if (key === "ENTER") {
      onEnter();
    } else if (key === "BACKSPACE") {
      onBackspace();
    } else {
      onLetter(key);
    }
  }

  return (
    <div className="keyboard">
      {ROWS.map((row, i) => (
        <div className="keyboard-row" key={i}>
          {row.map((key) => (
            <button
              key={key}
              className={`key ${key.length === 1 ? getKeyStatus(key) : "wide"}`}
              onClick={() => handleClick(key)}
              disabled={key.length === 1 && getKeyStatus(key) === "absent"}
            >
              {key === "BACKSPACE" ? "⌫" : key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Keyboard;