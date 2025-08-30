import React, { forwardRef } from "react";

const IOSHiddenInputKeyboard = forwardRef(({ field, value, inputRef, lastField }, hiddenInputRef) => {
  return (
    <>
      {/* Hidden text input to enable iOS keyboard for next field */}
      {!lastField && (
        <input
          ref={hiddenInputRef}
          type="text"
          value={value || ""}
          onChange={() => {}}
          style={{
            position: "absolute",
            width: "1px",
            height: "1px",
            opacity: 0,
            pointerEvents: "none",
          }}
        />
      )}

      {/* Invisible text input to suppress iOS keyboard */}
      <input
        ref={inputRef}
        type="text"
        value={value || ""}
        onFocus={() => {
          const firstRadio = document.querySelector(
            `input[name="choice-${field.id}"]`
          );
          if (firstRadio) firstRadio.focus();
        }}
        onChange={() => {}}
        style={{
          position: "absolute",
          width: "1px",
          height: "1px",
          opacity: 0,
        }}
      />
    </>
  );
});

export default IOSHiddenInputKeyboard;
