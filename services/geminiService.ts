
import { GoogleGenAI, Type } from "@google/genai";
import { LanguageSpecs, ExecutionResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export async function interpretAndromeda(
  code: string,
  specs: LanguageSpecs
): Promise<ExecutionResult> {
  const prompt = `
    You are the Andromeda Language Engine. 
    The user is designing a new programming language called "Andromeda".
    
    Current Language Specifications:
    - Description: ${specs.description}
    - Variables: ${specs.variables}
    - Functions: ${specs.functions}
    - Loops: ${specs.loops}
    - Print/Output: ${specs.print}
    - Types: ${specs.types}

    CODE TO EXECUTE:
    \`\`\`andromeda
    ${code}
    \`\`\`

    TASK:
    1. Act as a virtual interpreter for this code based on the specifications.
    2. Output exactly what would be printed to the console.
    3. Provide a brief analysis of any syntax errors or logical improvements.
    
    If there is an error, describe it clearly.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            output: { type: Type.STRING, description: "The text output from signal() or print statements." },
            error: { type: Type.STRING, description: "Any syntax or runtime errors found." },
            analysis: { type: Type.STRING, description: "Brief AI analysis of the code." }
          },
          required: ["output", "analysis"]
        }
      }
    });

    const result = JSON.parse(response.text || "{}");
    return {
      output: result.output || "",
      error: result.error,
      analysis: result.analysis
    };
  } catch (err) {
    console.error("Gemini Error:", err);
    return {
      output: "",
      error: "Failed to reach the Andromeda Engine. Please check your connection or code.",
      analysis: "Interpreter error."
    };
  }
}

export async function suggestSpecs(currentSpecs: LanguageSpecs): Promise<LanguageSpecs> {
  const prompt = `
    Based on the current Andromeda language specs, suggest 3 creative improvements or new keywords 
    that fit the "cosmic/space" theme. 
    Current specs: ${JSON.stringify(currentSpecs)}
    Return the full updated LanguageSpecs object.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            variables: { type: Type.STRING },
            functions: { type: Type.STRING },
            loops: { type: Type.STRING },
            print: { type: Type.STRING },
            types: { type: Type.STRING },
            description: { type: Type.STRING }
          },
          required: ["variables", "functions", "loops", "print", "types", "description"]
        }
      }
    });

    return JSON.parse(response.text || "{}") as LanguageSpecs;
  } catch (err) {
    return currentSpecs;
  }
}
