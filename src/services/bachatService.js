import axios from "axios";
import { baseUrl } from "../components/Apiurl";

//get allmonth
const getAllMonth = async ()=> {
    const response = await axios.get(baseUrl+'/allmonths',{withCredentials: true})
    return response.data.data
}

const bachatService = {
    getAllMonth,
}

export default bachatService