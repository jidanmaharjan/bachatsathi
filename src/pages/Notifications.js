import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { getProfile } from "../services/userApi";

import { GoPrimitiveDot } from "react-icons/go";
import { useState } from "react";
import { getCookie } from "../components/getCookie";
import moment from "moment/moment";

const Notifications = () => {
  const [toggle, setToggle] = useState(false);
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
  const { notifications } = useSelector((state) => state.bachat);
  const navigate = useNavigate();

  useEffect(()=>{
    if(!isLoading){
      if(!getCookie('token')){
        navigate('/')
        
      }
  }
  },[])

  const expandNoti = (id) => {
    
    for(let i=0; i< (notifications && notifications.length);i++){
      let notiitem = document.getElementById("noti"+i);
      
        notiitem.classList.remove("h-auto");
      notiitem.classList.add("h-0");
    }
    let selected = document.getElementById("noti"+id)
    selected.classList.remove("h-0");
      selected.classList.add("h-auto");
    
  };

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className=" p-4 mt-4">
      <h1 className="my-2 font-bold text-gray-600">NOTIFICATIONS</h1>
      <div className="p-4 rounded-md bg-gray-100">
        <div>
          {notifications &&
            notifications.map((notification, index) => (
              <div key={notification._id}>
                <div
                  className="flex items-center p-2  hover:bg-gray-200 cursor-pointer rounded-md"
                  onClick={() => expandNoti(index)}
                >
                  <GoPrimitiveDot className={`${notification.seen.find(one=>one._id.toString() === (profile && profile.user._id))? 'text-gray-400':'text-blue-400'}` }/>
                  <div className="w-full ml-2 ">
                    <p className="">{notification.title}</p>
                    <p className="text-xs 2xl:text-sm text-gray-500">
                      {notification.date}
                    </p>
                  </div>
                </div>
                <div
                  id={'noti'+index}
                  className={`h-0 overflow-hidden my-2 pl-8 text-gray-700`}
                >{notification.content}
                </div>
                <div className="h-[1px] bg-gray-200 w-full mb-2 "></div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
