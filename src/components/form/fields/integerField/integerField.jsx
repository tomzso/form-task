import React, { useRef } from "react";
import "./integerField.css";
import "../../formCard/formCard.css";
import { useAutosizeTextarea } from "../../../../hooks/useAutosizeTextarea";

export const IntegerField = ({ field, value, error, onChange, inputRef, onKeyDown, maxLength }) => {
  const localRef = useRef();
  const finalRef = inputRef || localRef;

  useAutosizeTextarea(finalRef, value);

  return (
    <div className="integer-input-wrapper">
      <textarea
        ref={finalRef}
        className="integer-input"
        placeholder={field.widget}
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
        maxLength={maxLength}
      />
      {(maxLength <= value?.length) && <div className="form-field-warning-message">Value exceeds maximum length</div>}
      {error && <div className="form-field-error-message">{error}</div>}
    </div>
  );
};