const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function generateReply(prompt) {
  try {
    const response = await ai.models.generateContent({
      model: process.env.MODEL || "gemini-2.5-flash",
      contents: prompt,
    });

    return response.text;
  } catch (err) {
    console.error(err);
    return "Sorry, I couldn't generate a response.";
  }
}

module.exports = {
  generateReply,
};