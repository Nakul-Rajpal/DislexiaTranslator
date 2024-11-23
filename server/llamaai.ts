const axios = require("axios");

const LLAMA_API_URL = "https://api.llama-api.com"; // Replace with actual endpoint
const API_KEY = "LA-1d0ac8b09d70445a8c3a9eff052370a324cad1fa2fe2464689c8e6b0137ed68f"; // Replace with your Llama API key

const getLlamaResponse = async (text, promptType) => {
  try {
    const response = await axios.post(
      LLAMA_API_URL,
      { text },
      { headers: { Authorization: `Bearer ${API_KEY}` } }
    );
    return response.data.response; // Adjust based on actual API response structure.
  } catch (error) {
    console.error("Error fetching LlamaAI response:", error);
    return "An error occurred while processing your request.";
  }
};

module.exports = { getLlamaResponse };
