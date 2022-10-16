import { configureStore } from "@reduxjs/toolkit";
import userApi  from './services/userApi'
import  globalVar  from "./services/globals";
import bachatApi from "./services/bachatApi";

export default configureStore({
    reducer:{
        globals: globalVar,
        user: userApi,
        bachat: bachatApi,
    }
})