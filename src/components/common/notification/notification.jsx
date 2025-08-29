// Notification.jsx
import React from "react";
import "./notification.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faTimesCircle, faExclamationTriangle, faInfoCircle } from "@fortawesome/free-solid-svg-icons";

export const Notification = ({ message, type }) => {
  if (!message) return null;

  // choose icon based on type
  const iconMap = {
    success: faCheckCircle,
    error: faTimesCircle,
    warning: faExclamationTriangle
  };

  const icon = iconMap[type] || faInfoCircle; // fallback

  return (
    <div className={`notification ${type}`}>
      <FontAwesomeIcon icon={icon} className="notification-icon" />{" "}
      {message}
    </div>
  );
};
