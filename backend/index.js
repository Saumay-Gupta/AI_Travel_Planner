import express from "express"
import cors from "cors"
import OpenAI from "openai"
import dotenv from "dotenv"

const app = express();
app.use(express.json())
app.use(cors());
dotenv.config();


const client = new OpenAI({
  apiKey: process.env.AZURE_OPENAI_KEY,
  baseURL: `${process.env.AZURE_OPENAI_ENDPOINT}/openai/deployments/${process.env.AZURE_OPENAI_DEPLOYMENT}`,
  defaultQuery: { "api-version": "2024-12-01-preview" },
  defaultHeaders: {
    "api-key": process.env.AZURE_OPENAI_KEY,
  },
});

app.post("/api/itinerary", async (req, res) => {

    const {destination, to, from} = req.body;

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
        startDate: to,
        endDate: from,
        weatherForecast: weatherDataFromAPI,
    }

  
    const data = req.body;

    // console.log("Response from frontend:", data);

    try {
        const result = await client.chat.completions.create({
        messages: [
            {
            role: "system",
            content: "You are a professional travel planner.",
            },
            {
            role: "user",
            content: `Create a travel itinerary based on these details and provide Day Wise Intinerary Like which place and which activity u can do it on Day1 - , Day2 - , and add time with each activity and add a dash "-" between time and activity, so that i can split data easily and remove all extra stuff like budget travel tips, basically just send only Day1 - , Day2 - , Day3 - ,: ${JSON.stringify(data)}`,
            },
        ],
        });

        const itinerary = result.choices[0].message.content;

        // console.log("AI Response:", itinerary);
        // console.log("AI Response:", weatherData);

        res.json({ success: true, itinerary , weatherData});
    } catch (error) {
        // console.error("Azure OpenAI error:", error);
        res.status(500).json({ success: false, error: "AI failed" });
    }
});

app.listen(8000, () => {
  console.log("Server running on port 5000");
});