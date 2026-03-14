// InputBox.tsx
import React, { useState } from 'react';

interface InputBoxProps {
  onSubmit: (text: string) => void;
}

const InputBox: React.FC<InputBoxProps> = ({ onSubmit }) => {
  const [inputText, setInputText] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      onSubmit(inputText);
      setInputText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{
      background: '#fffdf0',
      border: '3px dashed #c8b88a',
      borderRadius: '22px',
      padding: '24px',
      width: '100%',
      maxWidth: '520px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    }}>
      <textarea
        value={inputText}
        onChange={handleChange}
        placeholder="Paste your problem here..."
        rows={5}
        style={{
          width: '100%',
          border: '2px solid #d4c9a8',
          borderRadius: '14px',
          padding: '14px 16px',
          fontSize: '1rem',
          fontFamily: "'Nunito', sans-serif",
          fontWeight: 600,
          color: '#2c3e50',
          background: '#fff',
          resize: 'vertical',
          outline: 'none',
          transition: 'border-color 0.2s ease',
        }}
        onFocus={(e) => e.target.style.borderColor = '#5c8a6a'}
        onBlur={(e) => e.target.style.borderColor = '#d4c9a8'}
      />
      <button type="submit" style={{
        marginTop: '14px',
        width: '100%',
        background: 'linear-gradient(135deg, #5c8a6a, #4a7c59)',
        color: '#fff',
        border: 'none',
        borderRadius: '14px',
        padding: '14px 0',
        fontSize: '1.1rem',
        fontWeight: 800,
        fontFamily: "'Nunito', sans-serif",
        cursor: 'pointer',
        boxShadow: '0 4px 14px rgba(74, 124, 89, 0.35)',
        transition: 'all 0.2s ease',
      }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.02)';
          e.currentTarget.style.boxShadow = '0 6px 18px rgba(74, 124, 89, 0.5)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 14px rgba(74, 124, 89, 0.35)';
        }}
      >
        Submit
      </button>
    </form>
  );
};

export default InputBox;
