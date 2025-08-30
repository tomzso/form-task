import React, { forwardRef } from "react";

const IOSDisplayInputKeyboard = forwardRef(({ field, value, inputRef, lastField }, hiddenInputRef) => {
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
    </>
  );
});

export default IOSDisplayInputKeyboard;
