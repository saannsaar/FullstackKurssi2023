import { createSlice } from "@reduxjs/toolkit";

const initialState =  null

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        addNotification: (state, action) => {
            return action.payload
        },
        removeNotification: (state) => {
            return null
        }
    }
})

export const { addNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer

export const selectNotification = state => state.notification

export const setNotification = (content, time) => {
    return async (dispatch) => {
        dispatch(addNotification(content))
        setTimeout(() => {
            dispatch(removeNotification())
        }, time * 1000)
    }
}