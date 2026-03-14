"use client";

import React from "react";

interface PromptSelectorProps {
  selected: string;
  onSelect: (promptType: string) => void;
}

const options = ["Dyslexia", "Dyscalculia"];

const PromptSelector: React.FC<PromptSelectorProps> = ({ selected, onSelect }) => {
  return (
    <div style={{
      display: "flex",
      gap: "16px",
      marginBottom: "20px",
    }}>
      {options.map((option) => {
        const isActive = selected === option;
        return (
          <button
            key={option}
            onClick={() => onSelect(option)}
            style={{
              background: isActive
                ? "linear-gradient(135deg, #5c8a6a, #4a7c59)"
                : "#fffdf0",
              color: isActive ? "#fff" : "#4a6741",
              border: isActive
                ? "3px solid #3d6b4a"
                : "3px dashed #c8b88a",
              borderRadius: "18px",
              padding: "14px 32px",
              fontSize: "1.05rem",
              fontWeight: 800,
              fontFamily: "'Nunito', sans-serif",
              cursor: "pointer",
              transition: "all 0.2s ease",
              boxShadow: isActive
                ? "0 4px 14px rgba(74, 124, 89, 0.4)"
                : "0 3px 8px rgba(0, 0, 0, 0.08)",
              transform: isActive ? "scale(1.05)" : "scale(1)",
            }}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
};

export default PromptSelector;
