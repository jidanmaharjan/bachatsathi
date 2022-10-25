import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import {AiOutlineHome, AiOutlineDashboard} from 'react-icons/ai'
import { BiHistory} from 'react-icons/bi'
import { CgProfile} from 'react-icons/cg'
import { FiUsers } from 'react-icons/fi'
import { GoPrimitiveDot } from 'react-icons/go'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

const Botnav = () => {
  const {profile} = useSelector((state)=> state.user)

    const activeLink ='flex items-center gap-2 text-xl py-2 px-2  cursor-pointer rounded-md bg-blue-400 text-white transition-all duration-300 linear'
    const inactiveLink ='flex items-center gap-2 text-xl py-2 px-2 hover:bg-gray-300 cursor-pointer rounded-md transition-all duration-300 linear'

    const { notifications } = useSelector((state) => state.bachat);
    const [selectedNotifications, setSelectedNotifications] = useState([])

    useEffect(()=>{
      if(notifications && profile){
        setSelectedNotifications(notifications.filter(unit=>!unit.seen.find(one=>one._id === (profile && profile.user._id))))
      }
    },[notifications,profile])

    return (
      <div className={`fixed sm:hidden bottom-0 border-t rounded-tl-lg rounded-tr-lg border-gray-300  z-50 w-full px-4 p-3 bg-gray-100  2xl:text-lg`}>
              <div className=' text-gray-800 flex justify-between'>
                  <NavLink to='/home' className={({isActive})=>isActive?activeLink:inactiveLink}><AiOutlineHome   /></NavLink>
                  {profile && profile.user.role !== 'user' && (
                  <NavLink to='/adminpanel' className={({isActive})=>isActive?activeLink:inactiveLink}><AiOutlineDashboard /></NavLink>
                )}
                  
                  <NavLink to='/notifications' className={({isActive})=>isActive?activeLink:inactiveLink}>
          <IoMdNotificationsOutline />
          </NavLink>
                  <NavLink to='/members' className={({isActive})=>isActive?activeLink:inactiveLink}><FiUsers /></NavLink>
                  <NavLink to='/history' className={({isActive})=>isActive?activeLink:inactiveLink}><BiHistory /></NavLink>
                  <NavLink to='/profile' className={({isActive})=>isActive?activeLink:inactiveLink}><CgProfile /></NavLink>
              </div>
      </div>
    )
}

export default Botnav