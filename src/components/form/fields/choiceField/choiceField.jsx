// components/FormFields/ChoiceField/ChoiceField.jsx
import React, { useRef } from "react";
import "./choiceField.css";
import IOSHiddenInputKeyboard from "./helpers/IOSHiddenInputKeyboard";
import AndroidHiddenInputKeyboard from "./helpers/AndroidHiddenInputKeyboard";

export const ChoiceField = ({
  field,
  options,
  value,
  error,
  onChange,
  inputRef,
  lastField = false,
}) => {
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

      {/* iOS hidden inputs keyboard*/}
      <IOSHiddenInputKeyboard
        ref={hiddenInputRef}
        field={field}
        value={value}
        inputRef={inputRef}
        lastField={lastField}
      />

      {/* Android hidden inputs keyboard */}
      <AndroidHiddenInputKeyboard
        field={field}
        options={options}
        value={value}
        inputRef={inputRef}
        onChange={onChange}
      />

      {error && <div className="form-field-error-message choice-error">{error}</div>}
    </div>
  );
};
