import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import handleSignUP from "./controllers/handleSignUP.js";
import verifySession from "./middlewares/verifySession.js";
import handleLogin from "./controllers/handleLogin.js";
import connectDB from "./db_connection/connectDB.js";
import handleItineraryDetails from "./controllers/handleItineraryDetails.js";
import getUserItineraries from "./controllers/getUserItineraries.js";
import handleDeleteItinerary from "./controllers/handleDeleteItinerary.js";
import getUserItinerary from "./controllers/getUserItinerary.js";


dotenv.config();

connectDB();
const app = express();
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(cookieParser());



app.post('/signUP', handleSignUP);
app.post('/login', handleLogin);

app.get('/session_check', verifySession, (req, res)=>{
    return res.json({message: 'Valid Token'});
});

app.post('/save_details', verifySession, handleItineraryDetails);

app.get('/getUserItineraries', verifySession, getUserItineraries);

app.post('/logout', (req, res)=>{
    res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
    secure: false   
    });

  return res.status(200).json({ message: "Logged out" });
})

app.delete("/delete_itinerary/:id", verifySession, handleDeleteItinerary);


app.get("/createItinerary", verifySession , getUserItinerary);
app.get("/createItinerary/:id", verifySession , getUserItinerary);

app.listen(process.env.PORT, ()=>{
    console.log("Server Running Properly");
})
