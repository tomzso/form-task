import React from "react";

export const TextField = ({ field, value, error, onChange, inputRef, onKeyDown }) => (
  <div className="text-input-wrapper">
    <input
      ref={inputRef}
      type="text"
      className="text-input"
      placeholder={field.label}
      value={value || ""}
      onChange={(e) => onChange(field.id, e.target.value, field.widget)}
      onKeyDown={onKeyDown} // pass down
    />
    {error && <div className="error-message">{error}</div>}
  </div>
);