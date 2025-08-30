import React from "react";

const AndroidHiddenInputKeyboard = ({ field, options, value, inputRef, onChange }) => {
  return (
    <select
      ref={inputRef}
      value={value || ""}
      onChange={(e) => onChange(field.id, e.target.value, field.widget)}
      onFocus={(e) => e.target.blur()}
      style={{
        position: "absolute",
        width: "1px",
        height: "1px",
        opacity: 0,
        pointerEvents: "none",
      }}
    >
      <option value=""></option>
      {options?.map((opt, index) => (
        <option key={index} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
};

export default AndroidHiddenInputKeyboard;
