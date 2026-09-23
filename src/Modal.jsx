

function Modal({ status, answer, guessCount, elapsedSeconds, onPlayAgain }) {
  const isWin = status === "won";

  return (
    <div className="modal-overlay">
      <div className={`modal ${isWin ? "modal-win" : "modal-lose"}`}>
        {isWin && <div className="confetti">CONGRATS</div>}

        <h2>{isWin ? "Round's yours, partner!" : "Better luck next round"}</h2>

        <p className="modal-word modal-detail">
          The word was <strong>{answer}</strong>
        </p>

        {isWin && (
          <p className="modal-detail">
            Solved in <strong>{guessCount}</strong> guess{guessCount !== 1 ? "es" : ""}
          </p>
        )}

        <p className="modal-detail">Time: {elapsedSeconds}s</p>

        <button className="play-again-btn" onClick={onPlayAgain}>
          Play Again
        </button>
      </div>
    </div>
  );
}

export default Modal;