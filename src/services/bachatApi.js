import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../components/Apiurl";
import bachatService from "./bachatService";

const initialState ={
    allMonth: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
    thisMonth: null,
    notifications: null,
}

//Get all notifications
export const getAllNotifications = createAsyncThunk('notifications/all', async(thunkAPI)=>{
    try {
        return await bachatService.getAllNotifications()
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//Get curent month
export const currentMonth = createAsyncThunk('bachat/currentMonth', async(thunkAPI)=>{
    try {
        return await bachatService.currentMonth()
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//Get all months
export const getAllMonth = createAsyncThunk('bachat/allmonth', async(thunkAPI)=>{
    try {
        return await bachatService.getAllMonth()
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const bachatApi = createSlice({
    name: 'bachat',
    initialState,
    reducers:{
        reset: (state) =>{
            state.isError = false
            state.isLoading = false
            state.isSuccess = false
            state.message = ''
        }
    },
    extraReducers: (builder) =>{
        builder
            .addCase(getAllMonth.pending,(state)=>{
                state.isLoading = true
            })
            .addCase(getAllMonth.fulfilled,(state,action)=>{
                state.isLoading = false
                state.isSuccess = true
                state.allMonth = action.payload
            })
            .addCase(getAllMonth.rejected, (state,action)=>{
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.allMonth = null
            })
            .addCase(currentMonth.pending,(state)=>{
                state.isLoading = true
            })
            .addCase(currentMonth.fulfilled,(state,action)=>{
                state.isLoading = false
                state.isSuccess = true
                state.thisMonth = action.payload
            })
            .addCase(currentMonth.rejected, (state,action)=>{
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.thisMonth = null
            })
            .addCase(getAllNotifications.pending,(state)=>{
                state.isLoading = true
            })
            .addCase(getAllNotifications.fulfilled,(state,action)=>{
                state.isLoading = false
                state.isSuccess = true
                state.notifications = action.payload
            })
            .addCase(getAllNotifications.rejected, (state,action)=>{
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.notifications = null
            })
    }
})

export const {reset} = bachatApi.actions
export default bachatApi.reducer
