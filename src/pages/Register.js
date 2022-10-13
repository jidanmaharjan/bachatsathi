import React from 'react'
import { useEffect } from 'react';
import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import logolight from "../assets/logo-light.png";
import { getProfile, register, reset } from '../services/userApi';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
    const userRef = useRef()
    const emailRef = useRef()
  const passwordRef = useRef()
  const cpasswordRef = useRef()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {user, isLoading, isError, isSuccess, message,profile, isAuthenticated } = useSelector(state=> state.user)
  
  
    useEffect(()=>{
     
      const timer = setTimeout(() => {
        if(isSuccess){
        toast.success(message)
        dispatch(reset())
      }
      }, 500);
      return() =>clearTimeout(timer);
    },[isSuccess])

    useEffect(()=>{
      if(!profile){
        if(getCookie('token')){
        dispatch(getProfile())
      }
      }
      
     
        if (!isLoading) {
          if (isAuthenticated) {
            navigate("/home");
          }
        }
    },[isAuthenticated])

    function getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    }

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
    const name = userRef.current.value
    const email = emailRef.current.value
    const password = passwordRef.current.value
    if(name === ''){
      toast.warn('Enter Full Name')
      return
    }
    if(email === ''){
      toast.warn('Enter email address')
      return
    }
    if(password === ''){
      toast.warn('Enter Password')
      return
    }
    if(passwordRef.current.value !== cpasswordRef.current.value){
        toast.warn('password does not match')
    }
    else{
        
        const userData= {
            name,
            email,
            password
        }
        dispatch(register(userData))
    }
    // dispatch(login({email: userRef.current.value, password: passwordRef.current.value}))
  }

  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-gray-200 p-4">
      <ToastContainer 
        position="bottom-right"
      />
      <div className="flex flex-col bg-gray-100 rounded-lg p-4 pb-8 w-full sm:w-[400px]">
        <h1 className='font-bold my-2 text-lg text-blue-400'>Register New User</h1>
        <div className="h-[1px] bg-gray-200 w-full"></div>
        <form className="flex flex-col">
          <label
            className="translate-y-3 translate-x-2 bg-gray-100 w-fit px-2 text-gray-700"
            htmlFor="name"
          >
            Full Name
          </label>
          <input
            className="border border-gray-300 p-2 outline-none mb-4 rounded-md bg-inherit"
            type="text"
            name=""
            id="name"
            ref={userRef}
          />
          <label
            className="translate-y-3 translate-x-2 bg-gray-100 w-fit px-2 text-gray-700"
            htmlFor="email"
          >
            E-mail
          </label>
          <input
            className="border border-gray-300 p-2 outline-none mb-4 rounded-md bg-inherit"
            type="email"
            name=""
            id="email"
            ref={emailRef}
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
            id=""
            ref={passwordRef}
          />
          <label
            className="translate-y-3 translate-x-2 bg-gray-100 w-fit px-2 text-gray-700"
            htmlFor="cpassword"
          >
            Confirm Password
          </label>
          <input
            className="border border-gray-300 p-2 outline-none mb-4 rounded-md bg-inherit"
            type="password"
            name=""
            id="cpassword"
            ref={cpasswordRef}
          />
          <button className="bg-blue-400 rounded-md p-2 mt-2 hover:bg-blue-500 text-gray-100" onClick={(e)=>handleSubmit(e)}>
            Register
          </button>
        </form>

        <p className="mt-4 text-center text-gray-500">
          Already registered?<Link to='/' className='hover:text-blue-400'> Click here to Login</Link> 
        </p>
      </div>
    </div>
  )
}

export default Register