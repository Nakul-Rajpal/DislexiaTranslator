"use client";

import React, { useState } from "react";
import InputBox from "./components/InputBox";
import PromptSelector from "./components/PromptSelector";
import ResponseDisplay from "./components/ResponseDisplay";
import { getLlamaResponse } from "./components/llamaai";

const App: React.FC = () => {
  const [response, setResponse] = useState("");
  const [selectedPrompt, setSelectedPrompt] = useState("");

  const handleTextSubmit = async (text: string) => {
    if (!selectedPrompt) {
      alert("Please select a prompt type.");
      return;
    }
    const apiResponse = await getLlamaResponse(text, selectedPrompt);
    setResponse(apiResponse);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "'Arial', sans-serif" }}>
      <h1>Dyslexia/DysCalculia Assignment Helper</h1>
      <p>First. Select the cognitive disability you would like a break down for; then paste the problem and click submit.</p>
      <InputBox onSubmit={handleTextSubmit} />
      <PromptSelector onSelect={setSelectedPrompt} />
      {response && <ResponseDisplay response={response} />}
    </div>
  );
};

export default App;