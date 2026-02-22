import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function NavBar() {
  const navigate = useNavigate();
  return (
    <div className='flex w-full h-10 mt-2'>
        <div className='flex w-35 h-10 items-center justify-center rounded-2xl ml-3 border-2 border-none bg-white/10 backdrop-blur-3xl'>
            <button onClick={(e)=> navigate('/')} className='text-white'>TRAVELOGIQ</button>
        </div>

        <div className='flex w-full mr-10 justify-end'>
            <Link to='/signIn' className='flex w-34 text-white h-10 items-center justify-center rounded-2xl ml-3 border-2 border-none bg-white/10 backdrop-blur-3xl hover:bg-white/20 duration-200'>LogIn/SignIn</Link>
        </div>
    </div>
  )
}

export default NavBar
