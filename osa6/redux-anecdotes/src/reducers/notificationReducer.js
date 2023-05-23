import { createSlice } from "@reduxjs/toolkit";

const initialState =  ''

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        addNotification: (state, action) => {
            return action.payload
        },
        removeNotification: (state) => {
            return ''
        }
    }
})

export const { addNotification, removeNotification } = notificationSlice.actions

export const setNotification = (message, time) => {
    let seconds = time * 1000
    return async (dispatch) => {
        dispatch(addNotification(message))
        setTimeout(() => {
            dispatch(removeNotification())
        },seconds)
    }

}
export default notificationSlice.reducer
