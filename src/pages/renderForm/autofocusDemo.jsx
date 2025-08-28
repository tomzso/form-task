import { useState, useRef } from "react";

export const AutofocusDemo = () => {
  const [value, setValue] = useState("");
  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);
  const inputRef3 = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Append "hello" to current value
    setValue((prev) => prev + "hello");

    // Remove focus from both inputs to close keyboard
    if (inputRef1.current) inputRef1.current.blur();
    if (inputRef2.current) inputRef2.current.blur();
  };

  return (
    <div style={{ padding: "2rem" }}>
      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef1}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Type something..."
          style={{ padding: "0.5rem", fontSize: "1rem", marginBottom: "1rem" }}

        />
        <button type="submit" style={{ marginLeft: "1rem", padding: "0.5rem 1rem" }}>
          Submit
        </button>

        <input
          ref={inputRef2}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Type something..."
          style={{ padding: "0.5rem", fontSize: "1rem", marginBottom: "1rem" }}
          disabled={false}
          onFocus={() => {
            // Redirect focus to the first input when this is focused
            if (inputRef2.current) {
              inputRef2.current.blur();
            }
          }}
        />

        <input
          ref={inputRef3}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Type something..."
          style={{ padding: "0.5rem", fontSize: "1rem", marginBottom: "1rem" }}
          disabled={false}
        />
        <button type="submit" style={{ marginLeft: "1rem", padding: "0.5rem 1rem" }}>
          Submit
        </button>
      </form>
    </div>
  );
};
