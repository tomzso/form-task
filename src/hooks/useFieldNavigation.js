import React, { useRef, useEffect } from "react";

export const useFieldNavigation = (formLabels) => {
  const inputRefs = useRef([]);
  const animationDuration = 500;

  useEffect(() => {
    inputRefs.current = formLabels.map(
      (_, i) => inputRefs.current[i] || React.createRef()
    );
  }, [formLabels]);

  const moveToNextField = (currentIndex) => {
    const nextRef = inputRefs.current[currentIndex + 1];
    if (nextRef && nextRef.current) {
      const element = nextRef.current;
      const start = window.scrollY;
      const end =
        element.getBoundingClientRect().top +
        window.scrollY -
        window.innerHeight / 2 +
        element.offsetHeight / 2;
      let startTime = null;

      const animateScroll = (time) => {
        if (!startTime) startTime = time;
        const progress = Math.min((time - startTime) / animationDuration, 1);
        window.scrollTo(0, start + (end - start) * progress);
        if (progress < 1) {
          requestAnimationFrame(animateScroll);
        } else {
          element.focus();
        }
      };

      requestAnimationFrame(animateScroll);
    }
  };

  const handleFieldKeyDown = (e, idx) => {
    if (e.key === "Enter") {
      moveToNextField(idx);
    }
  };

  return { inputRefs, moveToNextField, handleFieldKeyDown };
};
