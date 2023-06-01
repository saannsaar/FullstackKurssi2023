const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const bcrypt = require('bcrypt')


const api = supertest(app)

const User = require('../models/user')

const Blog = require('../models/blog')

const helper = require('./test_helper')
const { blogsInDb } = require('./test_helper')
const { before } = require('lodash')
let authorization = ""

beforeEach(async () => {
   await User.deleteMany({})

   const testUser = helper.initialUsers[0]
   await api.post('/api/users').send(testUser)
   const response = await api.post('/api/login').send(testUser)
   console.log(response)
   authorization = `bearer ${response.body.token}`
})



describe('when there is initially one user at database', () => {
    beforeEach(async () => {
        await User.deleteMany({})
    
        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'admin', passwordHash })
    
        await user.save()
      })

      test('creation succeeds with a unique username', async () => {
        const usersAtStart = await helper.usersInDb()
    
        const newUser = {
          username: 'wilmadoggy',
          name: 'Wilma Koira',
          password: 'salasana',
        }
    
        await api.post('/api/users').send(newUser).expect(201).expect('Content-Type', /application\/json/)
    
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
    
        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
      })

      test('creation fails with given statuscode and message if username already taken', async () => {
        const usersAtStart = await helper.usersInDb()
    
        const newUser = {
          username: 'admin',
          name: 'Uusi Koira',
          password: 'salasana',
        }
    
        const result = await api.post('/api/users').send(newUser).expect(400).expect('Content-Type', /application\/json/)
    
        expect(result.body.error).toContain('expected `username` to be unique')
    
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
      })
    
})

describe('when there is initially some blogs saved', () => {
    // Alustetaan tietokanta ennen jokaisen testin suoritusta (beforeEach),
// eli tyhjennetään tietokanta ja sitten lisätään kaksi "initialBlogs" taulukkoon tallennettua 
// blogia
beforeEach(async ()=> {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

    test('blogs are returned as json', async () => {
        await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })
    
    test('4.8 all blogs are returned', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })

    test('4.9 blog identifier is id', async () => {
        // HTTP 200 tarkoittaa että pyyntö on onnistunut
        const response = await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/)
    
        const blog = response.body[0]
    
        expect(blog.id).toBeDefined()
    })
    
})

describe('addition of a new blog', () => {
    test('4.10 succeeds with valid data', async () => {
        const newBlog = {
            title: "testititle",
            author: "testiauthor",
           url: "testiurl",
           likes: 1,
        }

        await api.post('/api/blogs').set("Authorization", authorization).send(newBlog).expect(201).expect('Content-Type', /application\/json/)
        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length +1)

        const contents = blogsAtEnd.map(b => b.title)
        expect(contents).toContain('testititle')
    })

    test ('4.11 likes are set to 0 if value is not given', async () => {
        const blog = {
            title: 'Moi',
            author: 'minaa',
            url: 'urli'
        }

        const response = await api.post('/api/blogs').set("Authorization", authorization).send(blog).expect(201).expect('Content-Type', /application\/json/)

        expect(response.body.likes).toBe(0)
    })

    test('4.12 400 status if title is missing', async () => {
        const blog = {
            author: 'minamina',
            url: 'urrrli',
            likes: 1
        }

        await api.post('/api/blogs').set("Authorization", authorization).send(blog).expect(400).expect('Content-Type', /application\/json/)

    })

    test('4.12 400 status if author is missing', async () => {
        const blog = {
            title: 'Titttle',
            url: 'urrrli',
            likes: 1
        }

        await api.post('/api/blogs').set("Authorization", authorization).send(blog).expect(400).expect('Content-Type', /application\/json/)

    })
})


describe('Delete/modification', () => {
    let testiID = ""
    beforeEach(async () => {
        await Blog.deleteMany({})
        // Luodaan testiblogi erikseen koska tarvitaan ideetä ja helpompi näin 
        const testBlog = {
            title: "Testititle",
            author: "Testi tyyppi",
            url: "www.www.ww.www",
            likes: 2
        }

        const response = await api.post('/api/blogs').set("Authorization", authorization).send(testBlog)
        // Id talteen
        testiID = response.body.id
    })

    test('deletion succeeds with status code 204 if id is valid', async () => {
        await api.delete(`/api/blogs/${testiID}`).set("Authorization", authorization).expect(204)

        const blogsAfter = await blogsInDb()

        expect(blogsAfter).toHaveLength(0)

    })
    test('4.14 modification succeeds with status code 204 if id is valid', async () => {
        const blogsAtStart = await blogsInDb()
        const blogToBeChanged = blogsAtStart[0]
        const modifiedBlog = {...blogToBeChanged, likes: 40}

        await api.put(`/api/blogs/${blogToBeChanged.id}`).send(modifiedBlog).expect(200)

        const blogsAfter = await blogsInDb()



        expect(blogsAtStart[0].likes).not.toContain(modifiedBlog.likes)


    })

  
})



afterAll(async () => {
    await mongoose.connection.close()
})