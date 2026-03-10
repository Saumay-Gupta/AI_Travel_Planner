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

  useEffect(() => {
    axios
      .get("http://localhost:5000/session_check", { withCredentials: true })
      .then(res => {
        if (res.data.message !== 'Valid Token') navigate('/')
      })
      .catch(() => navigate('/'))
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
      if (res.data.message === "Logged out") navigate('/')
    } catch (error) {
      console.log("Logout error")
    }
  }

  return (
    <div className="flex min-h-screen bg-[#f6f6f8]">
      {/* ══════════ SIDEBAR ══════════ */}
      <aside className="hidden md:flex w-72 flex-col border-r border-slate-200 bg-white">
        {/* Logo */}
        <div className="flex items-center gap-2 px-6 h-20 border-b border-slate-100">
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

        {/* Nav links */}
        <nav className="flex-1 flex flex-col gap-2 p-4">
          <button
            onClick={() => navigate('/dashboard')}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all ${
              isItinerary
                ? 'bg-primary text-white shadow-lg shadow-primary/25'
                : 'text-slate-600 hover:bg-slate-50 hover:text-primary'
            }`}
          >
            <span className="material-symbols-outlined text-xl">history</span>
            Previous Itineraries
          </button>

          <button
            onClick={() => navigate('/dashboard/details')}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all ${
              isDetails
                ? 'bg-primary text-white shadow-lg shadow-primary/25'
                : 'text-slate-600 hover:bg-slate-50 hover:text-primary'
            }`}
          >
            <span className="material-symbols-outlined text-xl">add_circle</span>
            Create New Itinerary
          </button>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-slate-100">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-semibold text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all"
          >
            <span className="material-symbols-outlined text-xl">logout</span>
            Logout
          </button>
        </div>
      </aside>

      {/* ══════════ MOBILE TOP BAR ══════════ */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 glass-header border-b border-slate-200 h-16 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="bg-primary p-1 rounded-lg text-white">
            <span className="material-symbols-outlined text-lg">travel_explore</span>
          </div>
          <span className="text-base font-extrabold tracking-tighter text-slate-900 uppercase">TRAVELOGIQ</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/dashboard')}
            className={`p-2 rounded-lg ${isItinerary ? 'text-primary' : 'text-slate-500'}`}
          >
            <span className="material-symbols-outlined">history</span>
          </button>
          <button
            onClick={() => navigate('/dashboard/details')}
            className={`p-2 rounded-lg ${isDetails ? 'text-primary' : 'text-slate-500'}`}
          >
            <span className="material-symbols-outlined">add_circle</span>
          </button>
          <button onClick={handleLogout} className="p-2 rounded-lg text-slate-500 hover:text-red-600">
            <span className="material-symbols-outlined">logout</span>
          </button>
        </div>
      </div>

      {/* ══════════ MAIN CONTENT ══════════ */}
      <main className="flex-1 md:pt-0 pt-16 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  )
}

export default ProfileLayout

