import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import CreateBlog from './components/CreateBlog'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Tobblable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const [notiType, setNotiType] = useState(null)
 

 const blogFormRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      blogService.getAll().then(blogs =>
        setBlogs( blogs )
      )  
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
      setNotiType("create")
      setNotification("Logged in succesfully!")
      setTimeout(() => {
        setNotification(null)
    }, 4000)

    } catch(exception) {
      setNotiType("error")
      setNotification("Wrong username or password")
      
      setTimeout(() => {
        setNotification(null)
      }, 4000)
    }
  }

  const createNewBlog = (newblogObject) => {
    
    
    blogFormRef.current.toggleVisibility()
    blogService.create(newblogObject).then(returnedBlog => {
        returnedBlog.user = user
        setBlogs(blogs.concat(returnedBlog))
        setNotiType("created")
        setNotification("You created a new blog!")
        setTimeout(() => {
            setNotification(null)
        }, 4000)
    }).catch(error => {
        setNotiType("error")
        setNotification(`Blog creation failed because of: " ${error}`)
        setTimeout(() => {
            setNotification(null)
        }, 4000)
    })
   
}

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
   
  }

  
    return (
      <div>
    <h1>Blogs app</h1>
      <Notification message={notification} type={notiType}/>
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
           <CreateBlog createBlog={createNewBlog}/>
           </Togglable>
        
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>

      }
       </div>
    
    )
  
 
   
}

export default App