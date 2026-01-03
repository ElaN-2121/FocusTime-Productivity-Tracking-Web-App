import React from "react";
import "../../styles/pomodoro.css";

export default function Controls({ isRunning, onStart, onPause, onReset }) {
  return (
    <div className="controls">
      {!isRunning ? (
        <button className="primary" onClick={onStart}>
          Start
        </button>
      ) : (
        <button className="primary" onClick={onPause}>
          Pause
        </button>
      )}
      <button className= "primary" onClick={onReset}> Reset</button>
    </div>
  );
}
