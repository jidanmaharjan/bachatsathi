import { createSlice } from '@reduxjs/toolkit'

export const globalVar = createSlice({
    name: 'globals',
    initialState:{
        side: true,
        search: '',
        notification: false,
        setting: false,
    },
    reducers:{
        sideToggle: (state,action) =>{
            state.side = action.payload
        },
        searchTerm: (state, action)=>{
            state.search = action.payload
        },
        notificationToggle: (state,action)=>{
            state.notification = action.payload
        },
        settingToggle: (state,action)=>{
            state.setting = action.payload
        }
    }
})

export const {sideToggle, searchTerm, notificationToggle, settingToggle} = globalVar.actions;

export default globalVar.reducer;