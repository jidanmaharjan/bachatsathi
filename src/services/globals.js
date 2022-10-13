import { createSlice } from '@reduxjs/toolkit'

export const globalVar = createSlice({
    name: 'globals',
    initialState:{
        side: true,
        search: ''
    },
    reducers:{
        sideToggle: (state) =>{
            state.side = !state.side;
        },
        searchTerm: (state, action)=>{
            state.search = action.payload
        }
    }
})

export const {sideToggle, searchTerm} = globalVar.actions;

export default globalVar.reducer;