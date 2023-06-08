import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
query {
    allAuthors {
        name
        born
        bookCount
      }
}`

export const ALL_BOOKS = gql`
query {
    allBooks {
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
