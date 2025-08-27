import React, { useRef } from "react";
import "./integerField.css";
import "../../formCard/formCard";
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
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            onKeyDown?.(e);
          }
        }}
        rows={1}
        inputMode="numeric" 
        pattern="[0-9]*" 
      />
      {error && <div className="form-field-error-message">{error}</div>}
    </div>
  );
};