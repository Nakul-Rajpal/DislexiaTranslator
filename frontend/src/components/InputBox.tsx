"use client";

import React, { useState } from "react";

interface InputBoxProps {
  onSubmit: (text: string) => void;
}

const InputBox: React.FC<InputBoxProps> = ({ onSubmit }) => {
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    if (input.trim()) {
      onSubmit(input);
      setInput("");
    }
  };

  return (
    <div style={{ margin: "20px" }}>
      <textarea
        placeholder="Enter text here"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ width: "100%", height: "150px", padding: "10px" }}
      />
      <button onClick={handleSubmit} style={{ marginTop: "10px" }}>
        Submit
      </button>
    </div>
  );
};

export default InputBox;