import React, { useEffect } from 'react'
import NavBar from './NavBar'
import { useNavigate } from 'react-router-dom'
import Details from './Details'
import axios from 'axios'
import { useState } from 'react'
import { FaUserAlt } from "react-icons/fa";
import { FiLogIn } from "react-icons/fi";


function Home() {

  const navigate = useNavigate()
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(0); 
  const [homeText, setHomeText] = useState('');

  useEffect(()=>{
    axios.get('http://localhost:5000/session_check' , {withCredentials: true})
    .then(res =>{
      if(res.data.message == 'Valid Token'){
        setHomeText("Generate Your Trip");
        setIsUserLoggedIn(1);
      }
      else {
        setHomeText("Generate Your 1st Trip");
        setIsUserLoggedIn(0);
      }
    })
    .catch(err => {
      console.log("Error in useEffect in Home page at frontend");
    })
  })



  const handleSubmit = (e) => {
    e.preventDefault()

    if(isUserLoggedIn){
      navigate('/dashboard/details');
    }
    else navigate('/signIn');
  }

  return (
    <div className="relative h-full">
      
      {/* Navbar */}
      {/* <NavBar /> */}
      <div className='flex w-full h-10 mt-2'>
        <div className='flex w-35 h-10 items-center justify-center rounded-2xl ml-3 border-2 border-none bg-white/10 backdrop-blur-3xl'>
            <button onClick={(e)=> navigate('/')} className='text-white'>TRAVELOGIQ</button>
        </div>
        <div className='flex w-full mr-10 justify-end'>
            { isUserLoggedIn ? <button onClick={(e) => navigate('/dashboard')} className='flex w-34 text-white h-10 items-center justify-center rounded-2xl ml-3 border-2 border-none bg-white/10 backdrop-blur-3xl hover:bg-white/20 duration-200'>
              <FaUserAlt size={20} className="text-gray-400 mr-3" />
              Profile
            </button>
             :<button onClick={(e) => navigate('/signIn')} className='flex w-34 text-white h-10 items-center justify-center rounded-2xl ml-3 border-2 border-none bg-white/10 backdrop-blur-3xl hover:bg-white/20 duration-200'>
              <FiLogIn  size={20} className='mr-3'/>
              SignUP</button>}
        </div>
      </div>

      {/* Background Image */}
      <div className="absolute h-screen inset-0 -z-10">
        <img
          src="homeBG4.png"
          alt="homepage background"
          className="w-screen h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-20"></div>
      </div>

      {/* Home Content */}
      <div className="relative mt-50 z-10 flex flex-col items-center justify-center h-full text-white text-3xl font-bold p-4">
        <h1 className='text-6xl mb-4'>Plan Your Perfect Trip</h1>
        <p className='text-xl font-normal'>Explore new destinations and create your ultimate itinerary.</p>
        <div className='flex mt-2 w-100 h-18 items-center justify-center rounded-2xl ml-3 border-2 border-none bg-white/10 backdrop-blur-xs hover:bg-white/20 duration-200 '>
          <button onClick={handleSubmit} className='text-white'>{homeText}</button>
        </div>
      </div>

    </div>
  )
}

export default Home
