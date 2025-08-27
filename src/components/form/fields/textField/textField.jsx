import React, { useRef } from "react";
import "./textField.css";
import "../../formCard/formCard";
import { useAutosizeTextarea } from "../../../../hooks/useAutosizeTextarea";

export const TextField = ({ field, value, error, onChange, inputRef, onKeyDown }) => {
  const localRef = useRef();
  const finalRef = inputRef || localRef; // This correctly determines which ref to use

  useAutosizeTextarea(finalRef, value); // This hook is already being used

  return (
    <div className="text-input-wrapper">
      <textarea
        ref={finalRef}
        className="text-input"
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
      />
      {error && <div className="form-field-error-message">{error}</div>}
    </div>
  );
};