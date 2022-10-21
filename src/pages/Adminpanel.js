import React from 'react'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { getProfile } from "../services/userApi";

import { GoPrimitiveDot } from "react-icons/go";
import { useState } from "react";
import { getCookie } from "../components/getCookie";
import moment from "moment/moment";
import Admintab from '../components/Admintab';

const Adminpanel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const {
    profile,
    user,
    isLoading,
    isError,
    isSuccess,
    message,
    isAuthenticated,
  } = useSelector((state) => state.user);
  const [tab, setTab] = useState(1)
  const activeClass = 'border-x border-t border-gray-300  bg-gray-100'

  useEffect(()=>{
    if(!isLoading){
      if(!getCookie('token')){
        navigate('/')
        
      }
  }
  if(profile){
    setLoading(false)
    if(profile.user.role === 'user'){
      navigate('/home')
    }
  }
  if(!profile){
    setLoading(true)
  }
  },[profile])

  if (isLoading || loading) {
    return <Loader />;
  }

  return (
    <div className=" p-4 mt-4">
      <h1 className="my-2 font-bold text-gray-600">ADMIN PANEL</h1>
      <div className='flex flex-wrap'>
        <button onClick={()=>setTab(1)} className={`py-2 px-4 border-x border-t rounded-t-md border-gray-200 hover:border-blue-400 ${tab===1 && activeClass}`}>Monthly</button>
        <button onClick={()=>setTab(2)} className={`py-2 px-4 border-x border-t rounded-t-md border-gray-200 hover:border-blue-400 ${tab===2 && activeClass}`}>Overall</button>
        <button onClick={()=>setTab(3)} className={`py-2 px-4 border-x border-t rounded-t-md border-gray-200 hover:border-blue-400 ${tab===3 && activeClass}`}>Notification</button>
        {profile && profile.user.role === 'superadmin' && (<button onClick={()=>setTab(4)} className={`py-2 px-4 border-x border-t rounded-t-md border-gray-200 hover:border-blue-400 ${tab===4 && activeClass}`}>Users</button>
      )}
      </div>
      <div className='h-[2px] w-full bg-gray-100'></div>
      <div>
        <Admintab tab={tab} />
      </div>
    </div>
  )
}

export default Adminpanel