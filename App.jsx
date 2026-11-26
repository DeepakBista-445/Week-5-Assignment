
import {
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react';

import GameBoard from './components/GameBoard.jsx';
import Keyboard from './components/Keyboard.jsx';
import ResultModal from './components/ResultModal.jsx';

// import { WORDS } from './words.js';

import {
  evaluateGuess,
  getKeyboardStatuses
} from './gameLogic.js';

// Fixed answer for the assignment demonstration
const DEMO_WORD = 'CRANE';

export default function App() {
  const [solutionWord, setSolutionWord] = useState(
    DEMO_WORD
  );

  const [currentGuess, setCurrentGuess] = useState('');
  const [pastGuesses, setPastGuesses] = useState([]);
  const [results, setResults] = useState([]);

  const [gameStatus, setGameStatus] = useState(
    'IN_PROGRESS'
  );

  const [message, setMessage] = useState('');

  const keyboardStatuses = useMemo(
    () => getKeyboardStatuses(
      pastGuesses,
      solutionWord
    ),
    [pastGuesses, solutionWord]
  );

  const submitGuess = useCallback(() => {
    if (gameStatus !== 'IN_PROGRESS') return;

    if (currentGuess.length !== 5) {
      setMessage('Please enter a five-letter word.');
      return;
    }

    const result = evaluateGuess(
      currentGuess,
      solutionWord
    );

    const nextGuesses = [
      ...pastGuesses,
      currentGuess
    ];

    setPastGuesses(nextGuesses);

    setResults((oldResults) => [
      ...oldResults,
      result
    ]);

    setCurrentGuess('');
    setMessage('');

    if (currentGuess === solutionWord) {
      setGameStatus('WON');
    } else if (nextGuesses.length === 6) {
      setGameStatus('LOST');
    }

  }, [
    currentGuess,
    gameStatus,
    pastGuesses,
    solutionWord
  ]);

  const handleKey = useCallback((key) => {
    if (gameStatus !== 'IN_PROGRESS') return;

    setMessage('');

    if (key === 'ENTER') {
      submitGuess();

    } else if (
      key === '⌫' ||
      key === 'BACKSPACE'
    ) {
      setCurrentGuess((value) =>
        value.slice(0, -1)
      );

    } else if (
      /^[a-zA-Z]$/.test(key) &&
      currentGuess.length < 5
    ) {
      setCurrentGuess((value) =>
        (value + key.toUpperCase()).slice(0, 5)
      );
    }

  }, [
    currentGuess.length,
    gameStatus,
    submitGuess
  ]);

  useEffect(() => {
    function handleKeyDown(event) {
      if (
        event.ctrlKey ||
        event.metaKey ||
        event.altKey
      ) {
        return;
      }

      if (event.key === 'Enter') {
        handleKey('ENTER');

      } else if (event.key === 'Backspace') {
        handleKey('BACKSPACE');

      } else if (/^[a-zA-Z]$/.test(event.key)) {
        handleKey(event.key);
      }
    }

    window.addEventListener(
      'keydown',
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        'keydown',
        handleKeyDown
      );
    };

  }, [handleKey]);

  function restartGame() {
    setSolutionWord(DEMO_WORD);

    setCurrentGuess('');
    setPastGuesses([]);
    setResults([]);

    setGameStatus('IN_PROGRESS');

    setMessage(
      'A new word is ready. Good luck!'
    );
  }

  return (
    <main className="app-shell">

      <header className="header">
        <p className="eyebrow">
          A REACT WORD GAME
        </p>

        <h1>WORDLE</h1>

        <p className="subtitle">
          Guess the hidden five-letter word in six tries.
        </p>
      </header>

      <div className="instructions">
        <span>
          <b className="legend correct">A</b>
          Correct position
        </span>

        <span>
          <b className="legend present">B</b>
          Wrong position
        </span>

        <span>
          <b className="legend absent">C</b>
          Not in word
        </span>
      </div>

      <GameBoard
        guesses={pastGuesses}
        currentGuess={currentGuess}
        results={results}
      />

      <div
        className="feedback"
        role="status"
        aria-live="polite"
      >
        {message ||
          `${pastGuesses.length} of 6 guesses used`}
      </div>

      <Keyboard
        statuses={keyboardStatuses}
        onKey={handleKey}
      />

      <button
        className="new-game"
        onClick={restartGame}
      >
        Start a new game
      </button>

      <footer>
        Built with React, JSX, and CSS
      </footer>

      <ResultModal
        status={gameStatus}
        solution={solutionWord}
        onRestart={restartGame}
      />

    </main>
  );
}
