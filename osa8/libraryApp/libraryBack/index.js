const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1: uuid } = require('uuid')
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
      const result = await Author.fing({})
      return result
    },
    bookCount: async () => Book.collection.countDocuments(),
    // TODO
    allBooks: (root, args) => {
      console.log(args)
      if(!args.author && !args.genre) {
        return books
      }
    if (args.author) {
      let booksbyAuthor = books.filter(b=> b.author === args.author)
      if (args.genres) {
        return booksbyAuthor.filter(b => b.genres.find(g => g === args.genre))
      }
      return booksbyAuthor
    } 
    if (args.genre) {
      return books.filter(b => b.genres.find(g => g === args.genre))
    }
   

    return books
  }
     
  },
  Mutation: {
    addBook: async (root, args) => {
      const book = new Book({...args})
      const auhtorIsFound = authors.find(a => a.name === args.author)
      if (!auhtorIsFound) {
        let newAuthor = { name: args.author, id: uuid() }
        authors.concat(newAuthor)
      }
      books = books.concat(book)
      return book
    },
    editAuthor: (root, args) => {
      const findAuthor = authors.find(a => a.name.trim().toLowerCase() === args.name.trim().toLowerCase())
      if (!findAuthor) {
        return null
      }
      const updateA = { ...findAuthor, born: args.setBornTo }
      authors = authors.map(a => a.name === args.name ? updateA : a)
      return updateA
    }
  },
  Author: {
    bookCount: (root) => {
      console.log(root)
      const booksFromAuthor = books.filter(book => book.author === root.name)
      return booksFromAuthor.length
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
