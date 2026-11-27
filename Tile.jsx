export default function Tile({
  letter = '',
  status = '',
  active = false
}) {
  const className = [
    'tile',
    status,
    active ? 'active' : ''
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={className}
      aria-label={letter ? `Letter ${letter}` : 'Empty tile'}
    >
      {letter}
    </div>
  );
}