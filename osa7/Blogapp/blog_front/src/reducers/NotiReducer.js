import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addNotification: (state, action) => {
      return action.payload
    },
    // eslint-disable-next-line no-unused-vars
    removeNotification: (state) => {
      return ''
    }
  }
})

export const { addNotification, removeNotification } = notificationSlice.actions

export const setNotification = (message) => {

  return async (dispatch) => {
    dispatch(addNotification(message))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 4000)
  }
}

export default notificationSlice.reducer