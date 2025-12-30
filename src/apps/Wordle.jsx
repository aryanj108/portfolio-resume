import { useEffect, useState } from "react";
import "./Wordle.css";
import { wordList, guessList as baseGuessList } from "./words";

const HEIGHT = 6;
const WIDTH = 5;

export default function Wordle() {
  const [row, setRow] = useState(0);
  const [col, setCol] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [word] = useState("ARYAN");

  /*const keys = [
  ["Q","W","E","R","T","Y","U","I","O","P"],
  ["A","S","D","F","G","H","J","K","L"],
  ["Enter","Z","X","C","V","B","N","M","DEL"]
]*/
;
  // combine valid guesses
  const guessList = [...baseGuessList, ...wordList];

  useEffect(() => {
    const handleKeyUp = (e) => processInput(e);
    document.addEventListener("keyup", handleKeyUp);
    return () => document.removeEventListener("keyup", handleKeyUp);
  }, [row, col, gameOver]);

  useEffect(() => {
    if (gameOver) {
      // Delay to show modal with fade in
      setTimeout(() => setShowModal(true), 100);
    }
  }, [gameOver]);

  function processInput(e) {
    if (gameOver) return;

    // letter input
    if (e.code >= "KeyA" && e.code <= "KeyZ") {
      if (col < WIDTH) {
        const tile = document.getElementById(`${row}-${col}`);
        if (tile.innerText === "") {
          tile.innerText = e.code[3];
          setCol(col + 1);
        }
      }
    }

    // delete
    if (e.code === "Backspace" && col > 0) {
      const newCol = col - 1;
      document.getElementById(`${row}-${newCol}`).innerText = "";
      setCol(newCol);
    }

    // submit
    if (e.code === "Enter") update();
  }

function update() {
  let guess = "";

  for (let c = 0; c < WIDTH; c++) {
    guess += document.getElementById(`${row}-${c}`).innerText;
  }

  guess = guess.toLowerCase();

  // If word not in guess list
  if (!guessList.includes(guess)) {
    for (let c = 0; c < WIDTH; c++) {
      const tile = document.getElementById(`${row}-${c}`);
      tile.classList.add("invalid");
    }

    // Remove invalid class after animation
    setTimeout(() => {
      for (let c = 0; c < WIDTH; c++) {
        const tile = document.getElementById(`${row}-${c}`);
        tile.classList.remove("invalid");
      }
    }, 600);

    return; // stop processing
  }

  const letterCount = {};
  for (const ch of word) {
    letterCount[ch] = (letterCount[ch] || 0) + 1;
  }

  let correct = 0;

  // correct letters
  for (let c = 0; c < WIDTH; c++) {
    const tile = document.getElementById(`${row}-${c}`);
    const letter = tile.innerText;

    if (word[c] === letter) {
      tile.classList.add("correct");
      letterCount[letter]--;
      correct++;
    }
  }

  // present / absent
  for (let c = 0; c < WIDTH; c++) {
    const tile = document.getElementById(`${row}-${c}`);
    const letter = tile.innerText;

    if (!tile.classList.contains("correct")) {
      if (word.includes(letter) && letterCount[letter] > 0) {
        tile.classList.add("present");
        letterCount[letter]--;
      } else {
        tile.classList.add("absent");
      }
    }
  }

  // Delay showing game over screen to see the tiles turn green
  if (correct === WIDTH || row === HEIGHT - 1) {
    setTimeout(() => {
      setGameOver(true);
      if (correct === WIDTH) {
        setWon(true);
      }
    }, 1000); // 1 second delay to see the green tiles
  }

  setRow(row + 1);
  setCol(0);
}

function restartGame() {
  // Fade out
  setShowModal(false);
  
  // Wait for fade out, then reset
  setTimeout(() => {
    // Clear all tiles
    for (let r = 0; r < HEIGHT; r++) {
      for (let c = 0; c < WIDTH; c++) {
        const tile = document.getElementById(`${r}-${c}`);
        tile.innerText = "";
        tile.classList.remove("correct", "present", "absent");
      }
    }
    setRow(0);
    setCol(0);
    setGameOver(false);
    setWon(false);
  }, 300);
}

  return (
<div className="wordle">
  {/* Win/Lose Modal */}
  {gameOver && (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: `rgba(0, 0, 0, ${showModal ? '0.5' : '0'})`,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
      transition: 'background-color 0.3s ease'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '30px',
        border: '2px solid #000',
        boxShadow: '5px 5px 10px rgba(0,0,0,0.3)',
        textAlign: 'center',
        maxWidth: '400px',
        opacity: showModal ? 1 : 0,
        transform: showModal ? 'scale(1)' : 'scale(0.9)',
        transition: 'opacity 0.3s ease, transform 0.3s ease'
      }}>
        <h1 style={{fontSize: '36px', margin: '0 0 10px 0', fontFamily: 'Courier New, monospace'}}>
          {won ? 'You win!' : 'Game Over'}
        </h1>
        <p style={{fontSize: '14px', margin: '0 0 20px 0', fontFamily: 'Courier New, monospace'}}>
          Thanks for playing! Remember: the word is always "ARYAN"!
        </p>
        <div style={{display: 'flex', gap: '10px', marginBottom: '20px', justifyContent: 'center'}}>
          {word.split('').map((letter, i) => (
            <div key={i} style={{
              width: '40px',
              height: '40px',
              backgroundColor: '#86db7fff',
              color: 'black',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '24px',
              fontWeight: 'bold',
              border: '2px solid white'
            }}>
              {letter}
            </div>
          ))}
        </div>
        <button
          onClick={restartGame}
          style={{
            padding: '10px 20px',
            fontSize: '14px',
            fontFamily: 'Courier New, monospace',
            backgroundColor: '#c0c0c0',
            border: '2px outset #999',
            cursor: 'pointer'
          }}
        >
          Restart Game
        </button>
      </div>
    </div>
  )}

  <h1>Aryordle</h1>
  <p>Wordle but with a ARYAN based twist.</p>

  <div id="board">
    {[...Array(HEIGHT)].map((_, r) =>
      [...Array(WIDTH)].map((_, c) => (
        <span key={`${r}-${c}`} id={`${r}-${c}`} className="tile" />
      ))
    )}
  </div>
</div>
  );
}

function handleKeyClick(key) {
  if (key === "DEL") {
    document.dispatchEvent(new KeyboardEvent("keyup", { code: "Backspace" }));
  } else if (key === "Enter") {
    document.dispatchEvent(new KeyboardEvent("keyup", { code: "Enter" }));
  } else {
    document.dispatchEvent(new KeyboardEvent("keyup", { code: `Key${key}` }));
  }
}