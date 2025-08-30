import React, { useEffect, useState } from "react";
import "./notification.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faTimesCircle, faExclamationTriangle, faInfoCircle } from "@fortawesome/free-solid-svg-icons";

export const Notification = ({ message, type, duration }) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (message) {
      setProgress(100); // reset progress
      const start = Date.now();

      const interval = setInterval(() => {
        const elapsed = Date.now() - start;
        const percentage = Math.max(100 - (elapsed / duration) * 115, 0);
        setProgress(percentage);
      }, 10);
        
      return () => clearInterval(interval);
    }
  }, [message, duration]);

  if (!message) return null;

  const iconMap = {
    success: faCheckCircle,
    error: faTimesCircle,
    warning: faExclamationTriangle,
  };

  const icon = iconMap[type] || faInfoCircle;

  return (
    <div className={`notification ${type}`}>
      <FontAwesomeIcon icon={icon} className="notification-icon" />{" "}
      {message}
      <div className={`notification-progress ${type}`} style={{ width: `${progress}%` }} />
    </div>
  );
};
