import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../components/getCookie";
import Loader from "../components/Loader";
import { BiWallet } from "react-icons/bi";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState } from "react";
import { getOverall } from "../services/bachatApi";

const Profile = () => {
  const dispatch = useDispatch();
  const [balanceToggle, setBalanceToggle] = useState(true)
  const {
    profile,
    user,
    isLoading,
    isError,
    isSuccess,
    message,
    isAuthenticated,
    members
  } = useSelector((state) => state.user);
  const{overall} = useSelector((state) => state.bachat)

  const navigate = useNavigate();

  useEffect(()=>{
    if(!isLoading){
      if(!getCookie('token')){
        navigate('/')
        
      }
  }
  if (!overall) {
    if (getCookie("token")) {
      dispatch(getOverall());
    }
  }
  },[])


  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className=" p-4 mt-4 mb-16 sm:mb-0">
      <h1 className="my-2 font-bold text-gray-600">PROFILE</h1>
      <div className="grid grid-cols-1  lg:grid-cols-3 gap-4 align-items-center ">
        <div className="grid  bg-gray-100 rounded-md p-4 mt-12 relative">
          <div className="absolute top-[-2.5rem] left-4 border-8 rounded-full border-gray-200">
            <p className="p-1 bg-blue-300 text-5xl w-20 h-20 flex justify-center items-center font-bold text-white rounded-full mx-auto">
              {profile && profile.user.name.slice(0, 1)[0].toUpperCase()}
            </p>
            
          </div>
          {profile && (
            <div className="mt-12 grid">
              <div className="">
                <h3 className="font-semibold text-blue-400 text-lg 2xl:text-xl ">
                  Full Name
                </h3>
                <p className="mb-2 text-gray-700 capitalize">{profile.user.name}</p>
                <h3 className="font-semibold text-blue-400 text-lg 2xl:text-xl ">
                  Email Address
                </h3>
                <p className="mb-2 text-gray-700">{profile.user.email}</p>
                <h3 className="font-semibold text-blue-400 text-lg 2xl:text-xl ">
                  Role
                </h3>
                <p className="mb-2 text-gray-700">{profile.user.role}</p>
                <h3 className="font-semibold text-blue-400 text-lg 2xl:text-xl ">
                  Status
                </h3>
                <p className="mb-2 text-gray-700">
                  {profile.user.verified && "Verified"}
                </p>
              </div>
              <button className="mt-4  bg-blue-400 text-gray-100 py-2 px-4 rounded-md">
              Edit Profile
            </button>
              <button className="mt-4 bg-blue-400 text-gray-100 py-2 px-4 rounded-md">
                Change Password
              </button>
            </div>
          )}
        </div>
        <div className="relative bg-gradient-to-r from-blue-400 to-teal-400 lg:col-span-2 lg:aspect-[19/8] lg:mt-12 rounded-md p-4 text-gray-100 uppercase">
           <div className="absolute bg-amber-400 py-2 px-4 rounded-r-md font-bold right-[-.5rem]">Active</div>
           <p className="mt-4">GROUP SAVINGS</p> 
           <div className="flex items-center "><BiWallet className="mr-2 text-xl" />{profile && profile.user._id}</div>
           <div className="flex items-center relative">{balanceToggle?(<p className="my-4 font-bold text-white">RS XXXX.XX</p>):(<p className="my-4 font-bold text-white">RS {overall && members && (overall.totalSavings/members.length).toFixed(2)}</p>)}<span className="text-xl ml-8 absolute left-32 cursor-pointer hover:text-amber-400" onClick={()=>setBalanceToggle(!balanceToggle)}>{balanceToggle?(<AiOutlineEye />):(<AiOutlineEyeInvisible  />)}</span></div>
           <p className="my-4">{profile && profile.user.name}</p>
           <div className="flex">
            <div className="mr-4">
              <p>Actual Balance</p>
              {balanceToggle?(<p>RS XXX.XX</p>):(<p>RS {overall && members && ((overall.totalSavings/members.length)*.88).toFixed(2)}</p>)}
            </div>
            <div>
              <p>Accured Interest</p>
              {balanceToggle?(<p>RS XXX.XX</p>):(<p>RS {overall && members && ((overall.totalSavings/members.length)*.12).toFixed(2)}</p>)}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;
