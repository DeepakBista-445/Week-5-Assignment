export function evaluateGuess(guess, solution) {
  const result = Array(5).fill('absent');

  const remaining = solution.split('');

  // First check letters in the correct position.
  guess.split('').forEach((letter, index) => {
    if (letter === solution[index]) {
      result[index] = 'correct';
      remaining[index] = null;
    }
  });

  // Then check letters in the wrong position.
  guess.split('').forEach((letter, index) => {
    if (result[index] === 'correct') return;

    const foundAt = remaining.indexOf(letter);

    if (foundAt !== -1) {
      result[index] = 'present';
      remaining[foundAt] = null;
    }
  });

  return result;
}

export function getKeyboardStatuses(guesses, solution) {
  const priority = {
    absent: 1,
    present: 2,
    correct: 3
  };

  const statuses = {};

  guesses.forEach((guess) => {
    const result = evaluateGuess(guess, solution);

    guess.split('').forEach((letter, index) => {
      const status = result[index];

      if (
        !statuses[letter] ||
        priority[status] > priority[statuses[letter]]
      ) {
        statuses[letter] = status;
      }
    });
  });

  return statuses;
}