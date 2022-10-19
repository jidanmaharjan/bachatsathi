import React from 'react'
import {AiOutlineHome, AiOutlineDashboard} from 'react-icons/ai'
import {BiNotification, BiHistory} from 'react-icons/bi'
import { FiUsers } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

const Botnav = () => {
  const {profile} = useSelector((state)=> state.user)

    const activeLink ='flex items-center gap-2 text-xl py-2 px-2  cursor-pointer rounded-md bg-blue-400 text-white transition-all duration-300 linear'
    const inactiveLink ='flex items-center gap-2 text-xl py-2 px-2 hover:bg-gray-300 cursor-pointer rounded-md transition-all duration-300 linear'
    return (
      <div className={`fixed sm:hidden bottom-0 border-t rounded-tl-lg rounded-tr-lg border-gray-300  z-50 w-full px-4 p-3 bg-gray-100  2xl:text-lg`}>
              <div className=' text-gray-800 flex justify-between'>
                  <NavLink to='/home' className={({isActive})=>isActive?activeLink:inactiveLink}><AiOutlineHome   /></NavLink>
                  {profile && profile.user.role !== 'user' && (
                  <NavLink to='/adminpanel' className={({isActive})=>isActive?activeLink:inactiveLink}><AiOutlineDashboard /></NavLink>
                )}
                  
                  <NavLink to='/notifications' className={({isActive})=>isActive?activeLink:inactiveLink}><BiNotification /></NavLink>
                  <NavLink to='/members' className={({isActive})=>isActive?activeLink:inactiveLink}><FiUsers /></NavLink>
                  <NavLink to='/history' className={({isActive})=>isActive?activeLink:inactiveLink}><BiHistory /></NavLink>
              </div>
      </div>
    )
}

export default Botnav