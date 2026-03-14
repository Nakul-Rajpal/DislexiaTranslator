/**
 * @file ResponseDisplay.tsx
 * @project DislexiaTranslator
 * @author Nakul Rajpal
 * @created 2024-10-14
 * @description Read-only card that renders the AI-generated response returned
 *              by the backend, styled to match the cozy "Piece by Piece" aesthetic.
 * @source HUMAN_AUTHORED
 */

import React from "react";

/** Props accepted by the {@link ResponseDisplay} component. */
interface ResponseDisplayProps {
  /** The AI-generated response text to display. */
  response: string;
}

/**
 * Displays the AI response inside a two-part card: a dark header labeled
 * "Response" and a cream-coloured body containing the text. Whitespace in
 * the response is preserved via `white-space: pre-wrap`.
 *
 * @param {ResponseDisplayProps} props - Component props.
 * @returns {React.ReactElement} The response card element.
 * @example
 * <ResponseDisplay response="2 + 2 equals 4." />
 * @source HUMAN_AUTHORED
 */
const ResponseDisplay: React.FC<ResponseDisplayProps> = ({ response }) => {
  return (
    <div style={{
      marginTop: '24px',
      width: '100%',
      maxWidth: '520px',
    }}>
      {/* Header bubble */}
      <div style={{
        background: '#1b3a4b',
        color: '#fff',
        padding: '10px 22px',
        borderRadius: '14px 14px 0 0',
        fontWeight: 800,
        fontSize: '1rem',
        fontFamily: "'Nunito', sans-serif",
      }}>
        Response
      </div>

      {/* Body card */}
      <div style={{
        background: '#fffdf0',
        border: '3px dashed #c8b88a',
        borderTop: 'none',
        borderRadius: '0 0 22px 22px',
        padding: '20px 24px',
        fontSize: '1rem',
        fontWeight: 600,
        fontFamily: "'Nunito', sans-serif",
        color: '#2c3e50',
        lineHeight: 1.7,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        whiteSpace: 'pre-wrap' as const,
      }}>
        {response}
      </div>
    </div>
  );
};

export default ResponseDisplay;
