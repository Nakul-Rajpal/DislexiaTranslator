"use client";

import React from "react";

interface PromptSelectorProps {
  onSelect: (promptType: string) => void;
}

const PromptSelector: React.FC<PromptSelectorProps> = ({ onSelect }) => {
  return (
    <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
      <button onClick={() => onSelect("Dyslexia")}>Dyslexia</button>
      <button onClick={() => onSelect("Dyscalculia")}>Dyscalculia</button>
    </div>
  );
};

export default PromptSelector;