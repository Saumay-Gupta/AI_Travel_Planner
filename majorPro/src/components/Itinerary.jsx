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
  const [loading, setLoading] = useState(true);
  const [itineraryStatus, setItineraryStatus] = useState(1);
  const navigate = useNavigate();

  const [weather, setWeather] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    weatherForecast: [],
  });

  // ──── FETCH DATA ────
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const itinerary_id = localStorage.getItem('itinerary_id');

        const url = itinerary_id
          ? `http://localhost:5000/createItinerary/${itinerary_id}`
          : 'http://localhost:5000/createItinerary';

        const res = await axios.get(url, { withCredentials: true });
        setWeather(res.data.weatherData);
        setItineraryText(res.data.itinerary);
      } catch (error) {
        console.log("Frontend Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    localStorage.removeItem('itinerary_id');
  }, []);

  // ──── PROCESS DATA ────
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
    <div className="min-h-screen bg-[#f6f6f8]">
      {/* ──── FULL SCREEN LOADER ──── */}
      {loading && (
        <div className="fixed inset-0 z-60 flex flex-col items-center justify-center bg-white">
          <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-6" />
          <p className="text-slate-900 text-xl font-semibold">
            Crafting your personalized itinerary…
          </p>
          <p className="text-slate-500 text-sm mt-2">This may take a moment</p>
        </div>
      )}

      {/* ──── HEADER ──── */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-header border-b border-primary/10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-primary p-1.5 rounded-lg text-white">
              <span className="material-symbols-outlined text-xl">travel_explore</span>
            </div>
            <button
              onClick={() => navigate('/')}
              className="text-lg font-extrabold tracking-tighter text-slate-900 uppercase"
            >
              TRAVELOGIQ
            </button>
          </div>
          <button
            onClick={() => navigate('/dashboard')}
            className="text-sm font-semibold text-slate-600 hover:text-primary transition-colors"
          >
            Dashboard
          </button>
        </div>
      </header>

      <main className="pt-20 pb-16">
        {/* ──── WEATHER HERO ──── */}
        <section className="relative overflow-hidden mb-8">
          <div className="absolute inset-0 -z-10">
            <img
              src="/weather1.jpeg"
              alt="weather background"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/30 via-slate-900/10 to-[#f6f6f8]" />
          </div>
          <div className="py-16">
            <Weather forecast={weather.weatherForecast} />
          </div>
        </section>

        {/* ──── TAB BAR ──── */}
        <div className="max-w-7xl mx-auto px-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex bg-white rounded-xl p-1 shadow-sm border border-slate-100">
              <button
                className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${
                  itineraryStatus
                    ? 'bg-primary text-white shadow-lg shadow-primary/25'
                    : 'text-slate-500 hover:text-primary'
                }`}
                onClick={() => setItineraryStatus(1)}
              >
                Itinerary
              </button>
              <button
                className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${
                  !itineraryStatus
                    ? 'bg-primary text-white shadow-lg shadow-primary/25'
                    : 'text-slate-500 hover:text-primary'
                }`}
                onClick={() => setItineraryStatus(0)}
              >
                Hotels
              </button>
            </div>

            {/* PDF Download */}
            <PDFDownloadLink
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white border border-slate-200 text-slate-700 text-sm font-bold hover:border-primary hover:text-primary shadow-sm transition-all"
              document={<ItineraryPDF planner={planner} />}
              fileName="itinerary.pdf"
            >
              {({ loading: pdfLoading }) =>
                pdfLoading ? (
                  'Preparing…'
                ) : (
                  <>
                    <span className="material-symbols-outlined text-lg">download</span>
                    Download PDF
                  </>
                )
              }
            </PDFDownloadLink>
          </div>
        </div>

        {/* ──── ITINERARY / HOTELS CONTENT ──── */}
        <div className="max-w-7xl mx-auto px-6">
          {itineraryStatus ? (
            <TravelPlan planner={planner} />
          ) : (
            <div className="bg-white rounded-xl p-10 border border-slate-100 shadow-sm text-center">
              <span className="material-symbols-outlined text-5xl text-slate-300 mb-4">hotel</span>
              <h2 className="text-2xl font-bold text-slate-900">Hotels</h2>
              <p className="text-slate-500 mt-2">Hotel recommendations coming soon</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Itinerary;
