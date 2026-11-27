import Row from './Row.jsx';

export default function GameBoard({
  guesses,
  currentGuess,
  results
}) {
  return (
    <section className="board" aria-label="Wordle game board">
      {Array.from({ length: 6 }, (_, rowIndex) => {
        const submitted = guesses[rowIndex] || '';
        const current = rowIndex === guesses.length;

        return (
          <Row
            key={rowIndex}
            guess={current ? currentGuess : submitted}
            result={results[rowIndex] || []}
            isCurrent={current}
          />
        );
      })}
    </section>
  );
}