import React, { useRef } from "react";
import "./integerField.css";
import { useAutosizeTextarea } from "../../../../hooks/useAutosizeTextarea";

export const IntegerField = ({ field, value, error, onChange, inputRef, onKeyDown }) => {
  const localRef = useRef();
  const finalRef = inputRef || localRef;

  useAutosizeTextarea(finalRef, value);

  return (
    <div className="integer-input-wrapper">
      <textarea
        ref={finalRef}
        className="integer-input"
        placeholder={field.label}
        value={value || ""}
        onChange={(e) => onChange(field.id, e.target.value, field.widget)}
        onKeyDown={onKeyDown}
        rows={1}
      />
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};