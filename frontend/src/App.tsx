"use client";

import React, { useState } from "react";
import InputBox from "./components/InputBox";
import PromptSelector from "./components/PromptSelector";
import ResponseDisplay from "./components/ResponseDisplay";
import { createResponseService } from "./services/backend-service";

const App: React.FC = () => {
  // State variables
  const [response, setResponse] = useState<string>(""); // Stores the API response
  const [selectedPrompt, setSelectedPrompt] = useState<string>(""); // Tracks the selected prompt
  const [isLoading, setIsLoading] = useState<boolean>(false); // Tracks loading state
  const [error, setError] = useState<string>(""); // Tracks error messages

  // Function to handle text submission
  const handleTextSubmit = async (text: string) => {
    // Ensure a prompt is selected
    if (!selectedPrompt) {
      alert("Please select a prompt type.");
      return;
    }

    setIsLoading(true); // Start loading animation
    setError(""); // Reset error state

    // Create the request to the backend service
    const { request, cancel } = createResponseService().postMessages([
      { role: "user", content: text },
      { role: "system", content: selectedPrompt }, // Include the selected prompt in the query
    ]);

    try {
      const res = await request; // Send the request
      setResponse(res.data); // Update the response state with the result
    } catch (err: any) {
      setError(err.message || "An error occurred while processing your request."); // Capture error message
    } finally {
      setIsLoading(false); // Stop loading animation
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "'Arial', sans-serif" }}>
      <h1>Dyslexia/DysCalculia Assignment Helper</h1>
      <p>
        First. Select the cognitive disability you would like a break down for; then paste the
        problem and click submit.
      </p>

      {error && <p className="text-danger">{error}</p>} {/* Display errors if present */}
      <InputBox onSubmit={handleTextSubmit} /> {/* User input box */}
      <PromptSelector onSelect={setSelectedPrompt} /> {/* Dropdown for selecting prompt type */}
      {isLoading && <div className="spinner-border"></div>} {/* Show loading animation */}
      {response && <ResponseDisplay response={response} />} {/* Display the response */}
    </div>
  );
};

export default App;
