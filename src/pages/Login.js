import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import logolight from "../assets/logo-light.png";
import { getProfile, login, reset } from "../services/userApi";
import PuffLoader from 'react-spinners/PuffLoader';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getCookie } from "../components/getCookie";


const Login = () => {
  const emailRef = useRef()
  const passwordRef = useRef()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {user, isLoading, isError, isSuccess, message, profile,isAuthenticated } = useSelector(state=> state.user)

  useEffect(()=>{
   
    
    if( user ){
        navigate('/home')
    }
    
},[])


useEffect(()=>{
   
    if (!isLoading) {
      if(getCookie('token')){
        navigate('/home')
        
      }
    }
},[isAuthenticated])

useEffect(()=>{
  const timer = setTimeout(() => {
    if(isError){
    toast.error(message)
    dispatch(reset())
  }
  }, 500);
  return() =>clearTimeout(timer);

  
},[isError])

  const handleSubmit = (e) =>{
    e.preventDefault()
        const email = emailRef.current.value
        const password = passwordRef.current.value
        if(email === ''){
          toast.warn('Enter email address')
          return
        }
        if(password === ''){
          toast.warn('Enter Password')
          return
        }
        const userData= {
            email,
            password
        }
        dispatch(login(userData))
    
  }
  
  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-gray-200 p-4">
      <ToastContainer 
        position="bottom-right"
      />
      {isLoading ? (
        <div className="w-full min-h-screen flex justify-center items-center">
         <PuffLoader color="#60a5fa" />
      </div>
      ):(
        <div className="flex flex-col bg-gray-100 rounded-lg p-4 pb-8 w-full sm:w-[400px]">
        <img src={logolight} className="w-full mb-12 z-1 object-cover mix-blend-multiply " alt="" />
        <form className="flex flex-col" onSubmit={(e)=>handleSubmit(e)}>
          <label
            className="translate-y-3 translate-x-2 bg-gray-100 w-fit px-2 text-gray-700"
            htmlFor="email"
          >
            E-mail
          </label>
          <input
            className="border border-gray-300 p-2 outline-none mb-4 rounded-md bg-inherit"
            type="text"
            name=""
            id="email"
            ref={emailRef}
            required
          />
          <label
            className="translate-y-3 translate-x-2 bg-gray-100 w-fit px-2 text-gray-700"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="border border-gray-300 p-2 outline-none mb-4 rounded-md bg-inherit"
            type="password"
            name=""
            id="password"
            ref={passwordRef}
            required
          />
          <button type="submit" className="bg-blue-400 rounded-md p-2 mt-2 hover:bg-blue-500 text-gray-100" >
            Login
          </button>
        </form>

        <p className="mt-4 text-center text-gray-500">
          Not registered yet? <Link to='/register' className='hover:underline text-blue-400'>Click here to register</Link> 
        </p>
      </div>
      )}
      
    </div>
  );
};

export default Login;
