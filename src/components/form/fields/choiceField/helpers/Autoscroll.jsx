import React, { forwardRef } from "react";

const Autoscroll = forwardRef(({ field, value, inputRef, lastField }, hiddenInputRef) => {
  return (
    <>
      {/* Autoscroll for choice options and Hide iOS keyboard */}
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

export default Autoscroll;
