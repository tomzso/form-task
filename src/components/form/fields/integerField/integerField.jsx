import React from "react";
import "./integerField.css";

export const IntegerField = ({ field, value, error, onChange, inputRef, onKeyDown }) => (
  <div className="integer-input-wrapper" >
    <input
      ref={inputRef}
      type="text"
      inputMode="numeric"
      pattern="[0-9]*"  
      className="integer-input"
      placeholder={field.label}
      value={value || ""}
      onChange={(e) => onChange(field.id, e.target.value, field.widget)}
      onKeyDown={onKeyDown}

    />
    {error && <div className="error-message">{error}</div>}
  </div>
);
