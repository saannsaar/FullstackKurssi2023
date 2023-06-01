import { configureStore } from '@reduxjs/toolkit'

import notificationReducer from './reducers/NotiReducer'
import blogsReducer from './reducers/blogsReducer'


const store = configureStore({
  reducer: {
    blogs: blogsReducer,
    notification: notificationReducer,
  }
})
console.log(store)

export default store