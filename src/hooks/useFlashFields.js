import { useState } from "react";

export const useFlashFields = () => {
  const [flashFields, setFlashFields] = useState(new Set());
  const animationDuration = 3000;

  const flashMissingFields = (fieldIds) => {
    setFlashFields(new Set(fieldIds));
    setTimeout(() => setFlashFields(new Set()), animationDuration);
  };

  return { flashFields, flashMissingFields };
};
