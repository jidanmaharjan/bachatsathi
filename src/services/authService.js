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

//Change Password
const changePassword = async(pass) =>{
    const response = await axios.put(baseUrl+'/password/update',pass,{withCredentials: true})
    if(response.data.token){
        return 'Password updated successfully'
    }
}

const getMembers = async() =>{
    const response = await axios.get(baseUrl+'/members',{withCredentials: true})
            return response.data
}

const getAllUsers = async() =>{
    const response = await axios.get(baseUrl+'/superadmin/users',{withCredentials: true})
            return response.data.users
}

const acceptUser = async(id) =>{
    const response = await axios.get(baseUrl+`/superadmin/user/accept/${id}`,{withCredentials: true})
        if(response.data.success){
            return 'User Accepted'
        }
}

const resetPassword = async(id) =>{
    const response = await axios.get(baseUrl+`/superadmin/user/reset/${id}`,{withCredentials: true})
        if(response.data.success){
            return 'User Password reset successfully'
        }
}

const deleteUser = async(id) =>{
    const response = await axios.delete(baseUrl+`/superadmin/user/${id}`,{withCredentials: true})
        if(response.data.success){
            return 'User Deleted Successfully'
        }
}

const authService = {
    register,
    login,
    logout,
    getProfile,
    changePassword,
    getMembers,
    getAllUsers,
    acceptUser,
    resetPassword,
    deleteUser,
}

export default authService