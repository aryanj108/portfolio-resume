import { useEffect, useState } from "react";
import Desktop from "./Desktop";

// Intro Component
function IntroScreen({ onStart }) {
  const introMessage = "Aryan Jalota Portfolio Showcase 2025\nClick START to begin";
  const [text, setText] = useState("");
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (charIndex < introMessage.length) {
      const timeout = setTimeout(() => {
        setText((prev) => prev + introMessage.charAt(charIndex));
        setCharIndex((prev) => prev + 1);
      }, 65);
      return () => clearTimeout(timeout);
    }
  }, [charIndex, introMessage.length]);

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'black',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 10
    }}>
      <div style={{
        border: '8px solid white',
        padding: '1em 3em',
        maxWidth: '600px'
      }}>
        <pre style={{
          fontSize: '1rem',
          lineHeight: '1.5rem',
          color: 'white',
          fontFamily: '"Courier New", monospace'
        }}>
          {text}<span style={{
            animation: 'blink 0.7s steps(1) infinite'
          }}>_</span>
        </pre>
        <button
          onClick={onStart}
          style={{
            display: 'block',
            margin: '1em auto 0',
            background: 'none',
            color: 'white',
            border: '3px solid white',
            padding: '0.5em 1.2em',
            fontSize: '1rem',
            cursor: 'pointer',
            fontFamily: '"Courier New", monospace'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'white';
            e.target.style.color = 'black';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'none';
            e.target.style.color = 'white';
          }}
        >
          START
        </button>
      </div>
      <style>{`
        @keyframes blink {
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}


// Main App Component
export default function App() {
  const [showIntro, setShowIntro] = useState(true);

  return showIntro ? (
    <IntroScreen onStart={() => setShowIntro(false)} />
  ) : (
    <Desktop />
  );
}