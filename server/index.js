import express from "express";
import cors from "cors";
import axios from "axios";

// Llama API Configuration
const LLAMA_API_URL = "https://api.llama-api.com"; // Replace with actual endpoint.
const API_KEY = "LA-1d0ac8b09d70445a8c3a9eff052370a324cad1fa2fe2464689c8e6b0137ed68f"; // Replace with your LlamaAI API key.

const app = express(); // Server is instantiated

// CORS Configuration
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(express.json());
app.use(cors(corsOptions));

// Default route to check server status
app.get("/", (req, res) => {
  res.send("The server is up!");
});

// Route to call Llama API
app.post("/response", async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).send("Both text and promptType are required.");
  }

  try {
    const response = await axios.post(
      LLAMA_API_URL,
      { text },
      { headers: { Authorization: `Bearer ${API_KEY}` } }
    );

    // Send the processed response back to the client
    res.send(response.data.response);
  } catch (error) {
    console.error("Error fetching LlamaAI response:", error.message);
    res.status(500).send("An error occurred while processing your request.");
  }
});

// Define port and start listening
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});