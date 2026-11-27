const KEY_ROWS = [
  'QWERTYUIOP',
  'ASDFGHJKL'
];

function Key({ value, status = '', onPress }) {
  const wide = value === 'ENTER' || value === '⌫';

  return (
    <button
      type="button"
      className={`key ${wide ? 'wide' : ''} ${status}`}
      onClick={() => onPress(value)}
      aria-label={value === '⌫' ? 'Backspace' : value}
    >
      {value}
    </button>
  );
}

export default function Keyboard({ statuses, onKey }) {
  return (
    <div className="keyboard" aria-label="On-screen keyboard">

      {/* First and second keyboard rows */}
      {KEY_ROWS.map((row) => (
        <div className="key-row" key={row}>
          {row.split('').map((letter) => (
            <Key
              key={letter}
              value={letter}
              status={statuses[letter]}
              onPress={onKey}
            />
          ))}
        </div>
      ))}

      {/* Third keyboard row */}
      <div className="key-row">
        <Key value="ENTER" onPress={onKey} />

        {'ZXCVBNM'.split('').map((letter) => (
          <Key
            key={letter}
            value={letter}
            status={statuses[letter]}
            onPress={onKey}
          />
        ))}

        <Key value="⌫" onPress={onKey} />
      </div>

    </div>
  );
}
