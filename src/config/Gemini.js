import { GoogleGenerativeAI } from "@google/generative-ai";

// Apni API key rakho yahan
const genAI = new GoogleGenerativeAI("AIzaSyDpug7Rb_gBuNeIn8UwywCrxlTKplejMSg");

async function runChat(prompt) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const result = await model.generateContent(prompt);

  const response = result.response;

  // helper se text nikal lo (pehla candidate ka text)
  const text = response.text();  

  console.log("Extracted text:", text);

  return text;   // ✅ frontend ko string milega
}

export default runChat;

