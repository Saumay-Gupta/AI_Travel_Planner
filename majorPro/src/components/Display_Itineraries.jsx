import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Display_Itineraries() {


    const navigate = useNavigate();
    const [itineraries, setItineraries] = useState([]);
    const [message, setMessage] = useState('');

    useEffect( () => {
        axios.get('http://localhost:5000/getUserItineraries', {withCredentials: true})
        .then(res => {
            console.log(res.data);
            setItineraries(res.data);
            if(res.data.length == 0)setMessage("Generate Your First Itinerary with us..!!")
        })
        .catch(err => {
            console.log("Error in Display_Itineraries at frontend")
        })
    },[])


    const handleDeleteItinerary = async (id) =>{
        try {
            const res = await axios.delete(`http://localhost:5000/delete_itinerary/${id}`, {withCredentials: true})
            setItineraries(prev =>{

                const updated = prev.filter(item => item._id !== id);

                if (updated.length === 0) {
                    setMessage("Generate Your First Itinerary with us..!!");
                }
                return updated;
            }
            );
        } catch (error) {
            console.log("Error in handleDeleteItinerary at frontend")
        }
    }
    const handleShowItinerary = async (id) =>{
        localStorage.setItem('itinerary_id', id);
        navigate('/itinerary');
    }
    return (    
        <div className="relative min-h-screen flex flex-col items-center pt-10 pb-20 overflow-y-auto">
            {itineraries.length !== 0 ? <div className="absolute inset-0 -z-10 overflow-hidden">
              <div className="absolute inset-0 bg-black/50"></div>
            </div> : <></>}
        <h1 className="text-2xl font-semibold mb-6 text-white">
            Previous Itineraries
        </h1>

        {itineraries.length === 0 ? (
            <p className='text-white text-4xl h-full w-full flex justify-center items-center'>{message}</p>
        ) : (
            <div className="px-10 grid gap-5 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {itineraries.map((item) => (
                <div
                key={item._id}
                className="bg-white h-90 rounded-xl shadow-md overflow-hidden
                            transform transition-all duration-300 ease-out
                            hover:-translate-y-0.5 hover:scale-[1.01]
                            hover:shadow-xl"
                >
                {/* Image */}
                <img
                    onClick={() => handleShowItinerary(item._id)}
                    src={`/card${item.image_number}.png`}
                    alt="Trip"
                    className="w-full h-48 object-cover"
                />

                {/* Content */}
                <div className="p-2 h-40 flex flex-col">
                    <h3 className="text-lg font-semibold text-gray-800">
                    <span className='text-2xl'>{item.destination}</span>
                    </h3>

                    <div className="mt-auto w-full flex items-end justify-between text-sm text-gray-600">
                        
                        <div className='flex w-60'>
                            <span className="font-medium text-xl">Trip Date:{" "}{new Date(item.startDate).toLocaleDateString()}</span>
                        </div>
                        <button title="Delete itinerary"
                            onClick={()=>{
                                handleDeleteItinerary(item._id)
                            }
                        }
                        className="
                                items-start
                                justify-start
                                text-xl rounded-2xl
                                text-gray-500
                                hover:text-red-600
                                hover:ring-2 hover:ring-red-300
                                hover:bg-white/60
                                backdrop-blur
                                transition-all duration-200
                                "
                                >🗑️
                        </button>
                    </div>
                </div>
                </div>
            ))}
            </div>
        )}
        </div>
    );    
}

export default Display_Itineraries
