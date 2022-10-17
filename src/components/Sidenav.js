import React from 'react'
import logolight from '../assets/logo-light.png'
import {AiOutlineHome, AiOutlineDashboard} from 'react-icons/ai'
import {BiNotification, BiHistory, BiLogOut} from 'react-icons/bi'
import {CgProfile} from 'react-icons/cg'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../services/userApi'
import { Link, NavLink } from 'react-router-dom'
import { FiUsers } from 'react-icons/fi'

const Sidenav = () => {
  const { side, search } = useSelector((state)=> state.globals)
  const {profile} = useSelector((state)=> state.user)
  const dispatch = useDispatch()
  const activeLink ='flex items-center gap-2 my-2 py-2 px-2  cursor-pointer rounded-md bg-blue-400 text-white transition-all duration-300 linear'
  const inactiveLink ='flex items-center gap-2 my-2 py-2 px-2 hover:bg-gray-300 cursor-pointer rounded-md transition-all duration-300 linear'
  return (
    <div className={`fixed hidden sm:inline ${!side && 'translate-x-[-18rem] 2xl:translate-x-[-20rem]'} transition-transform duration-300 ease-in-out  z-50 w-72 2xl:w-80 min-h-screen p-2 bg-gray-100 mr-2 2xl:text-lg`}>
        <div className='w-40  mix-blend-multiply'><img src={logolight} alt="" /></div>
        <div className='mt-4 '>
            <p className='text-gray-600'>NAVIGATION</p>
            <div className='py-2 text-gray-800 '>
                <NavLink to='/home' className={({isActive})=>isActive?activeLink:inactiveLink}><AiOutlineHome  size={20} />Home</NavLink>
                {profile && profile.user.role !== 'user' && (
                  <NavLink to='/adminpanel' className={({isActive})=>isActive?activeLink:inactiveLink}><AiOutlineDashboard size={20}/>Admin Panel</NavLink>
                )}
                
                <NavLink to='/notifications' className={({isActive})=>isActive?activeLink:inactiveLink}><BiNotification size={20}/>Notifications</NavLink>
                <NavLink to='/members' className={({isActive})=>isActive?activeLink:inactiveLink}><FiUsers size={20}/>Members</NavLink>
                <NavLink to='/history' className={({isActive})=>isActive?activeLink:inactiveLink}><BiHistory size={20}/>History</NavLink>
                <NavLink to='/profile' className={({isActive})=>isActive?activeLink:inactiveLink}><CgProfile size={20}/>Profile</NavLink>
                <NavLink to='/' className='flex items-center gap-2 my-2 py-2 px-2 w-full hover:bg-gray-300 cursor-pointer rounded-md' onClick={()=>dispatch(logout())}><BiLogOut size={20}/>Logout</NavLink>
            </div>
        </div>
    </div>
  )
}

export default Sidenav