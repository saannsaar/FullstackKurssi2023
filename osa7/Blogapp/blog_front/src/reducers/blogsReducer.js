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
    },
    commentB(state, action) {
      console.log(state, action)
      return state.map(blog => blog.id === action.payload.id ? action.payload : blog)
    }


  }
})

export const { like,  appendBlogs, setBlogs, remove, commentB } = blogsReducer.actions

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
  console.log(blog)
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

export const commentBlog = (blogid, comment) => {
  console.log(blogid)
  return async dispatch => {
    const commented = await blogService.comment(blogid, { comment: comment })
    dispatch(commentB(commented))
  }
}
export default blogsReducer.reducer