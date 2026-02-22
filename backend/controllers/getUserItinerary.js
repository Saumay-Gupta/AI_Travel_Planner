import Itinerary from "../models/itinerary.js"; 
import OpenAI from "openai";
import {AzureOpenAI} from "openai"


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
        
        // const data = req.body;
        

        const client = new OpenAI({
            baseURL: process.env.AZURE_OPENAI_ENDPOINT,
            apiKey: process.env.AZURE_OPENAI_KEY,
        });


        const result = await client.chat.completions.create({
            messages: [
                {
                    role: "developer",
                    content: "You are a professional travel planner.",
                },
                {
                    role: "user",
                    content: `Create a travel itinerary based on these details and provide Day Wise Intinerary Like which place and which activity u can do it on Day1 - , Day2 - , and add time with each activity and add a dash "-" between time and activity, so that i can split data easily and remove all extra stuff like budget travel tips, basically just send only Day1 - , Day2 - , Day3 - ,: ${JSON.stringify(itinerary_details)}`,
                },
            ],
            model: process.env.AZURE_OPENAI_DEPLOYMENT,
        });

        const itinerary = result.choices[0].message.content;

        res.json({ success: true, itinerary , weatherData});
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}


export default getUserItinerary;