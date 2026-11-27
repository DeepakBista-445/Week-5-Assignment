import Tile from './Tile.jsx';

export default function Row({
  guess = '',
  result = [],
  isCurrent = false
}) {
  return (
    <div className="row">
      {Array.from({ length: 5 }, (_, index) => (
        <Tile
          key={index}
          letter={guess[index] || ''}
          status={result[index] || ''}
          active={isCurrent && index === guess.length}
        />
      ))}
    </div>
  );
}