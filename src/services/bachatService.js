import axios from "axios";
import { baseUrl } from "../components/Apiurl";

//get all notifications
const getAllNotifications = async ()=> {
    const response = await axios.get(baseUrl+'/allnotifications',{withCredentials: true})
    return response.data.notifications.reverse()
}

//get all notifications
const seeAllNotifications = async ()=> {
    const response = await axios.get(baseUrl+'/seeallnotifications',{withCredentials: true})
    return response.data.message
}

//get allmonth
const getAllMonth = async ()=> {
    const response = await axios.get(baseUrl+'/allmonths',{withCredentials: true})
    return response.data.data
}

//get thisMonth
const currentMonth = async ()=> {
    const response = await axios.get(baseUrl+'/create',{withCredentials: true})
    return response.data.bachat
}

const bachatService = {
    getAllMonth,
    currentMonth,
    getAllNotifications,
    seeAllNotifications,
}

export default bachatService