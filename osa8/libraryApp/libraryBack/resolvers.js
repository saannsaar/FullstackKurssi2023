const Book = require('./models/Book')
const Author = require('./models/Author')
const User = require('./models/User')
const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

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
  u
      return await Book.find({})
    },
    // Returns logged in user with the third parameter (context)
    // If the user is not logged in (no valid token in header) returns null
    me: (root, args, context) => {
      return context.currentUser
    }
       
    },
    Mutation: {
      addBook: async (root, args, context) => {
        console.log(root)
        console.log(args)
        const currentUser = context.currentUser
  
        if (!currentUser) {
          throw new GraphQLError( 'not authenticated to add a new book', {
            extensions: {
              code: 'BAD_USER_INPUT',
            }
          })
        }
        // Find if the auhtor given as arg. is already in db
        const auhtorIsFound = await Author.findOne({ name: args.author })
        // If not add new author also to the db
        if (!auhtorIsFound) {
          // Create a new author with given argument "author" (id is created automatically)
          
         try {
          
            const newAuthor = await new Author({ name: args.author})
          // Save
          await newAuthor.save()
         // Create a new book with given arguments for the book 
          const newBook = await new Book({ ...args, author: newAuthor })
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

         pubsub.publish('BOOK_ADDED', {bookAdded: newBook})
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
  
      editAuthor: async  (root, args, context) => {
      
        const currentUser = context.currentUser
  
        if (!currentUser) {
          throw new GraphQLError( 'not authenticated to make changes', {
            extensions: {
              code: 'BAD_USER_INPUT',
            }
          })
        }
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
      },
  
      createUser: async (root, args) => {
        const user = new User({ username: args.username })
  
        return user.save()
        .catch(error => {
          throw new GraphQLError('Creating the user failed', {
            extensions: {
              conde: 'BAD_USER_INPUT',
              invalidArgs: args.name,
              error
            }
          })
        })
      },
  
      login: async (root, args) => {
        const user = await User.findOne({ username: args.username })
  
        if ( !user || args.password !== 'secret' )
        {
          throw new GraphQLError('wrong credentials', {
            extensions: {
              code: 'BAD_USER_INPUT'
            }
          })
        }
  
        const userForToken = {
          username: user.username,
          id: user._id,
        }
  
        return { value: jwt.sign(userForToken, process.env.JWT_SECRET )}
      }
    },
    Subscription: {
        bookAdded: {
            subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
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

  module.exports = resolvers