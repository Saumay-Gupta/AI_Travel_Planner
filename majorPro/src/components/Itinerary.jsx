import Weather from './Weather';
import TravelPlan from './TravelPlan';
import { useEffect, useState } from "react";
import convertItineraryToText from './convertItineraryToText';
import transformWeatherData from './transformWeatherData';
import { PDFDownloadLink } from "@react-pdf/renderer";
import ItineraryPDF from './ItineraryPDF';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Itinerary() {
  const [itineraryText, setItineraryText] = useState(""); 
  const [planner, setPlanner] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ Loader state

  const [itineraryStatus, setItineraryStatus] = useState(1);


  const navigate = useNavigate();
  
  const [weather, setWeather] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    weatherForecast: [],
  });

  // ---------------- FETCH DATA ----------------
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const itinerary_id = localStorage.getItem('itinerary_id');

        if(itinerary_id){
          const res = await axios.get(
            `http://localhost:5000/createItinerary/${itinerary_id}`,
            { withCredentials: true }
          );
  
          setWeather(res.data.weatherData);
          setItineraryText(res.data.itinerary);
        }
        else{
          const res = await axios.get(
            'http://localhost:5000/createItinerary',
            { withCredentials: true }
          );
  
          setWeather(res.data.weatherData);
          setItineraryText(res.data.itinerary);
        }

      } catch (error) {
        console.log("Frontend Error:", error);
      } finally {
        setLoading(false); // ✅ Hide loader when done
      }
    };

    fetchData();
    localStorage.removeItem('itinerary_id');
  }, []);

  // // ---------------- PROCESS DATA ----------------
  useEffect(() => {
    if (!itineraryText) return;

    const convertedPlanner = convertItineraryToText(itineraryText);
    setPlanner(convertedPlanner);

    if (weather) {
      const transformed = transformWeatherData(weather);

      setWeather({
        destination: weather.destination || "",
        startDate: weather.startDate || "",
        endDate: weather.endDate || "",
        weatherForecast: transformed || [],
      });
    }

  }, [itineraryText]);

  return (
    <>
      {/* ---------------- FULL SCREEN LOADER ---------------- */}
      {loading && (
        <div className="fixed inset-0 z-60 flex items-center justify-center 
                        bg-black/90 backdrop-blur-md">
          <div className="text-white text-2xl font-semibold animate-pulse">
            Loading your personalized itinerary...
          </div>
        </div>
      )}


      {/* ---------------- HEADER SECTION ---------------- */}
      <div className="fixed top-0 left-0 w-full z-50 
                      backdrop-blur-md bg-black/40 
                      border-b border-white/10">

        <div className="mx-4 flex items-center 
                        justify-between py-4">

          {/* Logo */}
          <button onClick={() => navigate('/')} className="text-white font-bold tracking-wide hover:text-gray-300 transition">
            TRAVELOGIQ
          </button>

          {/* Navigation Links */}
          <div className="flex items-center gap-8 text-white text-sm font-medium">
            <button onClick={()=> navigate('/dashboard')} className="hover:text-gray-300 transition">
              Profile
            </button>
          </div>
        </div>
      </div>




      {/* ---------------- WEATHER SECTION ---------------- */}
      <div className='h-1/2 w-full mt-20'>
        <div className="absolute inset-0 -z-10">
          <img
            src="weather1.jpeg"
            alt="homepage background"
            className="w-screen h-100 object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-30"></div>
        </div>

        <Weather forecast={weather.weatherForecast} />
      </div>


      {/* ---------------- SELECTION BAR ------------------ */}

      <div className='flex items-center justify-center gap-100 w-full h-20 backdrop-blur-xl bg-black/50'>
        <button 
          className={`text-white w-40 text-2xl font-medium p-2 rounded-full hover
            ${itineraryStatus ? 'bg-orange-500 hover:bg-orange-500' :'hover:bg-orange-400'}
            trasition duration-300
            `}
          onClick={() => setItineraryStatus(1)}
          >
          Itinerary
        </button> 
        <button 
          className={`text-white w-40 text-2xl font-medium p-2 rounded-full hover
            ${itineraryStatus ? 'hover:bg-orange-400' :'bg-orange-500 hover:bg-orange-500'}
            trasition duration-300
            `}
          onClick={() => setItineraryStatus(0)}
          >
          Hotels
        </button>
      </div>


      {/* ---------------- ITINERARY SECTION ---------------- */}
      { itineraryStatus ? 
        <div className='flex flex-col w-full backdrop-blur-xl bg-black/50'>
          <div className='relative w-full flex mt-2 items-center justify-center px-6'>
            
            <TravelPlan planner={planner} />
            
            
            <div className="absolute right-6 top-20">
              <PDFDownloadLink
                className="flex items-center justify-center w-24 h-10 hover:bg-white/40 
                          duration-200 rounded-2xl text-white border-2 bg-white/20 backdrop-blur-xs"
                document={<ItineraryPDF planner={planner} />}
                fileName="itinerary.pdf"
              >
                {({ loading }) => loading ? "Preparing..." : "⬇️ PDF"}
              </PDFDownloadLink>
            </div>
          </div>

        </div> : 
        <div className='flex flex-col w-full backdrop-blur-xl bg-black/50'>
          <div className='relative w-full flex mt-2 items-center justify-center px-6'>
            <h1 className='font-bold text-2xl text-white'>
              Hotels
            </h1>
          </div>

          <TravelPlan planner={planner} />
        </div>
      }

    </>
  );
}

export default Itinerary;
