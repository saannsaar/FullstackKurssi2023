const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')


const api = supertest(app)

const Blog = require('../models/blog')

const helper = require('./test_helper')

// Alustetaan tietokanta ennen jokaisen testin suoritusta (beforeEach),
// eli tyhjennetään tietokanta ja sitten lisätään kaksi "initialBlogs" taulukkoon tallennettua 
// blogia
describe('when there is initially some blogs saved', () => {
    beforeEach(async () => {
        await Blog.deleteMany({})
        console.log(Blog)
        await Blog.insertMany(helper.initialBlogs)
  
    })

    test('blogs are returned as json', async () => {
        await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })
    test('blog identifier is id', async () => {
        // HTTP 200 tarkoittaa että pyyntö on onnistunut
        const response = await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/)
    
        const blog = response.body[0]
    
        expect(blog.id).toBeDefined()
    })
    
})




afterAll(async () => {
    await mongoose.connection.close()
})