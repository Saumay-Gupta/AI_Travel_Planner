// import React, { useEffect } from 'react'
// import { Outlet } from 'react-router-dom'
// import { useNavigate , useLocation} from 'react-router-dom'
// import { useState } from 'react';
// import axios from 'axios';
// function ProfileLayout() {
//     const navigate = useNavigate();

//     useEffect(()=>{
//         axios.get("http://localhost:5000/session_check", {withCredentials: true})
//         .then(res => {
//             if(res.data.message !== 'Valid Token') navigate('/') 
//         })
//         .catch(err => {
//             console.log("Error in useEffect in ProfileLayout Page");
//         })
//     })

//     const location = useLocation();

//     const isItinerary = location.pathname === "/dashboard";
//     const isDetails = location.pathname.includes("/dashboard/details");

//     const handleLogout = async () => {
//         try {
//             const res = await axios.post('http://localhost:5000/logout', {}, {withCredentials: true});
//             if(res.data.message == 'Logged out'){
//                 console.log("Logged Out Successfully");
//                 navigate('/')
//             }
//         } catch (error) {
//             console.log("Error in handleLogout at frontend");
//         }
//     }
//   return (
//     <div className='absolute z-10'>
//         <img src="/dashboard1.png" alt="" />
//     <div className='flex w-full h-screen overflow-x-hidden'>
//         <div className='flex flex-col h-screen w-95'>
//             {/* <div className="absolute inset-0 -z-10 w-95 overflow-hidden">
//               <img
//               src="/dashboard1.jpg"
//               alt="homepage background"
//               className="h-screen object-cover"
//               /> */}
//             {/* </div> */}
//             <button onClick={(e) => navigate('/')} className='flex justify-center mt-10 font-medium text-3xl'>TRAVELOGIQ</button>
//             <div className='flex flex-col h-full items-center justify-center'>
//                 <button
//                 className={`text-black border-0 w-60 p-2 ${isItinerary ? 'bg-blue-300': 'bg-blue-100'} rounded-2xl ${isItinerary ? 'hover:bg-blue-300': 'hover:bg-blue-200'} duration-150`} 
//                 onClick={(e) => {
//                     navigate('/dashboard')
//                 }}>🧾 PREVIOUS ITINERARIES</button>
//                 <button 
//                 className={`text-black border-0 w-60 p-2 ${isDetails ? 'bg-blue-300': 'bg-blue-100'} rounded-2xl mt-5 ${isDetails ? 'hover:bg-blue-300': 'hover:bg-blue-200'} duration-150`} 
//                 onClick={(e) => {
//                     navigate('details')
//                 }}>✈️ CREATE NEW ITINERARY</button>

//             </div>
//             <div className="w-2/3 mx-auto my-1 h-px bg-gray-600"></div>
//             <button onClick={handleLogout} className='font-medium my-3 text-gray-600 hover:text-red-500 duration-200'>⏻ Logout</button>
//         </div>
//         <div className="flex-1">
//             <Outlet/>
//         </div>
//     </div>
//     </div>
//   )
// }

// export default ProfileLayout


import React, { useEffect } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'

function ProfileLayout() {
  const navigate = useNavigate()
  const location = useLocation()

  // ✅ Run session check ONLY ONCE
  useEffect(() => {
    axios
      .get("http://localhost:5000/session_check", { withCredentials: true })
      .then(res => {
        if (res.data.message !== 'Valid Token') {
          navigate('/')
        }
      })
      .catch(() => {
        console.log("Error in ProfileLayout session check")
        navigate('/')
      })
  }, [navigate])

  const isItinerary = location.pathname === "/dashboard"
  const isDetails = location.pathname === "/dashboard/details"

  const handleLogout = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/logout",
        {},
        { withCredentials: true }
      )

      if (res.data.message === "Logged out") {
        navigate('/')
      }
    } catch (error) {
      console.log("Logout error")
    }
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      
      {/* ✅ Background Image */}
      <img
        src="/dashboard1.png"
        alt="dashboard background"
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />

      {/* ✅ Layout */}
      <div className="flex min-h-screen w-full">

        {/* Sidebar */}
        <div className="flex w-100 flex-col backdrop-blur-xs border-r border-white/20">

          <button
            onClick={() => navigate('/')}
            className="mt-10 text-center text-3xl font-semibold text-white"
          >
            TRAVELOGIQ
          </button>

          <div className="flex flex-1 flex-col items-center justify-center gap-5">

            <button
              className={`w-64 rounded-2xl p-2 transition
              ${isItinerary ? 'bg-white' : 'backdrop-blur-lg border border-white text-white hover:bg-white/30 hover:backdrop-blur-xl hover:shadow-[0_0_20px_rgba(255,255,255,0.35)] hover:scale-[1.03] duration-200'}`}
              onClick={() => navigate('/dashboard')}
            >
              🧾 PREVIOUS ITINERARIES
            </button>

            <button
              className={`w-64 rounded-2xl p-2 transition
              ${isDetails ? 'bg-white' : 
                'backdrop-blur-lg border border-white text-white hover:bg-white/30 hover:backdrop-blur-xl hover:shadow-[0_0_20px_rgba(255,255,255,0.35)] hover:scale-[1.03] duration-200'
            }`}
              onClick={() => navigate('/dashboard/details')}
            >
              ✈️ CREATE NEW ITINERARY
            </button>


            </div>

            <div className='w-full flex items-center justify-center'>
                <div className='flex h-px bg-gray-400 w-2/3'></div>
            </div>


            <div className='flex items-center justify-center'>
                <button
                    onClick={handleLogout}
                    className="my-4  h-10 w-30 text-white border border-white rounded-xl hover:text-red-500 transition"
                    >
                    ⏻ Logout
                </button>
            </div>

        </div>

        {/* Content */}
        <div className="flex-1 ">
          <Outlet />
        </div>

      </div>
    </div>
  )
}

export default ProfileLayout

