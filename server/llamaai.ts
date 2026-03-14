const axios = require("axios");

const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions"; // OpenAI endpoint
const API_KEY = "LA-6d12545184274f23a38f26fa3cd6361242a78131c42e40aeafaa0984794e20f3"; // Replace with your OpenAI API key

const getLlamaResponse = async (text, promptType) => {
  try {
    const response = await axios.post(
      OPENAI_API_URL,
      {
        model: "gpt-3.5-turbo", // Specify the OpenAI model
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
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    // Return the content of the assistant's response
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("Error fetching OpenAI response:", error.response?.data || error.message);
    return "An error occurred while processing your request.";
  }
};

module.exports = { getLlamaResponse };
