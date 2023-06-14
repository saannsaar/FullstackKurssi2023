
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

  type Subscription {
    bookAdded: Book!
  }
`

module.exports = typeDefs