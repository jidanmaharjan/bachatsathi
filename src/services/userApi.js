import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { baseUrl } from "../components/Apiurl"
import authService from "./authService"

//Get user from cookie

const initialState ={
    user: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    isAuthenticated: false,
    message: '',
    profile: null,
    members: null,
    allUsers: null,
}

//Register User
export const register = createAsyncThunk('user/register', async(user, thunkAPI)=>{
    try {
        return await authService.register(user)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//Logout User 
export const logout = createAsyncThunk('user/logout', async()=>{
    await authService.logout()
})

//Login User
export const login = createAsyncThunk('user/login', async(user, thunkAPI)=>{
    try {
        return await authService.login(user)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//Get profile
export const getProfile = createAsyncThunk('user/profile', async(thunkAPI) =>{
    try {
        return await authService.getProfile()
        
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//Get Members
export const getMembers = createAsyncThunk('user/members', async(thunkAPI)=>{
    try {
        return await authService.getMembers()
        
        
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//Get all users
export const getAllUsers = createAsyncThunk('user/allusers', async(thunkAPI)=>{
    try {
        return await authService.getAllUsers()
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const userApi = createSlice({
    name: 'user',
    initialState,
    reducers:{
        reset: (state) =>{
            state.isError = false
            state.isLoading = false
            state.isSuccess = false
            state.message = ''
        },
        
    },
    extraReducers:(builder) =>{
        builder
            .addCase(register.pending, (state)=>{
                state.isLoading = true

            })
            .addCase(register.fulfilled, (state, action)=>{
                state.isLoading = false
                state.isSuccess = true
                state.isAuthenticated = false
                state.message = action.payload.message
            })
            .addCase(register.rejected, (state, action)=>{
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
            .addCase(login.pending, (state)=>{
                state.isLoading = true

            })
            .addCase(login.fulfilled, (state, action)=>{
                state.isLoading = false
                state.isSuccess = true
                state.isAuthenticated = true
                state.user = action.payload
            })
            .addCase(login.rejected, (state, action)=>{
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
            .addCase(getProfile.pending, (state)=>{
                state.isLoading = true

            })
            .addCase(getProfile.fulfilled, (state, action)=>{
                state.isLoading = false
                state.isSuccess = true
                state.isAuthenticated = true
                state.profile = action.payload
            })
            .addCase(getProfile.rejected, (state, action)=>{
                state.isLoading = false
                state.isError = true
                state.isAuthenticated = false
                state.message = action.payload
            })
            
            .addCase(logout.pending, (state)=>{
                state.isLoading = true
            })
            .addCase(logout.fulfilled, (state, action)=>{
                state.isLoading = false
                state.isSuccess = true
                state.isAuthenticated = false
                state.message = action.payload
                state.user = null
                state.profile=null
            })
            .addCase(logout.rejected, (state, action)=>{
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getMembers.pending, (state)=>{
                state.isLoading = true

            })
            .addCase(getMembers.fulfilled, (state, action)=>{
                state.isLoading = false
                state.isSuccess = true
                state.members = action.payload.members
            })
            .addCase(getMembers.rejected, (state, action)=>{
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getAllUsers.pending, (state)=>{
                state.isLoading = true

            })
            .addCase(getAllUsers.fulfilled, (state, action)=>{
                state.isLoading = false
                state.isSuccess = true
                state.allUsers = action.payload
            })
            .addCase(getAllUsers.rejected, (state, action)=>{
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const { reset} = userApi.actions

export default userApi.reducer;