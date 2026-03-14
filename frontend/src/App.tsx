/**
 * @file App.tsx
 * @project DislexiaTranslator
 * @author Nakul Rajpal
 * @created 2024-10-14
 * @description Root application component. Manages learning-style selection, user input,
 *              and communication with the backend API to display AI-simplified responses.
 * @source HUMAN_AUTHORED
 */

import React, { useState } from 'react';
import InputBox from './components/InputBox';
import PromptSelector from './components/PromptSelector';
import ResponseDisplay from './components/ResponseDisplay';
import './App.css';

/**
 * Root component that orchestrates the full user flow:
 * 1. User selects a learning style via {@link PromptSelector}.
 * 2. User types a question into {@link InputBox}.
 * 3. The question is POSTed to the backend, and the AI response is shown in {@link ResponseDisplay}.
 *
 * @returns {React.ReactElement} The rendered application shell.
 * @example
 * // Rendered automatically by main.tsx:
 * // <App />
 * @source HUMAN_AUTHORED
 */
const App: React.FC = () => {
  const [response, setResponse] = useState<string>('');
  const [selectedPrompt, setSelectedPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  /**
   * Sends the user's question to the backend API along with the selected
   * learning-style prompt type, then stores the AI response in state.
   *
   * @param {string} text - The user's question or problem text.
   * @returns {Promise<void>}
   * @example
   * handleTextSubmit("What is photosynthesis?");
   * @source HUMAN_AUTHORED
   */
  const handleTextSubmit = async (text: string) => {
    if (!selectedPrompt) {
      alert('Please select a prompt type.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('http://localhost:8080/response', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text, promptType: selectedPrompt }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      setResponse(data.response);
    } catch (err: any) {
      setError(err.message || 'An error occurred while processing your request.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container">
      <div className="app-header">
        <h1 className="app-title">Assignment Helper</h1>
      </div>

      <p className="app-description">
        Select your learning style below, then paste your problem and hit submit!
      </p>

      {error && <div className="error-bubble">{error}</div>}

      <PromptSelector selected={selectedPrompt} onSelect={setSelectedPrompt} />
      <InputBox onSubmit={handleTextSubmit} />

      {isLoading && (
        <div className="loading-container">
          <div className="cozy-spinner" />
          <span className="loading-text">Thinking...</span>
        </div>
      )}

      {response && <ResponseDisplay response={response} />}

      <div className="bottom-bar">
        <div className="bottom-bar-hint">
          <span className="hint-badge">1</span> Select
        </div>
        <div className="bottom-bar-hint">
          <span className="hint-badge">2</span> Type
        </div>
        <div className="bottom-bar-hint">
          <span className="hint-badge">3</span> Submit
        </div>
      </div>
    </div>
  );
};

export default App;
