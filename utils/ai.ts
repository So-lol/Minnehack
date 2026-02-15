import { GoogleGenerativeAI } from "@google/generative-ai";
import { Item } from "../data/seedItems";

const API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY;

if (!API_KEY) {
  console.error(
    "EXPO_PUBLIC_GEMINI_API_KEY is not set in environment variables",
  );
}

const genAI = new GoogleGenerativeAI(API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

async function urlToGenerativePart(url: string, mimeType: string) {
  try {
    const response = await fetch(url);
    const blob = await response.blob();

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = (reader.result as string).split(",")[1];
        resolve({
          inlineData: {
            data: base64data,
            mimeType,
          },
        });
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error("Error processing image:", error);
    return null;
  }
}

export interface RepairStep {
  stepNumber: number;
  title: string;
  description: string;
  tools: string[];
  links: { text: string; url: string }[];
}

export interface CostItem {
  item: string;
  cost: string;
  source: string;
}

export interface RepairData {
  steps: RepairStep[];
  costTable: CostItem[];
  totalCost: string;
}

export async function generateRepairSteps(item: Item): Promise<RepairData> {
  try {
    let imagePart = null;
    if (item.imageUri) {
      const mimeType = item.imageUri.toLowerCase().endsWith(".png")
        ? "image/png"
        : "image/jpeg";
      imagePart = await urlToGenerativePart(item.imageUri, mimeType);
    }

    const prompt = `
You are an expert repair guide. Please generate a step-by-step guide to repair or maintain the following item.
Item: ${item.title}
Description: ${item.description}
Condition: ${item.condition}

Please verify the image if provided, and use it to better understand the item's condition and model.

Output STRICT JSON format with the following structure:
{
  "steps": [
    {
      "stepNumber": number,
      "title": "string",
      "description": "string",
      "tools": ["tool1", "tool2"],
      "links": [{ "text": "display text", "url": "valid url" }]
    }
  ],
  "costTable": [
    { "item": "part/material name", "cost": "estimated cost", "source": "where to buy (generic)" }
  ],
  "totalCost": "estimated total cost range"
}

Ensure "links" point to real or plausible search queries/tutorials (e.g. if specific URL unknown, use a search URL).
`;

    const parts: any[] = [{ text: prompt }];
    if (imagePart) {
      parts.push(imagePart);
    }

    // Force JSON response
    const result = await model.generateContent({
      contents: [{ role: "user", parts }],
      generationConfig: { responseMimeType: "application/json" }
    });

    const response = await result.response;
    const text = response.text();
    return JSON.parse(text) as RepairData;
  } catch (error) {
    console.error("Error generating repair steps:", error);
    throw error;
  }
}
