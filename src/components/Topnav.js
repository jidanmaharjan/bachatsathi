import React from "react";
import { FiSearch } from "react-icons/fi";
import { FaBars } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import { GoPrimitiveDot } from "react-icons/go";
import { RiArrowDropDownLine } from "react-icons/ri";
import { BiLogOut} from 'react-icons/bi'
import {CgProfile} from 'react-icons/cg'
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchTerm, sideToggle } from "../services/globals";
import { logout } from "../services/userApi";
import { Link } from "react-router-dom";

const Topnav = () => {
    const {search } = useSelector((state)=> state.globals)
    const dispatch = useDispatch()
    const { profile } = useSelector(state=> state.user)

    const [notification, setNotification] = useState(false)
    const [settings, setSettings] = useState(false)
  return (
    <div className="flex p-2 justify-between items-center w-full bg-gray-200 text-gray-600 2xl:text-lg">
      <FaBars className="ml-4 cursor-pointer text-blue-400 2xl:text-xl" onClick={()=>dispatch(sideToggle())} />
      <div className="flex w-30 items-center border border-blue-200 py-1 px-2 rounded-md">
        <input
          type="text"
          className="bg-inherit py-1 outline-none flex-grow w-80"
          placeholder="Search"
          value={search}
          onChange={(e)=>dispatch(searchTerm(e.target.value))}
        />
        <FiSearch className="text-blue-400 text-lg 2xl:text-2xl" />
      </div>

      <div className="flex items-center mr-8 ">
        <div className="mr-4 relative cursor-pointer" >
          <IoMdNotificationsOutline className="text-blue-400 text-xl 2xl:text-2xl" onClick={()=>{
            setNotification(!notification)
            setSettings(false)
        }} />
          <GoPrimitiveDot className="absolute text-red-500 top-[-2px] right-[-4px]" onClick={()=>{
            setNotification(!notification)
            setSettings(false)
        }} />
          <div className={`${notification ? '': 'hidden'} z-20 transition-all ease-in-out duration-500 absolute bg-gray-100 right-[-14px] top-[38px] p-2 w-80 rounded-md border-x border-b`}>
            <div className="absolute right-4 top-[-8px] border-b-8 border-l-transparent border-l-solid border-r-transparent border-r-solid border-r-8 border-l-8 border-gray-100"></div>
            <p className="text-gray-500 font-semibold">Notifications</p>
            <div className="h-[1px] bg-gray-200 w-full"></div>
            <ul>
                <li className=' '><div className="flex items-center p-2 my-2 hover:bg-gray-300 cursor-pointer rounded-md"><GoPrimitiveDot className="text-blue-400" /><div className="w-full ml-2 "><p className="">Meeting at 5PM</p><p className="text-xs 2xl:text-sm text-gray-500">5 mins ago</p> </div></div> <div className="h-[1px] bg-gray-200 w-full mb-2"></div></li>
                <li className=' '><div className="flex items-center p-2 my-2 hover:bg-gray-300 cursor-pointer rounded-md"><GoPrimitiveDot className="text-blue-400" /><div className="w-full ml-2 "><p className="">September Deposited</p><p className="text-xs 2xl:text-sm text-gray-500">10 days ago</p> </div></div> <div className="h-[1px] bg-gray-200 w-full mb-2"></div></li>
                
            </ul>
            <div className="text-sm flex justify-between"><button className="p-2 bg-blue-400 hover:bg-blue-500 text-white rounded-md">Mark all as read</button><button className="text-red-400 hover:underline p-2">Clear all</button></div>
          </div>
        </div>
        <div className="flex items-center cursor-pointer relative" >
          <p className="p-1 bg-blue-400 w-8 h-8 flex justify-center items-center font-bold text-white rounded-full mr-2" onClick={()=>{
            setSettings(!settings)
            setNotification(false)
        }}>
            {profile && profile.user.name.slice(0,1)[0].toUpperCase()}
          </p>
          <p className="" onClick={()=>{
            setSettings(!settings)
            setNotification(false)
        }}>
            Hello,<span className="font-semibold"> {profile && profile.user.name}</span>{" "}
          </p>
          <RiArrowDropDownLine size={20} onClick={()=>{
            setSettings(!settings)
            setNotification(false)
        }} />
          <div className={`${settings? '': 'hidden'} z-20 absolute bg-gray-100 right-0 top-[44px] p-2 w-40 rounded-md border-x border-b`} >
            <div className="absolute right-4 top-[-8px] border-b-8 border-l-transparent border-l-solid border-r-transparent border-r-solid border-r-8 border-l-8 border-gray-100"></div>
            <p className="text-gray-500 font-semibold">Settings</p>
            <div className="h-[1px] bg-gray-200 w-full mb-2"></div>
            <div>
                <Link to='/profile' className='flex items-center gap-2 py-2 px-2 hover:bg-gray-300 cursor-pointer rounded-md' onClick={()=>{
            setSettings(!settings)
            setNotification(false)
        }}><CgProfile/> Profile</Link>
                <Link to='/' className='flex items-center gap-2 py-2 px-2 hover:bg-gray-300 cursor-pointer rounded-md' onClick={()=>dispatch(logout())}><BiLogOut/> Logout</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topnav;
