import React from 'react'
import { Outlet } from 'react-router-dom'

function SignIn_LogIn() {
  return (
    // 1. Main Wrapper: h-screen/w-screen with overflow-hidden locks the viewport
    // flex items-center justify-center automatically centers the card
    <div className='relative h-screen w-screen overflow-hidden flex items-center justify-center'>
      
        {/* 2. Background Image Layer */}
        <div className="absolute inset-0 -z-10">
            <img
            src="signIN1.png"
            alt="homepage background"
            className="w-full h-full object-cover"
            />
            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* 3. The Card Container */}
        {/* Changed w-screen to a fixed max-width or percentage */}
        {/* Removed margins (mx/mt) because the parent flex handles centering */}
        <div className='flex w-[900px] h-[550px] shadow-2xl rounded-2xl'> 
            
            {/* Left Side: Welcome Text */}
            <div className='w-1/2 h-full backdrop-blur-md bg-white/10 border border-white/20 text-white flex flex-col items-center justify-center rounded-l-2xl border-r-0'>
                <h1 className='font-bold text-5xl mb-2'>Welcome</h1>
                <p className='font-light text-xl tracking-wider'>Start Your Journey Here</p>
            </div>

            {/* Right Side: Form (Outlet) */}
            <div className='w-1/2 h-full backdrop-blur-md bg-black/20 border border-white/20 text-white flex flex-col items-center justify-center rounded-r-2xl'>
                <Outlet/>
            </div>

        </div>
    </div>
  )
}

export default SignIn_LogIn