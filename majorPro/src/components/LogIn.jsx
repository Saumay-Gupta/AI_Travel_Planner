import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';


function LogIn() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [message, setMessage] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (e)=> {
        e.preventDefault();
        // handle logic here 
        // useNavigate Hook to navigate the user to the dashboard


        if(email.length == 0) return setMessage("Enter Email Please");
        if(password.length < 5) return setMessage("Enter Password Please");
        
        
        axios.post('http://localhost:5000/login', {email, password}, {withCredentials: true})
        .then(res => {
            console.log(res.data);
            if(res.data.message == 'User not registered'){
                setMessage("You don't have an account, Redirect to SignUP Page");
                setTimeout(()=>{navigate('/signIn')}, 2000)
            }
            if(res.data.message == 'Invalid credentials'){
                setMessage("Invalid Credentials");
            }
            if(res.data.message == 'Successfully LoggedIn'){
                setMessage("Successfully LoggedIn, Redirect to Dashboard Page");
                setTimeout(()=>{navigate('/dashboard')}, 2000)
            }
        })
        .catch(err =>{
            setMessage('Error at handleSubmit LogIn in Frontend');
        })
    }

  return (
    <>
        <div className='flex flex-col items-center justify-center'>
            <h1 className='text-2xl'>LogIn</h1>
            <form onSubmit={handleSubmit} className='flex flex-col items-center'>
                <input type="text" placeholder='Enter Email'
                value={email}
                onChange={(e)=> setEmail(e.target.value)} 
                className='backdrop-blur-xs w-80 p-1 rounded my-2'/>

                <input type="password" placeholder='Enter Password' 
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
                className='backdrop-blur-xs w-80 p-1 rounded my-2'/>

                <button onClick={()=> navigate('/signIn')} className='hover:text-blue-200 duration-200'>Don't have any account ?</button>

                <input type="submit" className='w-50 mt-7 font-normal bg-blue-600 p-1 rounded-2xl hover:bg-blue-700 duration-200'/>
                <p className={(message == "Successfully LoggedIn, Redirect to Dashboard Page"?'text-green-400':'text-red-500')}>{message}</p>
            </form>
        </div>
    </>
  )
}

export default LogIn
