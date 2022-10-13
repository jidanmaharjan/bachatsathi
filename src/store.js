import { configureStore } from "@reduxjs/toolkit";
import { bachatApi } from './services/bachatApi'
import userApi  from './services/userApi'
import  globalVar  from "./services/globals";

export default configureStore({
    reducer:{
        globals: globalVar,
        user: userApi,
    }
})