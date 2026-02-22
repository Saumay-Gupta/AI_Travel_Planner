import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import GooglePlacesAutocomplete from "react-google-places-autoComplete"

// import { Autocomplete } from "@react-google-maps/api";

function Details() {

  // const [autoComplete, setAutoComplete] = useState(null);

  const navigate = useNavigate();

  useEffect(()=>{
    axios.get("http://localhost:5000/session_check", {withCredentials: true})
    .then(res => {
      console.log(res.data)
      if(res.data.message == 'Invalid Token') navigate('/signIn');
    })
    .catch(err => {
      console.log("Error in Details page in Frontend");
    })
  },[])

  let [destination, setDestination] = useState(null);
  let [to, setTo] = useState("");
  let [from,setFrom] = useState("");


  let [budget, setBudget] = useState("");
  let [group, setGroup] = useState("");
  let [interest, setInterests] = useState([]);

  const [loading, setLoading] = useState(false);
  const [warning, setWarning] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();
    destination = destination?.label
    if(!destination || !to || !from || !budget || !group || !interest ){
      setWarning("Fill out all the details !!");
      
    }
    else if(to > from){
      setWarning("Enter Correct Order of Dates");
    }
    else{
      setLoading(true);
      const data = { destination, to, from, budget, group , interest};

      try {
        const res = await axios.post('http://localhost:5000/save_details', data, {withCredentials: true});

        if(res.data.message == "Details Saved"){
          console.log("Details Saved Successfully");
          navigate('/itinerary');
        }
        if(res.data.message == 'Invalid Token'){
          console.log("Session Expired");
          navigate('/signIn');
        }
      } catch (error) {
        console.log("Error in handleSubmit in Details page at frontend");
      } finally{
        setLoading(false);
      }

    };
  }
  

  const toggleInterest = (value) => {
    setInterests((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  return (
    <div className="relative h-screen overflow-hidden flex flex-col items-center justify-center pt-5">
      <div className="absolute inset-0 -z-10 h-screen overflow-hidden">
              {/* <img
              src="/dashboard4.png"
              alt="homepage background"
              className="h-screen w-screen object-cover"
              /> */}
              <div className="absolute inset-0 bg-black/50"></div>
      </div>
      <div className="h-full w-300">
        <h1 className="text-2xl font-medium text-white">Tell us your travel preferences !!</h1>
        <p className="pt-1  text-white">
          Just provide some basic information, and our trip planner will generate
          a customized itinerary based on your preferences.
        </p>

        <form onSubmit={handleSubmit}>
          <h1 className="font-medium pt-6 text-white">What is your destination of choice?</h1>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_MAPS_KEY}
            selectProps={{
              value: destination,
              onChange: (place) => {
                setDestination(place);
              },
              placeholder: 'Ex. Manali',

              styles: {
                control: (base) => ({
                  ...base,
                  backgroundColor: 'transparent',
                  boxShadow: 'none',
                }),

                input: (base) => ({
                  ...base,
                  color: '#ffffff',
                }),

                singleValue: (base) => ({
                  ...base,
                  color: '#ffffff',
                }),

                placeholder: (base) => ({
                  ...base,
                  color: '#d1d5db', // gray-300
                }),

                menu: (base) => ({
                  ...base,
                  backgroundColor: '#111827', // gray-900
                  color: '#ffffff',
                  zIndex: 50,
                }),
                option: (base, state) => ({
                  ...base,
                  backgroundColor: state.isFocused
                    ? '#1f2933' // gray-800
                    : '#111827',
                  color: '#ffffff',
                  cursor: 'pointer',
                }),
              },
            }}
          />


          {/* <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Ex. Manali"
            className="border border-white w-full pl-2 rounded text-white bg-transparent"
          /> */}

          <h1 className="font-medium pt-6 text-white">When you are planning?</h1>
          <div className="flex">
            <div className="flex flex-col">
              <span className="mt-1 mb-1 text-white">Start Date</span>
              <input
                type="date"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="border border-white w-50 pl-2 rounded text-white"
              />
            </div>
            <div className="flex flex-col">
              <span className="mt-1 mb-1 mx-8 text-white">End Date</span>
              <input
                type="date"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="border border-white w-50 pl-2 rounded mx-8 text-white"
              />
            </div>
          </div>

          <h1 className="font-medium pt-6 text-white">What is your budget?</h1>
          <div className="flex flex-row mt-1">
            <div
              className={`border p-5 mt-3 mb-3 rounded cursor-pointer ${
                budget === "cheap" ? "border-amber-400" : "border-gray-300"
              }`}
              onClick={() => setBudget("cheap")}
            >
              <p className="font-medium text-white">Cheap</p>
              <p className="text-white">Stay conscious of costs</p>
            </div>
            <div
              className={`border p-5 mx-4 mt-3 mb-3 rounded cursor-pointer ${
                budget === "moderate" ? "border-amber-400" : "border-gray-300"
              }`}
              onClick={() => setBudget("moderate")}
            >
              <p className="font-medium text-white">Medium</p>
              <p className="text-white">Keep cost on the average side</p>
            </div>
            <div
              className={`border p-5 mt-3 mb-3 rounded cursor-pointer ${
                budget === "luxury" ? "border-amber-400" : "border-gray-300"
              }`}
              onClick={() => setBudget("luxury")}
            >
              <p className="font-medium text-white">Luxury</p>
              <p className="text-white">Don't worry about cost</p>
            </div>
          </div>

          <h1 className="font-medium pt-1 text-white">
            Who do you plan on travelling with?
          </h1>
          <div className="flex flex-row pt-1">
            <div
              className={`border p-5 mt-3 mb-3 rounded cursor-pointer ${
                group === "justMe" ? "border-amber-400" : "border-gray-300"
              }`}
              onClick={() => setGroup("justMe")}
            >
              <p className="font-medium text-white">Just Me</p>
            </div>
            <div
              className={`border p-5 mt-3 mb-3 mx-4 rounded cursor-pointer ${
                group === "couple" ? "border-amber-400" : "border-gray-300"
              }`}
              onClick={() => setGroup("couple")}
            >
              <p className="font-medium text-white">Couple</p>
            </div>
            <div
              className={`border p-5 mt-3 mb-3 rounded cursor-pointer ${
                group === "family" ? "border-amber-400" : "border-gray-300"
              }`}
              onClick={() => setGroup("family")}
            >
              <p className="font-medium text-white">Family</p>
            </div>
            <div
              className={`border p-5 mt-3 mb-3 mx-4 rounded cursor-pointer ${
                group === "friends" ? "border-amber-400" : "border-gray-300"
              }`}
              onClick={() => setGroup("friends")}
            >
              <p className="font-medium text-white">Friends</p>
            </div>
          </div>
          
          <h1 className="font-medium pt-1 text-white">Choose Your Interests</h1>
          <div className="flex flex-row pt-1 flex-wrap text-white">
            {[
              "Beaches",
              "City Sightseeing",
              "Outdoor Adventures",
              "Festivals/Events",
              "Nightlife",
              "Shopping",
            ].map((item) => (
              <div
                key={item}
                className={`border p-5 mt-3 mb-3 mx-2 rounded cursor-pointer ${
                  interest.includes(item)
                    ? "border-amber-400"
                    : "border-gray-300"
                }`}
                onClick={() => toggleInterest(item)}
              >
                <p className="font-medium">{item}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center justify-center">

            <p className="text-red-500 font-normal">{warning}</p>

            <button
              type="submit"
              disabled={loading}
              className={`text-white text-medium w-40 mt-5 p-2 border rounded-2xl
                ${loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gray-700 hover:bg-gray-950 hover:shadow-2xl duration-200"
                }`}
            >
              {loading ? "Generating..." : "Submit Details"}
            </button>

          </div>
        </form>
      </div>
    </div>
  );
}

export default Details;
