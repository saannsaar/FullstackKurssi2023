const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Book = require('./models/Book')
const Author = require('./models/Author')

require('dotenv').config()
const MONGODB_URI = process.env.MONGODB_URI

console.log('Connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI).then(() => {
  console.log('connected to MongoDB')
}).catch((error) => {
  console.log('error while connecting to MongoDB', error.message)
})


const typeDefs = `
type Author {
  name: String!
  id: ID!
  born: String
  bookCount: Int
}

type Book {
  title: String!
  published: Int!
  author: Author!
  genres: [String!]!
  id: ID!
}

type Mutation {
  addBook(
    title: String!
    published: Int!
    author: String!
    genres: [String!]
  ): Book
  editAuthor(name: String!, setBornTo: Int!): Author
}

  type Query {
    authorCount: Int!
    allAuthors: [Author!]!
    allBooks(author: String, genre: String): [Book!]
    bookCount: Int!
  }
`

const resolvers = {
  Query: {
    authorCount: async () => Author.collection.countDocuments(),
    allAuthors: async (root, args) => {
      const result = await Author.find({})
      return result
    },
    bookCount: async () => Book.collection.countDocuments(),
    // TODO
    allBooks: async (root, args) => {
      console.log(args)
      // If theres no arguments as filters get all the books from db
      if(!args.author && !args.genre) {
        return await Book.find({})
      }
      // If there's author and genre given as arguments
    if (args.author && args.genres) {
      let booksbyAuthor = Author.findOne({ name: args.author })
      let booksbyGenre = await Book.find({
        $and: [
          {author: booksbyAuthor.id}, {genres: args.genre },
        ]
      }).populate('author')
      
      return booksbyGenre
    } 
    // If there's author given as an argument
    if (args.author) {
      let booksbyAuthor = await Author.find({ name: args.author }) 
      return await Book.findById(booksbyAuthor.id).populate('author')
    }
    // If there's genre given as an argument 
    if (args.genre) {
      return await Book.find({ genres : args.genre }).populate('author')
    }

    return await Book.find({})
  }
     
  },
  Mutation: {
    addBook: async (root, args) => {
      // Find if the auhtor given as arg. is already in db
      const auhtorIsFound = await Author.findOne({ name: args.author })
      // If not add new author also to the db
      if (!auhtorIsFound) {
        // Create a new author with given argument "author" (id is created automatically)
        const newAuthor = new Author({ name: args.author})
        // Save
       await newAuthor.save()
       // Create a new book with given arguments for the book 
       const newBook = new Book({ ...args, author: newAuthor })
       // Save
       await newBook.save()
       return newBook
      }
      // If author is already in db just add new book 
      const newBook = new Book({ ...args, author: auhtorIsFound })
      // Save it
      await newBook.save()
      return newBook

    },
    editAuthor: async  (root, args) => {
      // First get the right author from db by name given as an argument
      const findAuthor = await Author.findOne({ name: args.name })
      // If theres no such author in db return null
      if (!findAuthor) {
        return null
      }
      // Change the born value in db 
      const updateA = { ...findAuthor, born: args.setBornTo }
      // Save the updated Author in db
      await updateA.save()
      return updateA
    }
  },
  Author: {
    bookCount: async (root) => {
      console.log(root)
      // First get the author
      const booksFromAuthor = await Author.findOne({ name: root.name })
      // Then get books that has has a reference to the found author (with id)
      const allBooks = await Book.find({ author: booksFromAuthor.id })
      // return the length as in how many books one author has
      return allBooks.length
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
