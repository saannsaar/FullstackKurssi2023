import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import CreateBlogForm from './components/CreateBlog'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Tobblable'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/NotiReducer'
import { createBlog, initializeBlogs, removeBlog } from './reducers/blogsReducer'


const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  // const users = useSelector(state => state.users)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)



  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)

    }
  }, [])



  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      dispatch(setNotification({ noti: 'User logged in!', notiType: 'create' }))

    } catch(exception) {
      dispatch(setNotification({ noti: `Error: ${exception}`, notiType: 'error' }))

    }
  }


  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)

  }
  const updateBlog = async (changeBlog) => {
    console.log(changeBlog)
    const testi = { ...changeBlog, user: changeBlog.user.id }

    try {
      blogService.update(testi.id, testi)
      dispatch(setNotification({ noti: 'Logged out!', notiType: 'create' }))
    } catch(error) {
      dispatch(setNotification({ noti: `Blog creation failed because of: " ${error}`, notiType: 'error' }))
    }

  }

  const createNewBlog = (newblogObject) => {

    console.log('HALOO')
    blogFormRef.current.toggleVisibility()
    console.log(newblogObject)
    try {
      dispatch(createBlog(newblogObject))
      console.log(blogs)
      dispatch(setNotification({ noti: 'Created!', notiType: 'create' }))
    } catch (error) {
      dispatch(setNotification({ noti: `Blog creation failed because of: " ${error}`, notiType: 'error' }))

    }

  }

  const handleDelete = async (deletethisBlog) => {
    if (window.confirm(`Are you sure you want to remove ${deletethisBlog.title}?`)) {
      try {
        console.log(deletethisBlog)
        dispatch(removeBlog(deletethisBlog.id))
        dispatch(setNotification({ noti: 'Blog deleted!', notiType: 'create' }))
      } catch(error) {
        dispatch(setNotification({ noti: `You cant do that: ${error}`, notiType: 'error' }))
      }
    }
  }



  return (
    <div>
      <h1>Blogs app</h1>
      <Notification />
      {
        !user &&
        <Togglable buttonLabel="log in">
          <LoginForm username={username} password={password}  handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}/>
        </Togglable>

      }
      {
        user &&
        <div>
          <h1>Logged in as {user.username} <button onClick={handleLogout}>Log out</button></h1>
          <Togglable buttonLabel="create new blog" ref={blogFormRef}>
            <CreateBlogForm createNewBlog={createNewBlog}/>
          </Togglable>

          {blogs.slice().sort((a,b) => a.likes - b.likes).map(blog =>
            <Blog key={blog.id} blog={blog} updateBlog={updateBlog} deleteBlog={handleDelete} />
          )}
        </div>

      }
    </div>

  )



}

export default App