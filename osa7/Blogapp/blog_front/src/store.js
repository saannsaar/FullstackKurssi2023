import { configureStore } from '@reduxjs/toolkit'

import notificationReducer from './reducers/NotiReducer'
import blogsReducer from './reducers/blogsReducer'
import usersReducer from './reducers/usersReducer'


const store = configureStore({
  reducer: {
    blogs: blogsReducer,
    notification: notificationReducer,
    users: usersReducer,
  }
})
console.log(store)

export default store