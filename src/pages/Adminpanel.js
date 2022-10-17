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
    </div>
  )
}

export default Adminpanel