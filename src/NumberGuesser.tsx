import React, { useState } from 'react';

const NumberGuesser: React.FC = () => {
  const [secretNumber, setSecretNumber] = useState<number | null>(null);
  const [guess, setGuess] = useState<string>('');
  const [feedback, setFeedback] = useState<string>('');
  const [attempts, setAttempts] = useState<number>(0);
  const [maxAttempts] = useState<number>(7); 
  const [gameOver, setGameOver] = useState<boolean>(false);

  const startGame = () => {
    setSecretNumber(Math.floor(Math.random() * 100) + 1);
    setAttempts(0);
    setGuess('');
    setFeedback('');
    setGameOver(false);
  };

  const handleGuess = () => {
    if (gameOver || guess === '') return;

    const guessNumber = parseInt(guess, 10);
    if (isNaN(guessNumber)) {
      setFeedback('Please enter a valid number.');
      return;
    }

    setAttempts((prevAttempts) => prevAttempts + 1);

    if (guessNumber === secretNumber) {
      setFeedback('Correct! You guessed the number!');
      setGameOver(true);
    } else if (guessNumber > (secretNumber as number)) {
      setFeedback('Too high!');
    } else {
      setFeedback('Too low!');
    }

    if (attempts + 1 >= maxAttempts && guessNumber !== secretNumber) {
      setFeedback(`Game over! The number was ${secretNumber}.`);
      setGameOver(true);
    }
  };

  return (
    <div style={{
      textAlign: 'center',
      marginTop: '50px',
      backgroundColor: 'white', 
      color: '#0047AB', 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', 
      alignItems: 'center'
    }}>
      <h1>Number Guesser Game</h1>
      <button onClick={startGame} disabled={secretNumber !== null && !gameOver}>
        Start Game
      </button>

      {secretNumber && !gameOver && (
        <>
          <div>
            <input
              type="number"
              placeholder="Enter your guess"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              disabled={gameOver}
              style={{
                margin: '10px',
                padding: '5px',
                fontSize: '16px' 
              }}
            />
            <button onClick={handleGuess}>Guess</button>
          </div>
          <p>Attempts left: {maxAttempts - attempts}</p>
        </>
      )}

      <p>{feedback}</p>

      {gameOver && (
        <button onClick={startGame}>
          Play Again
        </button>
      )}
    </div>
  );
};

export default NumberGuesser;
