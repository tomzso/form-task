import { useState, useEffect } from "react";

export const useNotificationProgress  = (duration, active) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (!active) return;

    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const percentage = Math.max(100 - (elapsed / duration) * 115, 0);
      setProgress(percentage);
    }, 10);

    return () => clearInterval(interval);
  }, [duration, active]);

  return progress;
};
