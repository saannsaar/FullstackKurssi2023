const mongoose = require('mongoose')



const url = 'mongodb+srv://sanniveps:<password>cluster0.8ap2tel.mongodb.net/?retryWrites=true&w=majority'

mongoose.set('strictQuery',false)
mongoose.connect(url)

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number,
})

const Blog = mongoose.model('Blog', blogSchema)

const blog = new Blog({
    title: "Testi nimi",
    author: "Testi kirjoittaja",
    url: "testisosoite",
    likes: 3,
})

blog.save().then(result => {
  console.log('blogi saved!')
  mongoose.connection.close()
})