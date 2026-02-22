import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';

function SignIn() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');

    const [passwordCheck, setPasswordCheck] = useState('');

    const [message, setMessage] = useState('');

    useEffect(()=>{
        if(rePassword.length != 0){
            if(password !== rePassword) setPasswordCheck("Password not match");
            else setPasswordCheck("Password matched");
        }
    },[password, rePassword]);

    const navigate = useNavigate();
    const handleSubmit = (e)=> {
        e.preventDefault();
        // handle logic here 
        // useNavigate Hook to navigate the user to the dashboard

        if(name.length == 0) return setMessage("Enter Name Please");
        if(email.length == 0) return setMessage("Enter Email Please");
        if(password.length < 5) return setMessage("Enter min. 6 digits of password");
        
        if(password === rePassword){
            axios.post('http://localhost:5000/signUP', {name, email, password}, {withCredentials: true})
            .then(res => {
                if(res.data.message == 'User Created Successfully'){
                    setMessage("Just wait for few seconds");
                    setTimeout(()=>{navigate('/dashboard')}, 2000)
                }
                if(res.data.message == "User already exist"){
                    setMessage("You already have an account, Redirecting to Login Page");
                    setTimeout(()=>{navigate('/logIn')}, 2000)
                }
            })
            .catch(err =>{
                setMessage('Error at handleSubmit SignIn in Frontend');
            })
        }
    }
  return (
    <>
        <div className='flex flex-col items-center justify-center'>
            <h1 className='text-2xl'>SignUp</h1>
            <form onSubmit={handleSubmit} className='flex flex-col items-center '>
                <input type="text" placeholder='Enter Username' 
                value={name}
                onChange={(e)=> setName(e.target.value)}
                className='backdrop-blur-xs w-80 p-1 rounded my-2'
                />

                <input type="text" placeholder='Enter Email' 
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
                className='backdrop-blur-xs w-80 p-1 rounded my-2'/>

                <input type="password" placeholder='Enter min. 6 digits password'
                value={password}
                onChange={(e)=> setPassword(e.target.value)} 
                className='backdrop-blur-xs w-80 p-1 rounded my-2'/>

                <input type="password" placeholder='Re-Entered Password'
                value={rePassword}
                onChange={(e)=> setRePassword(e.target.value)}
                className='backdrop-blur-xs w-80 p-1 rounded my-2'/>

                <p className={passwordCheck === "Password matched"?"text-green-400": "text-red-500"}>{passwordCheck}</p>

                <button onClick={()=> navigate('/logIn')} className='hover:text-blue-200 duration-200'>Already have an account !</button>

                <input type="submit" className='w-50 mt-7 font-normal bg-blue-600 p-1 rounded-2xl hover:bg-blue-700 duration-200'/>
                <p className={message == "Just wait for few seconds"?'text-green-400':'text-red-500'}>{message}</p>
            </form>
        </div>
    </>
  )
}

export default SignIn
