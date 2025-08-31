import React, { useState, useEffect } from "react";
import "./Loading.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";

export const Loading = () => {
  const [timedOut, setTimedOut] = useState(false);
  const duration = 3000;

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimedOut(true);
    }, duration);

    return () => clearTimeout(timer);
  }, []);

  if (timedOut) {
    return (
      <div className="page-not-found">
        <h2><FontAwesomeIcon icon={faTriangleExclamation} size="lg" /> Something Went Wrong</h2>
      </div>
    );
  }

  return (
    <div className="loading-container">
      <div className="spinner"></div>
    </div>
  );
};
