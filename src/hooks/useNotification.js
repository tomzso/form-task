import { useState, useRef } from "react";

export const useNotification = (defaultDuration = 5000) => {
  const [notification, setNotification] = useState({ message: "", type: "", duration: 0 });
  const timeoutRef = useRef(null);

  const showNotification = (message, type, duration = defaultDuration) => {
    // Clear any existing timeout
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    setNotification({ message, type, duration });

    timeoutRef.current = setTimeout(() => {
      setNotification({ message: "", type: "", duration: 0 });
    }, duration);
  };

  return { notification, showNotification };
};
