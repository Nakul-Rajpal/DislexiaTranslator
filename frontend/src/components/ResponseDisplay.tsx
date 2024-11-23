"use client";

import React from "react";

interface ResponseDisplayProps {
  response: string;
}

const ResponseDisplay: React.FC<ResponseDisplayProps> = ({ response }) => {
  return (
    <div style={{ marginTop: "20px", padding: "10px", border: "1px solid #ccc" }}>
      <h3>Response:</h3>
      <p>{response}</p>
    </div>
  );
};

export default ResponseDisplay;