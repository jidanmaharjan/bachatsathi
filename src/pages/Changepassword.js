import React from 'react'
import { useRef } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getCookie } from '../components/getCookie';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { changePassword, reset } from '../services/userApi';

const Changepassword = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {isLoading, isError, message, isSuccess} = useSelector((state) => state.user)
    const currentPassword = useRef()
    const newPassword = useRef()
    const confirmNewPassword = useRef()
    useEffect(()=>{
        if(!isLoading){
          if(!getCookie('token')){
            navigate('/')
            
          }
      }
    },[])

    useEffect(()=>{
      const timer = setTimeout(() => {
        if(isError){
        toast.error(message)
        dispatch(reset())
      }
        if(isSuccess){
        toast.success(message)
        dispatch(reset())
        currentPassword.current.value = ''
          newPassword.current.value = ''
          confirmNewPassword.current.value = ''
      }
      }, 500);
      return() =>clearTimeout(timer);
    
      
    },[isError, isSuccess])
    
    useEffect(()=>{
      dispatch(reset())
    },[])

    const handleSubmit = (e) =>{
        e.preventDefault()
        const oldPass = currentPassword.current.value
        const newPass = newPassword.current.value
        const confirmNew = confirmNewPassword.current.value
        if(oldPass === ''){
            toast.warn('Enter Old Password')
            return
        }
        if( newPass === ''){
            toast.warn('Enter New Password')
            return
        }
        if(confirmNew === ''){
            toast.warn('Enter New Password')
            return
        }
        if(newPass !== confirmNew){
            toast.warn('Passwords do not match')
            return
        }
        if(newPass.length < 6){
          toast.warn('Password must be at least 6 characters')
          return
        }
        const data = {
          oldPassword: oldPass,
          password: newPass
        }
        
        dispatch(changePassword(data))
        if(isSuccess){
          
          dispatch(reset())
        }
    }

  return (
    <div className=" p-4 mt-4 mb-16 sm:mb-0">
        <ToastContainer 
        position="bottom-right"
      />
      <h1 className="my-2 font-bold text-gray-600">CHANGE PASSWORD</h1>
      <div className='p-4 bg-gray-100 rounded-md w-full sm:w-80'>
        <form className='flex flex-col text-gray-500 font-semibold' onSubmit={(e)=>handleSubmit(e)}>
            <label htmlFor="currentpassword">Old Password</label>
            <input className='p-2 outline-none rounded-md mb-2' type="password" name="" id="currentpassword" ref={currentPassword} />
            <label htmlFor="newpassword">New Password</label>
            <input className='p-2 outline-none rounded-md mb-2' type="password" name="" id="newpassword" ref={newPassword} />
            <label htmlFor="confirmnewpassword">Confirm New Password</label>
            <input className='p-2 outline-none rounded-md mb-2' type="password" name="" id="confirmnewpassword" ref={confirmNewPassword} />
            <button disabled={isLoading} type="submit" className='bg-blue-400 hover:bg-blue-500 disabled:bg-blue-200 mt-2 text-gray-100 p-2 rounded-md'>Change Password</button>
        </form>
      </div>
    </div>
  )
}

export default Changepassword