//Primary imports
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

//Pages import 
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Members from "./pages/Members";
import Adminpanel from "./pages/Adminpanel";
import History from "./pages/History";
import Notifications from "./pages/Notifications";

//Componenet imports
import Sidenav from "./components/Sidenav";
import Topnav from "./components/Topnav";
import { getCookie } from "./components/getCookie";
import Botnav from "./components/Botnav";
import Loader from './components/Loader';

//state imports
import { getProfile, reset } from "./services/userApi";
import { notificationToggle, settingToggle, sideToggle } from "./services/globals";
import { currentMonth, getAllNotifications } from './services/bachatApi';
import Changepassword from './pages/Changepassword';


function App() {
  const {pathname} = useLocation();
  const {side, notification, setting } = useSelector((state)=>state.globals)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {user, isLoading, isError, isSuccess, message, profile, isAuthenticated } = useSelector((state)=> state.user)
  const {thisMonth, isLoading:bachatLoading, isError:bachatError, isSuccess:bachatSuccess, message:bachatMessage, notifications  } = useSelector((state)=> state.bachat)
  const [screenSize, setScreenSize] = useState(0)

  useEffect(()=>{
    if(!profile){
      if(getCookie('token')){
      dispatch(getProfile())
    }
    }
    if(!thisMonth){
      if(getCookie('token')){
      dispatch(currentMonth())
    }
    }
    if(!notifications){
      if(getCookie('token')){
      dispatch(getAllNotifications())
    }
    }
  },[isAuthenticated,notifications])

  useEffect(()=>{
    if(!getCookie('token')){
      if(pathname !== '/register'){
        navigate('/')
      }
      
    }
  },[profile,isAuthenticated])

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
  
  

  return (
    <div className="text-black min-h-screen w-full">
      <div className=" flex min-h-screen w-full bg-gray-200 2xl:text-lg">
      {!(pathname === '/' || pathname === '/register') && (<Sidenav />) }
      <div className={`${side && !(pathname === '/' || pathname === '/register') && 'ml-72 2xl:ml-80'} transition-all duration-300 ease-in-out w-full`}>
      {!(pathname === '/' || pathname === '/register') && (<Topnav />) }  
      {!(pathname === '/' || pathname === '/register') && (<Botnav />) }
      <div onClick={()=>{
        notification === true && dispatch(notificationToggle(false))
        setting === true && dispatch(settingToggle(false))
        
        
      }}>
      <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/home' element={<Home />} />
      <Route path='/adminpanel' element={<Adminpanel />} />
      <Route path='/members' element={<Members />} />
      <Route path='/notifications' element={<Notifications />} />
      <Route path='/history' element={<History />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/password/change' element={<Changepassword />} />
     </Routes>
      </div>
    
     </div>
    </div>
    </div>
  );
}

export default App;
