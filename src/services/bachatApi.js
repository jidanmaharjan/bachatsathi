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
    overall: null,
    notifications: null,
    unverifiedSubmits: null,
}

//Get overall 
export const getOverall = createAsyncThunk('overall', async(thunkAPI)=>{
    try {
        return await bachatService.getOverall()
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//Change overall 
export const changeOverall = createAsyncThunk('overall/change', async(data, thunkAPI)=>{
    try {
        return await bachatService.changeOverall(data)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//Create a new notification
export const createNotification = createAsyncThunk('notifications/create', async(data,thunkAPI)=>{
    try {
        return await bachatService.createNotification(data)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})


//Get all notifications
export const getAllNotifications = createAsyncThunk('notifications/all', async(thunkAPI)=>{
    try {
        return await bachatService.getAllNotifications()
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//See all notifications
export const seeAllNotifications = createAsyncThunk('notifications/seeall', async(thunkAPI)=>{
    try {
        return await bachatService.seeAllNotifications()
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

//Get unverified submits 
export const getUnverifiedSubmits = createAsyncThunk('bachat/unverified', async(thunkAPI) =>{
    try {
        return await bachatService.getUnverifiedSubmits()
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
            .addCase(getOverall.pending,(state)=>{
                state.isLoading = true
            })
            .addCase(getOverall.fulfilled,(state,action)=>{
                state.isLoading = false
                state.isSuccess = true
                state.overall = action.payload
            })
            .addCase(getOverall.rejected, (state,action)=>{
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.overall = null
            })
            .addCase(changeOverall.pending,(state)=>{
                state.isLoading = true
            })
            .addCase(changeOverall.fulfilled,(state,action)=>{
                state.isLoading = false
                state.isSuccess = true
                state.overall = action.payload
            })
            .addCase(changeOverall.rejected, (state,action)=>{
                state.isLoading = false
                state.isError = true
                state.message = action.payload
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
            .addCase(getUnverifiedSubmits.pending,(state)=>{
                state.isLoading = true
            })
            .addCase(getUnverifiedSubmits.fulfilled,(state,action)=>{
                state.isLoading = false
                state.isSuccess = true
                state.unverifiedSubmits = action.payload
            })
            .addCase(getUnverifiedSubmits.rejected, (state,action)=>{
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.unverifiedSubmits = null
            })
            .addCase(createNotification.pending,(state)=>{
                state.isLoading = true
            })
            .addCase(createNotification.fulfilled,(state,action)=>{
                state.isLoading = false
                state.isSuccess = true
            })
            .addCase(createNotification.rejected, (state,action)=>{
                state.isLoading = false
                state.isError = true
                state.message = action.payload
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
            .addCase(seeAllNotifications.fulfilled,(state,action)=>{
                state.isSuccess = true
                state.notifications = null
            })
            .addCase(seeAllNotifications.rejected, (state,action)=>{
                state.isError = true
                state.message = action.payload
            })
    }
})

export const {reset} = bachatApi.actions
export default bachatApi.reducer
