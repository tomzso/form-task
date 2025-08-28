import React, { useRef } from "react";
import "./choiceField.css";

export const ChoiceField = ({ field, options, value, error, onChange, inputRef }) => {
  const hiddenInputRef = useRef(null);

  const handleRadioChange = (selectedValue) => {
    onChange(field.id, selectedValue, field.widget);

    // iOS keyboard hack: focus the hidden text input
    if (hiddenInputRef.current) {
      hiddenInputRef.current.focus({ preventScroll: true });
    }
  };

  return (
    <div className="choice-options">
      {options?.map((opt, index) => (
        <label key={index} className="choice-label">
          <input
            type="radio"
            name={`choice-${field.id}`}
            value={opt}
            checked={value === opt}
            onChange={() => handleRadioChange(opt)}
          />
          {opt}
        </label>
      ))}

      {/* Clear button */}
      {value && (
        <div className="choice-clear-wrapper">
          <button
            type="button"
            className="clear-button"
            onClick={() => onChange(field.id, "", field.widget)}
          >
            Clear option
          </button>
        </div>
      )}

      {/* Hidden text input to enable and trigger iOS keyboard in the next field */}
      <input
        ref={hiddenInputRef}
        type="text"
        value={value || ""}
        onChange={() => { }}
        style={{
          position: "absolute",
          width: "1px",
          height: "1px",
          opacity: 0,
          pointerEvents: "none",
        }}
      />

      {/* Invisible text input for IOS in order turn off the keyboard when current is this choice field*/}
      <input
        ref={inputRef}
        type="text"
        value={value || ""}
        onFocus={() => {
          // When user lands here with Next/Back, redirect focus to the first radio
          const firstRadio = document.querySelector(
            `input[name="choice-${field.id}"]`
          );
          if (firstRadio) firstRadio.focus();
        }}
        onChange={() => { }} // no-op to avoid React warnings
        style={{
          position: "absolute",

          width: "1px",
          height: "1px",
          opacity: 0,
        }}
      />




      {error && <div className="form-field-error-message choice-error">{error}</div>}
    </div>
  );
};
