import { Data } from "@syncfusion/ej2-react-grids";
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

//Verify submission 
const verifySubmission = async (id)=> {
    const response = await axios.get(baseUrl+`/verifysubmission?collectId=${id}`,{withCredentials: true})
    if(response.data.success === true){
        return 'Submission verified successfully'
    }
}

//Verify unsubmitted
const verifyUnsubmitted = async (data)=> {
    const response = await axios.post(baseUrl+'/verifyunsubmitted',data,{withCredentials: true})
    if(response.data.success === true){
        return 'Submission verified successfully'
    }
}

//unverify submission
const unverifySubmission = async (data)=> {
    console.log(data);
    const response = await axios.get(baseUrl+`/unverifysubmission/${data.monthId}/${data.collectId}`,{withCredentials: true})
    if(response.data.success === true){
        return 'Submission unverified successfully'
    }
}

const bachatService = {
    getAllMonth,
    getOverall,
    changeOverall,
    currentMonth,
    submitCurrent,
    getUnverifiedSubmits,
    verifySubmission,
    verifyUnsubmitted,
    unverifySubmission,
    createNotification,
    getAllNotifications,
    seeAllNotifications,
}

export default bachatService