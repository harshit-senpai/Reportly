import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
});

const prompt = `Attached is an image of a clinical report. 
Go over the the clinical report and identify biomarkers that show slight or large abnormalities. Then summarize in 100 words. You may increase the word limit if the report has multiple pages. Do not output patient name, date etc. Make sure to include numerical values and key details from the report, including report title.
## Summary: `;

function fileToGenerativePart(imageData: string) {
  return {
    inlineData: {
      data: imageData.split(",")[1],
      mimeType: imageData.substring(
        imageData.indexOf(":") + 1,
        imageData.indexOf(";")
      ),
    },
  };
}

export const POST = async (req: NextRequest, res: NextResponse) => {
  const { base64 } = await req.json();
  const filePart = fileToGenerativePart(base64);
  const generateContent = await model.generateContent([prompt, filePart]);
  console.log(generateContent);
  const responseText = generateContent.response.text();

  return new Response(responseText, { status: 200 });
};
