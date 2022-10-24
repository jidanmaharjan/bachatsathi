import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeOverall, createNotification, currentMonth, getAllNotifications, getOverall, getUnverifiedSubmits } from "../services/bachatApi";
import { acceptUser, deleteUser, getAllUsers, getMembers, reset, resetPassword } from "../services/userApi";

//Icons import 
import { AiOutlineDelete } from 'react-icons/ai'
import { BiReset } from 'react-icons/bi'
import { FiUserPlus } from 'react-icons/fi'
import { getCookie } from "./getCookie";
import { useRef } from "react";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";

const Admintab = ({ tab }) => {
  const { unverifiedSubmits, thisMonth,overall, isLoading } = useSelector((state) => state.bachat);
  const { allUsers,profile,members, message, isError, isSuccess} = useSelector((state) => state.user)
  const totalSavings  = useRef()
  const totalFine = useRef()
  const totalWithdraw = useRef()
  const notiTitle = useRef()
  const notiDescription = useRef()
  const [submitted, setSubmitted] = useState([])
  const [unSubmitted, setUnSubmitted] = useState([])
  const dispatch = useDispatch();
  useEffect(() => {
    if (!unverifiedSubmits) {
      dispatch(getUnverifiedSubmits());
    }
    if (!members) {
        if (getCookie("token")) {
          dispatch(getMembers());
        }
      }
      if (!overall) {
        if (getCookie("token")) {
          dispatch(getOverall());
        }
      }
    if(!allUsers && profile && profile.user.role === 'superadmin') {
        dispatch(getAllUsers());
    }
  }, []);

  useEffect(()=>{
    if(members && thisMonth){
        setUnSubmitted(members.filter(each=> !(thisMonth.collected.find(x=>x.user === each.id))))
        setSubmitted(members.filter(each=> (thisMonth.collected.find(x=>(x.user === each.id && x.status === 'Verified') ))))
    }
  },[members, thisMonth])

  useEffect(()=>{
    const timer = setTimeout(() => {
      if(isError){
        if(message !== ''){
          toast.error(message)
          setTimeout(()=>dispatch(reset()), 500)
        }
      
    }
      if(isSuccess){
        if(message !== ''){
          toast.success(message)
          setTimeout(()=>dispatch(reset()),500)
        }
      
    }
    }, 500);
    return() =>clearTimeout(timer);
  
    
  },[isError, isSuccess])


  const submitHandler = (e) =>{
    e.preventDefault()
    const sav = totalSavings.current.value || overall.totalSavings
    const fin = totalFine.current.value || overall.totalFine
    const withd = totalWithdraw.current.value || overall.totalWithdraw
    
    if((totalSavings.current.value === '' && totalFine.current.value === '' && totalWithdraw.current.value === '')){
        toast.warn('All fields are Empty')
        return
    }
    const data = {
        totalSavings: sav,
        totalFine: fin,
        totalWithdraw: withd
    }
    dispatch(changeOverall(data))
    toast.success('Savings information changed successfully')
  }

  const notificationHandler = (e) =>{
    e.preventDefault()
    const notTitle = notiTitle.current.value
    const notDesc = notiDescription.current.value
    
    if(notTitle === '' || notDesc === '' ){
        toast.warn('Enter Title and Description')
        return
    }
    const data = {
        title: notTitle,
        content: notDesc
    }
    dispatch(createNotification(data))
    notiTitle.current.value = ''
    notiDescription.current.value= ''
    setTimeout(()=>dispatch(getAllNotifications()), 2000)
    
    toast.success('Notification created successfully')
  }

  const acceptNewUser = (id)=>{
    dispatch(acceptUser(id))
    setTimeout(()=>dispatch(getAllUsers()), 2000)
    
  }

  const resetUserPassword = (id)=>{
    dispatch(resetPassword(id))
    setTimeout(()=>dispatch(getAllUsers()), 2000)
  }

  const deleteNewUser = (id)=>{
    dispatch(deleteUser(id))
    setTimeout(()=>dispatch(getAllUsers()), 2000)
  }

  return (
    <div className="p-4 bg-gray-100 rounded-md mt-4 mb-16 sm:mb-0">
        <ToastContainer 
        position="bottom-right"
      />
      {tab === 1 && (
        <div className="">
          <table className="w-full rounded-md overflow-hidden ">
            <thead className="bg-blue-400 text-gray-100 font-semibold text-sm sm:text-md 2xl:text-lg">
              <tr className="">
                <th className="p-2 text-left hidden sm:block">S.No.</th>
                <th className="p-2 text-left">Name</th>
                <th className="p-2 text-left">Status</th>
                <th className="p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm sm:text-md 2xl:text-lg">
              {unverifiedSubmits &&
                unverifiedSubmits.map((unit, index) => (
                  <tr className="bg-gray-300 odd:bg-gray-200" key={index}>
                    <td className="p-2 hidden sm:block">
                      <p>{index + 1}</p>
                    </td>
                    <td className="p-2 capitalize">
                      <p>{unit.name}</p>
                    </td>
                    <td className="p-2">
                      <p className="p-1 border border-blue-400 w-fit text-blue-400">
                        {unit.status}
                      </p>
                    </td>
                    <td className="p-2 flex flex-wrap flex-col sm:flex-row gap-2">
                      <button className="bg-green-400 py-1 px-2 text-gray-100 rounded-md">
                        Verify
                      </button>
                      <button className="bg-red-400 py-1 px-2 text-gray-100 rounded-md">
                        Unverify
                      </button>
                    </td>
                  </tr>
                ))}
                {unSubmitted && unSubmitted.length > 0 &&
                unSubmitted.map((unit, index) => (
                  <tr className="bg-gray-300 odd:bg-gray-200" key={index}>
                    <td className="p-2 hidden sm:block">
                      <p>{(unverifiedSubmits && unverifiedSubmits.length)+index + 1}</p>
                    </td>
                    <td className="p-2 capitalize">
                      <p>{unit.name}</p>
                    </td>
                    <td className="p-2">
                      <p className="p-1 border border-red-400 w-fit text-red-400">
                        Unsubmitted
                      </p>
                    </td>
                    <td className="p-2 flex flex-wrap flex-col sm:flex-row gap-2">
                      <button className="bg-green-400 py-1 px-2 text-gray-100 rounded-md">
                        Verify
                      </button>
                    </td>
                  </tr>
                ))}
                {submitted && submitted.length > 0 &&
                submitted.map((unit, index) => (
                  <tr className="bg-gray-300 odd:bg-gray-200" key={index}>
                    <td className="p-2 hidden sm:block">
                      <p>{(unverifiedSubmits && unverifiedSubmits.length)+(unSubmitted && unSubmitted.length)+index + 1}</p>
                    </td>
                    <td className="p-2 capitalize">
                      <p>{unit.name}</p>
                    </td>
                    <td className="p-2">
                      <p className="p-1 border border-green-400 w-fit text-green-400">
                        Submitted
                      </p>
                    </td>
                    <td className="p-2 flex flex-wrap flex-col sm:flex-row gap-2">
                      
                      <button className="bg-red-400 py-1 px-2 text-gray-100 rounded-md">
                        Unverify
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
      {tab === 2 && (
        <div>
          <form className="flex flex-col sm:w-fit" onSubmit={(e)=>submitHandler(e)}>
            <label
              htmlFor="totalsavings"
              className="mt-4 font-semibold text-gray-500"
            >
              Total Savings
            </label>
            <input
              type="number"
              id="totalsavings"
              ref={totalSavings}
              className="p-2 rounded-md border border-bg-gray-300 outline-none"
            />
            <label
              htmlFor="totalfine"
              className="mt-4 font-semibold text-gray-500"
            >
              Total Fine
            </label>
            <input
              type="number"
              id="totalfine"
              ref={totalFine}
              className="p-2 rounded-md border border-bg-gray-300 outline-none"
            />
            <label
              htmlFor="totalwithdraw"
              className="mt-4 font-semibold text-gray-500"
            >
              Total Withdraw
            </label>
            <input
              type="number"
              id="totalwithdraw"
              ref={totalWithdraw}
              className="p-2 rounded-md border border-bg-gray-300 outline-none"
            />
            <button disabled={isLoading         
            } className="p-2 bg-blue-400 text-gray-100 rounded-md mt-4 disabled:bg-blue-200">
              Submit
            </button>
          </form>
        </div>
      )}
      {tab === 3 && (
        <div>
          <h3 className="font-semibold text-gray-600">Create a Notification</h3>
          <form className="flex flex-col" onSubmit={(e)=>notificationHandler(e)}>
            <label
              htmlFor="notificationtitle"
              className="mt-4 font-semibold text-gray-500"
            >
              Title
            </label>
            <input
              type="text"
              id="notificationtitle"
              ref={notiTitle}
              className="p-2 rounded-md border border-bg-gray-300 outline-none"
            />
            <label
              htmlFor="notificationdescription"
              className="mt-4 font-semibold text-gray-500"
            >
              Description
            </label>
            <textarea
              type="text"
              id="notificationdescription"
              ref={notiDescription}
              className="p-2 rounded-md border border-bg-gray-300 outline-none h-40"
            />
            <button disabled={isLoading} type="submit" className="p-2 bg-blue-400 text-gray-100 rounded-md mt-4 sm:w-fit disabled:bg-blue-200">
              Create Notification
            </button>
          </form>
        </div>
      )}
      {tab === 4 && (
        <div className="">
          <table className="w-full rounded-md overflow-hidden ">
            <thead className="bg-blue-400 text-gray-100 font-semibold text-sm sm:text-md 2xl:text-lg">
              <tr className="">
                <th className="p-2 text-left hidden sm:block">S.No.</th>
                <th className="p-2 text-left">Info</th>
                <th className="p-2 text-left">Status</th>
                <th className="p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm sm:text-md 2xl:text-lg">
              {allUsers &&
                allUsers.map((unit, index) => (
                  <tr className="bg-gray-300 odd:bg-gray-200 " key={index}>
                    <td className="p-2 hidden sm:block">
                      <p>{index + 1}</p>
                    </td>
                    <td className="p-2">
                      <p className="capitalize">{unit.name}</p>
                      <p className="text-blue-400 overflow-hidden">{unit.email}</p>
                    </td>
                    <td className="p-2">
                        {unit.verified? (<p className="p-1 border border-green-400 w-fit text-green-400">
                        Verified
                      </p>): (<p className="p-1 border border-red-400 w-fit text-red-400">
                        Unverified
                      </p>)}
                      
                      
                    </td>
                    <td className="p-2 flex flex-wrap flex-col sm:flex-row gap-2 text-lg sm:text-xl w-fit">
                    {!unit.verified && (
                        <button className="bg-green-400 p-2 text-gray-100 rounded-md" onClick={()=>acceptNewUser(unit._id)}>
                        <FiUserPlus />
                      </button>
                      ) }
                      
                      <button className="bg-amber-400 p-2 text-gray-100 rounded-md" onClick={()=>resetUserPassword(unit._id)}>
                        <BiReset />
                      </button>
                      {!unit.verified && (
                        <button className="bg-red-400 p-2 text-gray-100 rounded-md" onClick={()=>deleteNewUser(unit._id)}>
                        <AiOutlineDelete />
                      </button>
                      ) }
                      
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Admintab;
