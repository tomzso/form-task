import React from "react";

export const ChoiceField = ({ field, options, value, onChange }) => {
  return (
    <div className="choice-options">
      {options?.map((opt, index) => (
        <label key={index} className="choice-label">
          <input
            type="radio"
            name={`choice-${field.id}`}
            value={opt}
            checked={value === opt}
            onChange={() => onChange(field.id, opt, field.widget)}
          />
          {opt}
        </label>
      ))}

      {value && (
        <div className="choice-clear-wrapper">
          <button
            type="button"
            className="clear-button"
            onClick={() => onChange(field.id, "", field.widget)}
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
};
