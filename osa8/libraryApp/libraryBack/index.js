const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { GraphQLError } = require('graphql')

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

type User {
  username: String!
  favouriteGenre: String!
  id: ID!
}

type Token {
  value: String!
}

type Mutation {
  addBook(
    title: String!
    published: Int!
    author: String!
    genres: [String!]
  ): Book
  editAuthor(name: String!, setBornTo: Int!): Author
  createUser(username: String!, favouriteGenre: String!): User
  login(username: String!, password: String!): Token
}

  type Query {
    authorCount: Int!
    allAuthors: [Author!]!
    allBooks(author: String, genres: String): [Book!]
    bookCount: Int!
    me: User
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
    
    allBooks: async (root, args) => {
      console.log(args)
      // If theres no arguments as filters get all the books from db
      if(!args.author && !args.genres) {
        return await Book.find({}).populate('author')
      }
      // If there's author and genre given as arguments
    if (args.author && args.genres) {
      console.log(args.author)
      console.log("-------")
      let booksbyAuthor = await Author.findOne({ name: args.author })
      console.log(booksbyAuthor._id)
      let booksbyGenre = await Book.find({
        $and: [
          {author: booksbyAuthor._id}, {genres: args.genres },
        ]
      }).populate('author')
      
      return booksbyGenre
    } 
    // If there's author given as an argument
    if (args.author) {
      console.log(args.author)
      let booksbyAuthor = await Author.findOne({ name: args.author }) 
      console.log(booksbyAuthor._id)
      return await Book.find({ author: booksbyAuthor._id }).populate('author')
    }
    // If there's genre given as an argument 
    if (args.genres) {
      return await Book.find({ genres : args.genres }).populate('author')
    }

    return await Book.find({})
  }
     
  },
  Mutation: {
    addBook: async (root, args) => {
      console.log(root)
      console.log(args)
      // Find if the auhtor given as arg. is already in db
      const auhtorIsFound = await Author.findOne({ name: args.author })
      // If not add new author also to the db
      if (!auhtorIsFound) {
        // Create a new author with given argument "author" (id is created automatically)
        const newAuthor = await new Author({ name: args.author})
        // Save
       await newAuthor.save()
       // Create a new book with given arguments for the book 
       const newBook = await new Book({ ...args, author: newAuthor })
       try {
        // Save
          await newBook.save()
       } catch (error) {
        console.log(error.message)
        throw new GraphQLError(error.message, {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
       }
       return newBook
       
      }
      // If author is already in db just add new book 
      const newBook = await new Book({ ...args, author: auhtorIsFound })
      // Save it 
      try {
        await newBook.save()
      } catch (error) {
        throw new GraphQLError(error.message, {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }
     
    

    },
    editAuthor: async  (root, args) => {
    
      // First get the right author from db by name given as an argument
      const findAuthor = await Author.findOne({ name: args.name })
      // If theres no such author in db return null
      if (!findAuthor) {
        return null
      }
      // Change the born value in db 
      findAuthor.born = args.setBornTo
      // Save the updated Author in db
      return  await findAuthor.save()
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
