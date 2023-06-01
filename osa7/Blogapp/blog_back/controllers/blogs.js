const blogsRouter = require('express').Router()


const Blog = require('../models/blog')
const {userExtractor } = require('../utils/middleware')




// Haetaan kaikki blogit
blogsRouter.get('/', async (request, response) => {
   const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
   console.log(blogs)
   response.json(blogs)
})


// Lisätään uusi blogi tietokantaan
blogsRouter.post('/', userExtractor,  async (request, response) => {
    const body = request.body

   console.log(body)
    const user = request.user
    console.log(user)
    if (!user) {
      return response.status(401).json({error: "You cant do that"})
    }

    
    // Luodaan uusi blogi
    const blog = new Blog({

        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes ? body.likes : 0,
        user: user._id,
       
    })
    
    
// Tallennetaan
   const savedBlog = await blog.save()
    // console.log(user.blogs)
    // console.log(savedBlog._id)

   
   // Uusi blogi (sen id) lisätään käyttäjän jo olemassaoleviin blogeihin
   
   user.blogs = user.blogs.concat(savedBlog._id)

   //console.log(user)
   await user.save()
   
   response.status(201).json(savedBlog)
})


blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
      response.json(blog)
    } else {
      response.status(404).end()
    }
  })

// Poistetaan blogi id:n perusteella tietokannasta
  blogsRouter.delete('/:id', userExtractor, async (request, response) => {
    console.log("delete!!!!")
    
    const findBlog = await Blog.findById(request.params.id)
    console.log(findBlog.id)
    const user = request.user
    console.log(user.id)
    console.log(findBlog.user)
    if (!user || findBlog.user !== user.id) {
      return response.status(401).json({error: "You cant do that!"})
    }
 
    user.blogs = user.blogs.filter(blog => blog !== findBlog.id)
    await user.save()
    await findBlog.remove()
    response.status(204).end()
  })
  
  blogsRouter.put('/:id', async (request, response, next) => {
    
  try {
    const blog = await Blog.findByIdAndUpdate(request.params.id, request.body, {
      new: true,
    }).exec()
    response.json(blog)
  } catch (error) {
    next(error)
  }
})


module.exports = blogsRouter