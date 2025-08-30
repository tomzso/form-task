import React, { useRef } from "react";
import "./choiceField.css";
import "../../formCard/formCard.css";
import IOSDisplayInputKeyboard from "./helpers/IOSDisplayInputKeyboard";
import AndroidHiddenInputKeyboard from "./helpers/AndroidHiddenInputKeyboard";
import Autoscroll from "./helpers/Autoscroll";
import { isIOS, isAndroid } from "react-device-detect";

export const ChoiceField = ({ field, options, value, error, onChange, inputRef, nextFieldType, lastField = false }) => {
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

      {/* iOS hidden inputs keyboard and Desktop autoscroll */}
      {(isIOS || !isAndroid) &&
        <Autoscroll
          ref={hiddenInputRef}
          field={field}
          value={value}
          inputRef={inputRef}
          lastField={lastField}
        />}

      {/* iOS display inputs keyboard*/}
      {isIOS && nextFieldType !== "choice" &&
        <IOSDisplayInputKeyboard
          ref={hiddenInputRef}
          field={field}
          value={value}
          inputRef={inputRef}
          lastField={lastField}
        />}

      {/* Android hidden inputs keyboard */}
      {isAndroid && 
        <AndroidHiddenInputKeyboard
          field={field}
          options={options}
          value={value}
          inputRef={inputRef}
          onChange={onChange}
        />}

      {error && <div className="form-field-error-message choice-error">{error}</div>}
    </div>
  );
};
