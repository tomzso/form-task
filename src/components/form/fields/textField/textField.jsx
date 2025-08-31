import React, { useRef } from "react";
import "./textField.css";
import "../../formCard/formCard.css";
import { useAutosizeTextarea } from "../../../../hooks/useAutosizeTextarea";

export const TextField = ({ field, value, error, onChange, inputRef, onKeyDown }) => {
  const localRef = useRef();
  const finalRef = inputRef || localRef;
  const maxLength = 50; 

  useAutosizeTextarea(finalRef, value); 

  return (
    <div className="text-input-wrapper">
      <textarea
        ref={finalRef}
        className="text-input"
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
        maxLength={maxLength}
      />
      {(maxLength <= value?.length) && <div className="form-field-warning-message">Value exceeds maximum length</div>}
      {error && <div className="form-field-error-message">{error}</div>}
    </div>
  );
};