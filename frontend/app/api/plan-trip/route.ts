
import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;

// Mock data for fallback
const MOCK_ITINERARY = {
  success: true,
  estimatedCost: "₹15,000 - ₹20,000 (Mock)",
  itinerary: [
    {
      day: 1,
      title: "Arrival and Local Sightseeing",
      plan: "Arrive at your destination. Check into your hotel and freshen up. Spend the evening exploring the local market and trying some street food."
    },
    {
      day: 2,
      title: "Cultural Exploration",
      plan: "Visit the main historical sites and museums. Enjoy a traditional lunch at a local restaurant."
    },
    {
      day: 3,
      title: "Nature and Relaxation",
      plan: "Take a trip to the nearby scenic spots. Enjoy a relaxed evening with a sunset view."
    }
  ]
};

export async function POST(req: Request) {
  let body;
  try {
    body = await req.json();
  } catch (e) {
    return NextResponse.json({ success: false, message: "Invalid JSON body" }, { status: 400 });
  }

  const { destination, startDate, endDate, budget, travelers, interests } = body;

  console.log("Plan Trip API Request:", { destination, startDate, endDate, budget, travelers, interests });

  if (!destination || !startDate || !endDate || !budget || !travelers) {
    return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
  }

  try {
    if (!apiKey) {
      console.warn("GEMINI_API_KEY not found. Using mock data.");
      return NextResponse.json({ ...MOCK_ITINERARY, message: "Generated with Mock Data (API Key missing)" });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    // Try gemini-1.5-flash as it's often the default free tier model now.
    // If this fails, we catch the error and return mock data.
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      Act as an expert travel planner. Create a highly realistic, detailed, and legitimate travel itinerary for a trip to ${destination}.
      
      Here are the specific constraints you MUST follow:
      - Dates: From ${startDate} to ${endDate} (calculate the exact number of days).
      - Budget: ${budget} (Ensure that all suggested hotels, meals, transport, and activities strictly align with this budget range).
      - Travelers: ${travelers}.
      - Interests: ${interests.join(", ")}.

      Make the itinerary practical. Include real attractions, legitimate activities, and logical travel times between locations in ${destination}.
      
      Return the response in strictly valid JSON format.
      The structure MUST exactly match this:
      {
        "success": true,
        "estimatedCost": "string range in INR (e.g., ₹20,000 - ₹25,000) ensuring it matches the ${budget} budget",
        "itinerary": [
          {
            "day": 1,
            "title": "Title for the day",
            "plan": "Detailed activities for the day, including morning, afternoon, and evening plans."
          }
        ]
      }
      Do not include any markdown formatting (like \`\`\`json). Just the raw JSON string.
    `;

    console.log("Sending prompt to Gemini (gemini-1.5-flash)...");
    const result = await model.generateContent(prompt);
    console.log("Gemini response received.");

    const response = await result.response;
    const text = response.text();
    console.log("Raw AI Response:", text);

    const cleanedText = text.replace(/```json/g, "").replace(/```/g, "").trim();
    const jsonResponse = JSON.parse(cleanedText);
    return NextResponse.json(jsonResponse);

  } catch (error: any) {
    console.error("AI Generation Failed:", error);

    // Check for specific error types if needed, but for now, fallback to mock
    console.warn("Falling back to mock itinerary.");

    // Customize mock data slightly based on request
    const mockResponse = {
      ...MOCK_ITINERARY,
      message: `AI generation failed (${error.message || "Unknown error"}). Showing sample itinerary for ${destination}.`
    };

    return NextResponse.json(mockResponse);
  }
}
