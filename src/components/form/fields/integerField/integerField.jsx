import React from "react";
import "./integerField.css";

export const IntegerField = ({ field, value, error, onChange }) => {
  return (
    <div className="integer-input-wrapper">
      <input
        type="number"
        className="integer-input"
        placeholder={field.label}
        value={value || ""}
        onChange={(e) => onChange(field.id, e.target.value, field.widget)}
      />
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};
