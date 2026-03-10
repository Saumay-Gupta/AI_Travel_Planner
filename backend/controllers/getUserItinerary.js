import Itinerary from "../models/itinerary.js";
import { GoogleGenerativeAI } from "@google/generative-ai";


const getUserItinerary = async (req, res) => {
    try {
        const user_id = req.user.user_id;

        const itinerary_id = req.params.id;

        let itinerary_details = '';

        if(itinerary_id) itinerary_details = await Itinerary.findOne({_id : itinerary_id, user_id: user_id});
        else itinerary_details = await Itinerary.findOne({user_id : user_id}).sort({ createdAt: -1 });


        if (!itinerary_details) {
            return res.status(404).json({ message: "Itinerary not found" });
        }

        const {destination, startDate, endDate} = itinerary_details;


        const url = "https://api.openweathermap.org/data/2.5/forecast";
        const query = new URLSearchParams({
            q: destination,
            appid: process.env.WEATHER_API_KEY,
            units: "metric",
        }).toString();


        const response = await fetch(`${url}?${query}`);
        const weatherDataFromAPI = await response.json();


        const weatherData = {
            destination: destination,
            startDate: startDate,
            endDate: endDate,
            weatherForecast: weatherDataFromAPI,
        }

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const prompt = `You are a professional travel planner. Create a travel itinerary based on these details and provide Day Wise Itinerary. Each line MUST strictly follow this format:
Day<number> - <HH:MM> - <activity description>

For example:
Day1 - 09:00 - Visit the Eiffel Tower
Day1 - 12:00 - Lunch at a local café
Day2 - 08:00 - Morning hike

Rules:
- Each activity must be on its own line.
- Do NOT include any headers, bullet points, asterisks, bold text, or extra formatting.
- Do NOT include budget tips, travel tips, or any text outside the Day format.
- Only output lines in the exact format: Day<number> - <HH:MM> - <activity>

Here are the trip details: ${JSON.stringify(itinerary_details)}`;


        const result = await model.generateContent(prompt);
        const itinerary = result.response.text();

        res.json({ success: true, itinerary , weatherData});
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}


export default getUserItinerary;