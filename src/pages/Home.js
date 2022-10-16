import React, { useState } from "react";
import { getProfile } from "../services/userApi";

import { FiUsers } from "react-icons/fi";
import { AiOutlineWarning } from "react-icons/ai";
import { FaCoins, FaBus } from "react-icons/fa";
import { GiReceiveMoney, GiPayMoney } from "react-icons/gi";
import { GoUnverified } from "react-icons/go";
import { BsCalendarCheck } from "react-icons/bs";
import { MdOutlineDone, MdOutlineCancel, MdErrorOutline } from "react-icons/md";


import graph from "../assets/graph.jpg";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

import { getCookie } from "../components/getCookie";

const Home = () => {
  const {user, isLoading, isError, isSuccess, message, profile,isAuthenticated } = useSelector(state=> state.user)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  let chartData = [
    { x: 2005, y: 28 },
    { x: 2006, y: 25 },
    { x: 2007, y: 26 },
    { x: 2008, y: 27 },
    { x: 2009, y: 32 },
    { x: 2010, y: 35 },
    { x: 2011, y: 30 },
  ];

  useEffect(()=>{
    if(!isLoading){
      if(!getCookie('token')){
        navigate('/')
        
      }
  }
  },[])

  if(isLoading || loading){
    return (
      <Loader />
    )
   
  }


  return (
    
      
      
        <div className=" p-4 mt-4 mb-16 sm:mb-0">
          <h1 className="my-2 font-bold text-gray-600">SUMMARY</h1>
          <div className="grid gap-4 grid-cols-2 md:grid-cols-3  lg:grid-cols-5">
            <div className="text-blue-400 bg-gray-100 p-4 col-span-2 md:col-span-1 rounded-md md:aspect-[4/3] ">
              <div className="p-4 rounded-full bg-blue-200 w-fit">
                <GiReceiveMoney className="text-lg 2xl:text-2xl" />
              </div>
              <h3 className="text-gray-800 font-bold mt-2">Rs. 17059</h3>
              <p className="text-gray-500">Total Savings</p>
            </div>
            <div className="text-blue-400 bg-gray-100 p-4 rounded-md md:aspect-[4/3] ">
              <div className="p-4 rounded-full bg-blue-200 w-fit">
                <FaCoins className="text-lg 2xl:text-2xl" />
              </div>
              <h3 className="text-gray-800 font-bold mt-2">Rs. 1147</h3>
              <p className="text-gray-500">Total Profit</p>
            </div>
            <div className="text-blue-400 bg-gray-100 p-4 rounded-md md:aspect-[4/3] ">
              <div className="p-4 rounded-full bg-blue-200 w-fit">
                <FiUsers className="text-lg 2xl:text-2xl" />
              </div>
              <h3 className="text-gray-800 font-bold mt-2">16</h3>
              <p className="text-gray-500">Members</p>
            </div>
            <div className="text-blue-400 bg-gray-100 p-4 rounded-md md:aspect-[4/3] ">
              <div className="p-4 rounded-full bg-blue-200 w-fit">
                <AiOutlineWarning className="text-lg 2xl:text-2xl" />
              </div>
              <h3 className="text-gray-800 font-bold mt-2">Rs. 750</h3>
              <p className="text-gray-500">Total Fine</p>
            </div>
            <div className="text-blue-400 bg-gray-100 p-4 rounded-md md:aspect-[4/3] ">
              <div className="p-4 rounded-full bg-blue-200 w-fit">
                <GiPayMoney className="text-lg 2xl:text-2xl" />
              </div>
              <h3 className="text-gray-800 font-bold mt-2">Rs. 0.0</h3>
              <p className="text-gray-500">Total Withdraw</p>
            </div>
          </div>
          <div className="mt-4">
            <h1 className="my-2 font-bold text-gray-600">THIS MONTH</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="text-blue-400 bg-gray-100 p-4 rounded-md ">
                <div className="flex ">
                  <div className="p-4 rounded-full bg-blue-200  grid place-items-center">
                    <BsCalendarCheck size={25} />
                  </div>
                  <div className="ml-8 font-semibold bg-blue-200 px-4 py-2 relative">
                    <div className="absolute left-[-8px] top-[50%] translate-y-[-50%] w-0 h-0 border-r-8 border-b-transparent border-b-solid border-t-transparent border-t-solid border-t-8 border-b-8 border-blue-200"></div>

                    <h3>October, 2022</h3>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 ">
                  <div className="border border-gray-200 rounded-md p-4">
                    <p className="text-gray-500 my-2 text-center">
                      Time Details
                    </p>
                    <h1 className="text-8xl 2xl:text-9xl text-red-400 text-center">3</h1>
                    <p className="text-red-400 text-center">Days Remaining</p>
                  </div>
                  <div className="p-4">
                    <p className="text-gray-500 mt-2 mb-4">Deposit Details</p>
                    <h3 className="text-green-500 font-bold flex items-center my-1 ">
                      <span className="w-40">7 Deposited</span>{" "}
                      <MdOutlineDone size={20} />
                    </h3>
                    <h3 className="text-blue-400 font-bold flex items-center  my-1">
                      <span className="w-40">5 Unverified</span>{" "}
                      <GoUnverified size={20} />
                    </h3>
                    <h3 className="text-yellow-500 font-bold flex items-center my-1 ">
                      <span className="w-40">4 Unsubmitted</span>{" "}
                      <MdOutlineCancel size={20} />{" "}
                    </h3>
                    <h3 className="text-red-400 font-bold flex items-center my-1 ">
                      <span className="w-40">0 Rejected</span>{" "}
                      <MdErrorOutline size={20} />{" "}
                    </h3>
                  </div>
                </div>
              </div>
              <div className="bg-gray-100 p-4 rounded-md  ">
                <img src={graph} alt="graph" className="mix-blend-multiply" />
              </div>
            </div>
          </div>
        </div>
      
  );
};

export default Home;
