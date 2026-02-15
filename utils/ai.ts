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

export async function generateRepairSteps(item: Item): Promise<string> {
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

Format the output as a Markdown document. Use headers (###) for steps and bold text for emphasis.

Start with a brief overview.

Then provide the steps in this format used for every step:
### Step 1: [Title of repair step]
- **Material**: [List of materials needed]
- **Description**: [Detailed description of the step]
- **Links to research**: [One or two relevant links to tutorials or guides if applicable, otherwise "None"]

...

At the VERY END, provide an estimated cost breakdown:
### Estimated Cost
- **Materials**: [Estimated cost range for materials]
- **Labor**: [Estimated cost range if hired out, or "DIY (0)"]
- **Total**: [Total estimated cost range]
        `;

    const parts: any[] = [prompt];
    if (imagePart) {
      parts.push(imagePart);
    }

    const result = await model.generateContent(parts);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error generating repair steps:", error);
    throw error;
  }
}
