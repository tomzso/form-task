import React from "react";
import "./progressBar.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

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
        style={{
          width: `${clampValue}%`,
          background: clampValue === 100 ? "#4caf50" : "#FF57DF"
        }}
      />
    </div>
  );
};
