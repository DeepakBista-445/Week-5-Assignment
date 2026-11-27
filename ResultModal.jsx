export default function ResultModal({
  status,
  solution,
  onRestart
}) {
  if (status === 'IN_PROGRESS') {
    return null;
  }

  const won = status === 'WON';

  return (
    <div
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="result-title"
    >
      <div className="modal">

        <h2 id="result-title">
          {won ? 'Excellent work!' : 'Game over'}
        </h2>

        <p>
          {won
            ? 'You found the hidden word.'
            : 'The correct word was:'}
          {' '}
          <strong>{solution}</strong>
        </p>

        <button
          className="restart-button"
          onClick={onRestart}
        >
          Play again
        </button>

      </div>
    </div>
  );
}