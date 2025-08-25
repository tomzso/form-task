import React from "react";
import "./progressBar.css";

/**
 * Props:
 * - value (number): value to represent the progress, from 0 to 100
 * - showLabel (bool): whether to show the percentage
 */
export const ProgressBar = ({ value, showLabel = true }) => {
  const clampValue = Math.min(100, Math.max(0, value));

  return (
    <div className="progress-bar-container">
      <div
        className="progress-bar-filled"
        style={{ width: `${clampValue}%` }}
      />
      {showLabel && (
        <span className="progress-bar-label">{clampValue}%</span>
      )}
    </div>
  );
};

export default ProgressBar;