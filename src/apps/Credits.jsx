import React, { useEffect, useState } from "react";

const credits = [
  "Designed & Developed by\nAryan Jalota",
  "Algorithms & Visualizations\nSorting, Pathfinding, A*",
  "Frontend\nReact & Custom UI",
  "Sound Design\nWeb Audio API",
  "Inspired by\nClassic Operating Systems",
  "© 2025 Aryan Jalota"
];

export default function CreditsApp() {
  // ✅ Hooks must be INSIDE the component
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  // Advance credits with fade
  const next = () => {
    if (!fade) return; // prevent spam clicks

    setFade(false); // fade out
    setTimeout(() => {
      setIndex((i) => (i + 1) % credits.length);
      setFade(true); // fade in
    }, 500);
  };

  // Auto-advance every 5 seconds
  useEffect(() => {
    const timer = setTimeout(next, 5000);
    return () => clearTimeout(timer);
  }, [index]);

  // Keyboard support
  useEffect(() => {
    const handler = () => next();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div style={styles.container} onClick={next}>
      {/* Header */}
      <div style={styles.header}>
        <div>Credits</div>
        <div style={styles.subHeader}>aryanjalota, 2025</div>
      </div>

      {/* Credit text */}
      <div
        style={{
          ...styles.creditText,
          opacity: fade ? 1 : 0,
          transition: "opacity 0.5s ease",
        }}
      >
        {credits[index].split("\n").map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </div>

      {/* Footer hint */}
      <div style={styles.hint}>
        Click, tap, or press any key to continue…
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#000000",
    color: "#ffffff",
    fontFamily: "MS Sans Serif, Tahoma, sans-serif",
    display: "flex",
    flexDirection: "column",
    userSelect: "none",
    cursor: "pointer",
  },

  header: {
    padding: "6px 10px",
    borderBottom: "1px solid #555",
    fontSize: "30px",
    fontWeight: "bold",
      alignItems: "center",
  justifyContent: "center",
  marginTop: "40px", 
  },

subHeader: {
  fontSize: "11px",
  fontWeight: "normal",
  opacity: 0.8,
  marginTop: "4px",
},


  creditText: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    fontSize: "18px",
    lineHeight: "1.6",
    textShadow: "0 0 6px rgba(255,255,255,0.35)",
  },

  hint: {
    padding: "8px",
    fontSize: "10px",
    opacity: 0.5,
    textAlign: "center",
  },
};
