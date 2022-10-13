import axios from "axios";

import { baseUrl } from "../components/Apiurl"

//Register User
const register = async(userData)=>{
    const response = await axios.post(baseUrl+'/register', userData,  {withCredentials: true})
    
    return response.data
}

//Login User
const login = async(userData)=>{
    const response = await axios.post(baseUrl+'/login', userData, {withCredentials: true})
    let date = new Date()
    date.setTime(date.getTime() + 14*24*60*60*1000)
    document.cookie= `token=${response.data.token};expires=`+ date.toUTCString()
    return response.data
}

//Logout user 
const logout = async() =>{
    const response = await axios.get(baseUrl+'/logout', {withCredentials: true})
    document.cookie= `token=;expires=`+new Date()
    return response.data

}

//Get profile
const getProfile = async() =>{
    const response = await axios.get(baseUrl+'/profile',{withCredentials: true})
    return response.data
}

const authService = {
    register,
    login,
    logout,
    getProfile
}

export default authService