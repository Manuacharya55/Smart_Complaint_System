import { GoogleGenAI } from "@google/genai";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" }); 

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const fetchImageAsBase64 = async (url) => {
  try {
    const response = await axios.get(url, {
      responseType: "arraybuffer",
      headers: {
        "X-Appwrite-Project": process.env.APPWRITE_PROJECT_ID,
        "X-Appwrite-Key": process.env.APPWRITE_KEY,
      },
    });
    return Buffer.from(response.data, "binary").toString("base64");
  } catch (error) {
    console.error("❌ Error fetching image:", error.message);
    throw error;
  }
};

export const imageAnalysis = async (imageURL, departmentsArray) => {
  try {
    const imageBase64 = await fetchImageAsBase64(imageURL);

    const result = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: [
        {
          role: "user",
          parts: [
  {
    text: `
Analyze the image and answer the following questions strictly based on the image content and the provided department list.

1. What problem does the image represent? Provide a short, clear description.
2. Classify the problem into one of the following severity levels: ["Quick Fix", "Moderate", "Easy"].
3. From the following list of departments, identify the most relevant one: ${JSON.stringify(departmentsArray)}.
   - If NONE of these departments are relevant to solving the problem shown in the image, then return: "department": null.

IMPORTANT:
- Only select a department from the list above.
- Do NOT guess or infer any department not present in the list.
- If no department clearly matches, set "department": null.

Respond ONLY in this strict JSON format:

{
  "description": "10 lines of description of the issue",
  "problemEnum": "Quick Fix" | "Moderate" | "Easy",
  "department": "department name" or null,
  "problem": "one liner title for problem"
}`.trim(),
  },
  {
    inlineData: {
      mimeType: "image/jpeg", // or "image/png"
      data: imageBase64,
    },
  },
]
        },
      ],
    });

    const rawText = result.candidates[0].content.parts[0].text; // 👈 must await
    const cleanJson = rawText.replace(/```json|```/g, "").trim();

    console.log(cleanJson);
    return JSON.parse(cleanJson);
  } catch (error) {
    console.error("❌ Gemini API error:", error);
    return null;
  }
};
