import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { destination, startDate, endDate, budget, travelers, interests } = body;

        const apiKey = process.env.GEMINI_API_KEY;

        // Helper to generate mock data
        const getMockItinerary = () => [
            { day: 1, title: `Welcome to ${destination}`, plan: `Arrival in ${destination}. Check-in and relax at your hotel. Evening walk around the local markets to experience the vibe.` },
            { day: 2, title: "Exploring Culture", plan: `Visit the main landmarks and temples. Enjoy authentic local cuisine (${interests.join(', ')}).` },
            { day: 3, title: "Nature & Adventure", plan: `Morning nature activity or hike near popular spots. Afternoon free for leisure or shopping.` },
            { day: 4, title: "Farewell", plan: `Breakfast at a local cafe. Souvenir shopping before heading to the airport/station for departure.` }
        ];

        if (!apiKey) {
            console.warn("GEMINI_API_KEY not found. Using mock response.");
            await new Promise(resolve => setTimeout(resolve, 800));
            return NextResponse.json({
                itinerary: getMockItinerary(),
                estimatedCost: budget || "Calculated by AI",
                success: true,
                note: "Mock Data (Add API Key)"
            });
        }

        try {
            const genAI = new GoogleGenerativeAI(apiKey);
            const model = genAI.getGenerativeModel({ model: "gemini-pro" });

            const prompt = `Plan a travel itinerary for a trip to ${destination}.
            Duration: From ${startDate} to ${endDate}.
            Travelers: ${travelers}.
            Budget: ${budget}.
            Interests: ${interests.join(', ')}.
            
            Please generate a JSON response with the following structure:
            {
                "itinerary": [
                    { "day": 1, "title": "Day Title", "plan": "Detailed plan for the day" },
                    ...
                ],
                "estimatedCost": "Estimated total cost range in INR"
            }
            Only return the JSON. Do not include markdown formatting.`;

            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();

            // Clean markdown if present
            const jsonStr = text.replace(/```json|```/g, '').trim();
            const data = JSON.parse(jsonStr);

            return NextResponse.json({
                itinerary: data.itinerary,
                estimatedCost: data.estimatedCost,
                success: true
            });
        } catch (aiError) {
            console.error("AI Generation Failed (Falling back to mock):", aiError);
            // Fallback to mock data on AI failure
            return NextResponse.json({
                itinerary: getMockItinerary(),
                estimatedCost: budget || "₹25,000 - ₹50,000",
                success: true,
                message: "Generated with basic planner (AI busy)"
            });
        }

    } catch (error) {
        console.error("Critical Plan Error:", error);
        return NextResponse.json({ message: "Error generating plan" }, { status: 500 });
    }
}
