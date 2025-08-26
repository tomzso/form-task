import React from "react";
import "./choiceField.css";

export const ChoiceField = ({ field, options, value, error, onChange, inputRef, invisibleValue }) => (
  <div className="choice-options" ref={inputRef} tabIndex={0}>

    {/* Radio options */}
    {options?.map((opt, index) => (
      <label key={index} className="choice-label">
        <input
          ref={index === 0 ? inputRef : null}
          type="radio"
          name={`choice-${field.id}`}
          value={opt}
          checked={value === opt}
          onChange={() => onChange(field.id, opt, field.widget)}
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
          Clear
        </button>
      </div>
    )}

{/* Invisible text input for IOS */}
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
  onChange={() => {}} // no-op to avoid React warnings
  style={{
    position: "absolute",

    width: "1px",
    height: "1px",
    opacity: 0,
  }}
/>

    {/* Invisible text input for Android */}
<select
  ref={inputRef}
  value={value || ""}
  onChange={(e) => onChange(field.id, e.target.value, field.widget)}
  style={{
    position: "absolute",

    width: "1px",
    height: "1px",
    opacity: 0,
    pointerEvents: "none",
  }}
>
  <option value=""></option>
  {options.map((opt, index) => (
    <option key={index} value={opt}>
      {opt}
    </option>
  ))}
</select>
    



    {error && <div className="error-message">{error}</div>}
  </div>
);
