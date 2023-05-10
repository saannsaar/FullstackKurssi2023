import { useEffect, useState, useRef } from 'react'
import Blog from './components/Blog'
import Blogform from './components/Blogform'
import blogService from './services/blog'
import LoginForm from './components/LoginForm'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
 
  const [blogs, setBlogs] = useState([])
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)


  // const [title, setTitle] = useState("")
  // const [author, setAuthor] = useState("")
  // const [url, setURL] = useState("")


  const blogFormRef = useRef()


    useEffect(() => {
  
    blogService.getAllBlogs().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
  if(loggedUserJSON){
    const user = JSON.parse(loggedUserJSON)
    setUser(user)
    blogService.setToken(user.token)
  }
  },[])

  const handleLogin = async (e) => {
    e.preventDefault()
    console.log('KIRJAUDUTAAN: ', username, password)

    try {
      const user = await loginService.login({
        username, password
      })

      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user)
      )

      console.log('user', user)

      setUser(user)
      setUserName('')
      setPassword('')
    }

    catch (exception ) {
      nofityUser('wrong username or password')
      console.log('exception: ', exception)
    }
  }

  const handleUsername = (e) => {
    console.log(e.target.value)
    setUserName(e.target.value)
  }

  const handlePassword = (e) => {
    console.log(e.target.value)
    setPassword(e.target.value)
  }

  const handleLogOut = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogUser')
  }

  const nofityUser = (message, type) => {
    setNotification(message, type)
    setTimeout(() => {
      setNotification(null)
    }, 6000)
  }

  const handleSubmitNewB = (blogObj) => {
    console.log('handle new blog submit button')
    nofityUser('A new blog was added! :)')

    console.log('blogObject:', blogObj)
    blogFormRef.current.toggleVisibility()
    blogService.create(blogObj)
    .then(returnedBlog => setBlogs(blogs.concat(returnedBlog)))
  }



  return (
    <div>
      <Notification notification={notification}/>
      {
        user === null ?
        <LoginForm handleLogin={handleLogin} handleUsername={handleUsername} handlePassword={handlePassword}/>
        :<div>
          {`${user.name} is logged in!`}

          {blogs.map(blog => 
            <Blog key={blog.id} blog={blog}/>
          )}
          <button onClick={handleLogOut}>Log out</button>

          <Togglable buttonLabel='Create new blog!' ref={blogFormRef}>
            <Blogform handleSubmitNewB={handleSubmitNewB}/>
          </Togglable>
          </div>
      }
    </div>
  )
}

export default App