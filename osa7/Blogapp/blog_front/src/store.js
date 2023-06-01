import { configureStore } from '@reduxjs/toolkit'

import notificationReducer from './reducers/NotiReducer'

const store = configureStore({
  reducer: {
    notification: notificationReducer
  }
})
console.log(store)

export default store