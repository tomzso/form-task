import React from "react";
import "./progressBar.css";

export const ProgressBar = ({ value }) => {
  const clampValue = Math.min(100, Math.max(0, value));

  return (
    <div className="progress-bar-container">
      <div
        className="progress-bar-filled"
        style={{
          width: `${clampValue}%`,
          background: clampValue === 100 ? "#4caf50" : "#FF57DF",
        }}
      />
      <span className="progress-bar-label">{clampValue}%</span>
    </div>
  );
};
