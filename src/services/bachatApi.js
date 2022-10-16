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
}

//Get cuurent month


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
    }
})

export const {reset} = bachatApi.actions
export default bachatApi.reducer
