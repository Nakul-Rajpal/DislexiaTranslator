import express from "express";
import cors from "cors";
import axios from "axios";

const app = express(); // Server is instantiated

// CORS Configuration
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(express.json());
app.use(cors(corsOptions));

// OpenAI API Configuration
const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";
const API_KEY = "LA-6d12545184274f23a38f26fa3cd6361242a78131c42e40aeafaa0984794e20f3"; 

// Default route to check server status
app.get("/", (req, res) => {
  res.send("The server is up!");
});

// Route to handle OpenAI requests
app.post("/response", async (req, res) => {
  const { text, promptType } = req.body;

  // Log the request body for debugging
  console.log("Request Body:", req.body);

  // Validate input
  if (!text || !promptType) {
    console.error("Missing text or promptType in the request");
    return res.status(400).send("Both text and promptType are required.");
  }

  try {
    // OpenAI API payload
    const payload = {
      model: "gpt-3.5-turbo", // Change model as needed
      messages: [
        {
          role: "system",
          content: `You are an expert in ${promptType}. Provide helpful and concise answers.`,
        },
        {
          role: "user",
          content: text,
        },
      ],
    };

    // Make the API call to OpenAI
    const response = await axios.post(OPENAI_API_URL, payload, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
    });

    console.log("OpenAI API Response:", response.data); // Debug OpenAI API response
    res.send({ response: response.data.choices[0].message.content }); // Send back the response
  } catch (error) {
    console.error("Error in OpenAI API:", error.response?.data || error.message);

    // Return detailed error response for debugging
    if (error.response) {
      return res.status(error.response.status).send(error.response.data);
    }

    res.status(500).send("An error occurred while processing your request.");
  }
});

// Define port and start listening
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
