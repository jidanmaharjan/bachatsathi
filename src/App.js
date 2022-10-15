import Login from "./pages/Login";
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import Home from "./pages/Home";
import Sidenav from "./components/Sidenav";
import Topnav from "./components/Topnav";

import { useDispatch, useSelector } from "react-redux";
import Register from "./pages/Register";
import { useEffect } from "react";
import { getProfile, reset } from "./services/userApi";
import Profile from "./pages/Profile";
import PuffLoader from 'react-spinners/PuffLoader';
import Notifications from "./pages/Notifications";
import { getCookie } from "./components/getCookie";
import { notificationToggle, settingToggle, sideToggle } from "./services/globals";
import Botnav from "./components/Botnav";
import { useState } from "react";

function App() {
  const {pathname} = useLocation();
  const {side } = useSelector((state)=>state.globals)
const dispatch = useDispatch()
  const navigate = useNavigate()
  const {user, isLoading, isError, isSuccess, message, profile, isAuthenticated } = useSelector(state=> state.user)
  const [screenSize, setScreenSize] = useState(0)

  useEffect(()=>{
    if(!profile){
      if(getCookie('token')){
      dispatch(getProfile())
    }
    }
    
  },[isAuthenticated])


  useEffect(() =>{
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener('resize', handleResize);
    handleResize();
    return() => window.removeEventListener('resize', handleResize);
  },[])

  useEffect(()=>{
    if(screenSize <= 640){
      dispatch(sideToggle(false))
    }
    else{
      dispatch(sideToggle(true))
    }
  },[screenSize])
  
  if(isLoading){
    return (
      <div className="w-full min-h-screen flex justify-center items-center">
         <PuffLoader color="#60a5fa" />
      </div>
    )
   
  }

  return (
    <div className="text-black min-h-screen w-full">
      <div className=" flex min-h-screen w-full bg-gray-200 2xl:text-lg">
      {!(pathname === '/' || pathname === '/register') && (<Sidenav />) }
      <div className={`${side && !(pathname === '/' || pathname === '/register') && 'ml-72 2xl:ml-80'} transition-all duration-300 ease-in-out w-full`}>
      {!(pathname === '/' || pathname === '/register') && (<Topnav />) }  
      {!(pathname === '/' || pathname === '/register') && (<Botnav />) }
      <div onClick={()=>{
        dispatch(notificationToggle(false))
        dispatch(settingToggle(false))
      }}>
      <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/home' element={<Home />} />
      <Route path='/dashboard' element={<Home />} />
      <Route path='/notifications' element={<Notifications />} />
      <Route path='/history' element={<Home />} />
      <Route path='/profile' element={<Profile />} />
     </Routes>
      </div>
    
     </div>
    </div>
    </div>
  );
}

export default App;
