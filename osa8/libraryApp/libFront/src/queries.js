import { gql } from '@apollo/client'

export const BOOK_DETAILS = gql`
fragment BookDetails on Book {
    id 
    title
    published
    author {
        name
    }
    genres
}`
export const ALL_AUTHORS = gql`
query {
    allAuthors {
        name
        born
        bookCount
      }
}`

export const ME_USER = gql`
query {
    me {
        favouriteGenre
    }
}`

export const ALL_BOOKS = gql`
query allBooks($author: String, $genres: String) {
    allBooks(author: $author, genres: $genres) {
        title
        published
        author { name }
        genres
    }
}`

export const ADD_BOOK = gql`
mutation bookAdding($title: String! $published: Int! $author: String! $genres: [String!]! ) {
    addBook(title: $title, published: $published, author: $author, genres: $genres ){
        title, published, author { name }
    }
}`

export const UPDATE_YEAR = gql`
mutation updateYear($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
        name
        born
    }
}`

export const LOGIN = gql`
mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
        value
    }
}`

export const BOOK_ADDED = gql`
subscription {
    bookAdded {
        ...BookDetails
    }
}
${BOOK_DETAILS}`