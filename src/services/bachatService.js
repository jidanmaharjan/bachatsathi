import axios from "axios";
import { baseUrl } from "../components/Apiurl";

//Create a new Notification
const createNotification = async (data)=> {
    const response = await axios.post(baseUrl+'/notification/create',data,{withCredentials: true})
    return response.message
}

//get all notifications
const getAllNotifications = async ()=> {
    const response = await axios.get(baseUrl+'/allnotifications',{withCredentials: true})
    return response.data.notifications.reverse()
}

//See all notifications
const seeAllNotifications = async ()=> {
    const response = await axios.get(baseUrl+'/seeallnotifications',{withCredentials: true})
    return response.data.message
}

//get allmonth
const getAllMonth = async ()=> {
    const response = await axios.get(baseUrl+'/allmonths',{withCredentials: true})
    return response.data.data
}

//get overall
const getOverall = async ()=> {
    const response = await axios.get(baseUrl+'/getoverall',{withCredentials: true})
    return response.data.overall
}
//change overall
const changeOverall = async (data)=> {
    const response = await axios.put(baseUrl+'/changeoverall',data,{withCredentials: true})
    return response.data.overall
}

//get thisMonth
const currentMonth = async ()=> {
    const response = await axios.get(baseUrl+'/create',{withCredentials: true})
    return response.data.bachat
}

//Submit this month
const submitCurrent = async ()=> {
    const response = await axios.get(baseUrl+'/submitcurrentmonth',{withCredentials: true})
    return response.data.message
}

//get thisMonth
const getUnverifiedSubmits = async ()=> {
    const response = await axios.get(baseUrl+'/getunverifiedusers',{withCredentials: true})
    return response.data.data
}

const bachatService = {
    getAllMonth,
    getOverall,
    changeOverall,
    currentMonth,
    submitCurrent,
    getUnverifiedSubmits,
    createNotification,
    getAllNotifications,
    seeAllNotifications,
}

export default bachatService