import React from 'react'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { getProfile } from '../services/userApi';


import { GoPrimitiveDot } from "react-icons/go";
import { useState } from 'react';

const Notifications = () => {
    const [toggle, setToggle] = useState(false)
    const dispatch = useDispatch();
  const {
    profile,
    user,
    isLoading,
    isError,
    isSuccess,
    message,
    isAuthenticated,
  } = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(getProfile());
    }
    const timer = setTimeout(() => {
      if (!isLoading) {
        if (!isAuthenticated) {
          navigate("/");
        }
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [isAuthenticated]);

  

  const expandNoti = (id) =>{
    
    let notiitem = document.getElementById('noti-'+id)
    if(!toggle){
        notiitem.classList.remove("h-0");
    notiitem.classList.add("h-auto");
    
    }
    if(toggle){
        notiitem.classList.remove("h-auto");
        notiitem.classList.add("h-0");
    
    }
    setToggle(!toggle)
  }

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className=" p-4 mt-4">
      <h1 className="my-2 font-bold text-gray-600">NOTIFICATIONS</h1>
      <div className='p-4 rounded-md bg-gray-100'>
        <div>
            <div>
                <div className="flex items-center p-2  hover:bg-gray-200 cursor-pointer rounded-md" onClick={()=>expandNoti(1)}><GoPrimitiveDot className="text-blue-400" /><div className="w-full ml-2 "><p className="">Meeting at 5PM</p><p className="text-xs 2xl:text-sm text-gray-500">5 mins ago</p> </div></div> 
                <div id='noti-1' className={`h-0 overflow-hidden my-2 pl-8 text-gray-700`}>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eligendi impedit quisquam minus sed possimus a odio. Dolorum tempora quae asperiores voluptate nostrum, cupiditate in magnam earum impedit sint velit commodi architecto ipsam sunt aspernatur debitis labore nemo minima deserunt dolores iusto. Sapiente reprehenderit rerum alias necessitatibus accusantium nobis reiciendis obcaecati sequi. Velit ipsa earum voluptas quibusdam quas cum quam molestias!
                </div><div className="h-[1px] bg-gray-200 w-full mb-2"></div>
            </div>
        <div>
            <div className="flex items-center p-2 my-2 hover:bg-gray-300 cursor-pointer rounded-md" onClick={()=>expandNoti(2)}><GoPrimitiveDot className="text-blue-400" /><div className="w-full ml-2 "><p className="">September Deposited</p><p className="text-xs 2xl:text-sm text-gray-500">10 days ago</p> </div></div>
            <div id='noti-2' className={`h-0 overflow-hidden my-2 pl-8 text-gray-700 transition-all linear duration-300`}>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eligendi impedit quisquam minus sed possimus a odio. Dolorum tempora quae asperiores voluptate nostrum, cupiditate in magnam earum impedit sint velit commodi architecto ipsam sunt aspernatur debitis labore nemo minima deserunt dolores iusto. Sapiente reprehenderit rerum alias necessitatibus accusantium nobis reiciendis obcaecati sequi. Velit ipsa earum voluptas quibusdam quas cum quam molestias!
                </div><div className="h-[1px] bg-gray-200 w-full mb-2"></div>
        </div>
         
        </div>
      </div>
      
    </div>
  )
}

export default Notifications