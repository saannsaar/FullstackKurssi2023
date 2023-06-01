import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'




const blogsReducer = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    like(state, action) {
      return state.map(b => b.id === action.payload.id ? action.payload : b)
    },

    appendBlogs(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
    remove(state, action) {
      console.log(state, action)
      return state.filter(b => b.id !== action.payload)
    }


  }
})

export const { like,  appendBlogs, setBlogs, remove } = blogsReducer.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = content => {
  console.log('REDUCERISSA')
  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch(appendBlogs(newBlog))
  }
}

export const likeOf = blog => {

  return async dispatch => {
    const liked = await blogService.update({ ...blog, likes: blog.likes +1 })
    dispatch(like(liked))
  }
}

export const removeBlog = blogId => {
  console.log(blogId)
  return async dispatch => {
    await blogService.remove(blogId)
    dispatch(remove(blogId))
  }
}
export default blogsReducer.reducer