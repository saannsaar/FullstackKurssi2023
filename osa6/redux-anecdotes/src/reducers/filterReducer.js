import { createSlice } from '@reduxjs/toolkit'
const initialState = ''


const filterReducer = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        changeFilter(state, action) {
           return action.payload
        }
    }
   
})

export const  { changeFilter } = filterReducer.actions


export default filterReducer.reducer