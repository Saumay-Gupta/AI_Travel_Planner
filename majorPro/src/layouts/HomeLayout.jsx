import React from 'react'
import {Outlet} from 'react-router-dom'
import NavBar from '../components/NavBar'
import SignIn_LogIn from './SignIn_LogIn'

const HomeLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Outlet />
    </div>
  )
}

export default HomeLayout
