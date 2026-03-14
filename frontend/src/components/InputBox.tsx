/**
 * @file InputBox.tsx
 * @project DislexiaTranslator
 * @author Nakul Rajpal
 * @created 2024-10-14
 * @description Textarea form component that captures the user's question and
 *              submits it to the parent handler for API processing.
 * @source HUMAN_AUTHORED
 */

import React, { useState } from 'react';

/** Props accepted by the {@link InputBox} component. */
interface InputBoxProps {
  /** Callback invoked with the trimmed input text when the form is submitted. */
  onSubmit: (text: string) => void;
}

/**
 * Renders a styled textarea with a submit button. On submission the input is
 * forwarded to the parent via {@link InputBoxProps.onSubmit} and the field is cleared.
 *
 * @param {InputBoxProps} props - Component props.
 * @returns {React.ReactElement} The input form element.
 * @example
 * <InputBox onSubmit={(text) => console.log(text)} />
 * @source HUMAN_AUTHORED
 */
const InputBox: React.FC<InputBoxProps> = ({ onSubmit }) => {
  const [inputText, setInputText] = useState('');

  /**
   * Updates local state as the user types.
   *
   * @param {React.ChangeEvent<HTMLTextAreaElement>} e - Textarea change event.
   * @returns {void}
   * @source HUMAN_AUTHORED
   */
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  };

  /**
   * Prevents default form submission, forwards the trimmed text to the parent
   * callback, and resets the textarea.
   *
   * @param {React.FormEvent} e - Form submit event.
   * @returns {void}
   * @example
   * // Triggered internally when the user clicks "Submit"
   * @source HUMAN_AUTHORED
   */
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
