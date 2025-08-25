import React from "react";

export const TextField = ({ field, value, onChange }) => {
  return (
    <div className="text-input-wrapper">
      <input
        type="text"
        className="text-input"
        placeholder={field.label}
        value={value || ""}
        onChange={(e) => onChange(field.id, e.target.value, field.widget)}
      />
    </div>
  );
};
