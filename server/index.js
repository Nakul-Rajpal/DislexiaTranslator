/**
 * @file index.js
 * @project DislexiaTranslator
 * @author Nakul Rajpal
 * @created 2024-10-14
 * @description Express server that proxies user queries to the OpenAI Chat Completions API,
 *              returning simplified responses tailored for users with dyslexia or dyscalculia.
 * @source HUMAN_AUTHORED
 */

import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();

/**
 * CORS configuration — allows all origins for local development.
 * @type {object}
 */
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

/**
 * Health-check route to verify the server is running.
 *
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 * @returns {void} Sends a plain-text status message.
 * @example
 * // GET http://localhost:8080/
 * // Response: "The server is up!"
 * @source HUMAN_AUTHORED
 */
app.get("/", (req, res) => {
  res.send("The server is up!");
});

/**
 * Accepts a user question and a learning-style prompt type, forwards them to
 * the OpenAI Chat Completions API, and returns the AI-generated answer.
 *
 * The system message instructs the model to act as an expert in the selected
 * prompt type (e.g., "Dyslexia" or "Dyscalculia") so responses are tailored
 * to that learning style.
 *
 * @param {import('express').Request} req - Express request with JSON body.
 * @param {string} req.body.text - The user's question or problem text.
 * @param {string} req.body.promptType - The learning style category (e.g., "Dyslexia").
 * @param {import('express').Response} res - Express response object.
 * @returns {Promise<void>} Sends `{ response: string }` on success, or an error status.
 * @example
 * // POST http://localhost:8080/response
 * // Body: { "text": "What is 2+2?", "promptType": "Dyscalculia" }
 * // Response: { "response": "2 + 2 equals 4. ..." }
 * @source HUMAN_AUTHORED
 */
app.post("/response", async (req, res) => {
  const { text, promptType } = req.body;

  console.log("Request Body:", req.body);

  if (!text || !promptType) {
    console.error("Missing text or promptType in the request");
    return res.status(400).send("Both text and promptType are required.");
  }

  try {
    const payload = {
      model: "gpt-3.5-turbo",
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

    const response = await axios.post(OPENAI_API_URL, payload, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
    });

    console.log("OpenAI API Response:", response.data);
    res.send({ response: response.data.choices[0].message.content });
  } catch (error) {
    console.error("Error in OpenAI API:", error.response?.data || error.message);

    if (error.response) {
      return res.status(error.response.status).send(error.response.data);
    }

    res.status(500).send("An error occurred while processing your request.");
  }
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
