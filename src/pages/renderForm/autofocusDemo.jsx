import React, { useRef } from "react";
import {Input} from "./Input"

export const AutofocusDemo = () => {
  // Create the ref for the input
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFocus = () => {
    // Autofocus the input when button is clicked
    inputRef.current?.focus();
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h2>iOS Autofocus Demo</h2>

      <div style={{ marginBottom: "1rem" }}>
        <Input ref={inputRef} placeholder="Type something..." />
      </div>

      <button
        onClick={handleFocus}
        style={{
          padding: "0.5rem 1rem",
          fontSize: "1rem",
          cursor: "pointer",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "0.25rem",
        }}
      >
        Focus Input
      </button>
    </div>
  );
}
