import React, { useEffect, useState } from "react";
import "./notification.css";
import { useNotificationProgress } from "../../../hooks/useNotificationProgress";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
  faExclamationTriangle,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";

export const Notification = ({ message, type, duration }) => {
  const [visible, setVisible] = useState(false);
  const progress = useNotificationProgress(duration, visible);

  useEffect(() => {
    setVisible(!!message);

    const timeout = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(timeout);
  }, [message, duration]);

  
  const iconMap = {
    success: faCheckCircle,
    error: faTimesCircle,
    warning: faExclamationTriangle,
    validationsuccess: faCheckCircle,
  };

  const icon = iconMap[type] || faInfoCircle;

  if (!message) return null;
  return (
    <div key={message} className={`notification ${type} ${visible ? "show" : ""}`}>
      <FontAwesomeIcon icon={icon} className="notification-icon" /> {message}
      <div
        className={`notification-progress ${type}`}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};
