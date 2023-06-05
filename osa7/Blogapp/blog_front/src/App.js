import { useState, useEffect, useRef } from 'react'
import Users from './components/Users'
import Blog from './components/Blog'
import Blogs from './components/Blogs'
import blogService from './services/blogs'
import CreateBlogForm from './components/CreateBlog'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Tobblable'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/NotiReducer'
import { createBlog, initializeBlogs } from './reducers/blogsReducer'
import { initializeUsers } from './reducers/usersReducer'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import User from './components/User'
import { AppBar, Button, Container, Toolbar } from '@mui/material'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const users = useSelector(state => state.users)
  console.log(users)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)



  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
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



  return (
    <Container>
      <div>
        <Notification />
        {
          !user &&
        <Togglable buttonLabel="log in">
          <LoginForm username={username} password={password} handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin} />
        </Togglable>

        }
        {
          user &&
        <div>
          <Router>
            <h1>BLOG APP</h1>
            <AppBar position='static'>
              <Toolbar>
                <Button color="inherit" component={Link} to="/">home</Button>
                <Button color="inherit" component={Link} to="/users">users</Button>
                <em>{user.username} logged in</em>
                <Button variant='outlined' color='inherit' onClick={handleLogout}>logout</Button>
              </Toolbar>
            </AppBar>
            <Togglable buttonLabel="create new blog" ref={blogFormRef}>
              <CreateBlogForm createNewBlog={createNewBlog}/>
            </Togglable>

            <Routes>
              <Route path="/users" element={<Users users={users}/>}/>
              <Route path="/" element={<Blogs blogs={blogs} user={user}/>}/>
              <Route path="/blogs/:id" element={<Blog blogs={blogs}  />}/>
              <Route path="/users/:id" element={<User users={users}  />}/>
            </Routes>
          </Router>

        </div>

        }
      </div>
    </Container>

  )



}

export default App