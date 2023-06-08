import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ApolloClient, ApolloProvider, gql, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

import { Container } from '@mui/material'

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('library-user-token')
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}`: null,
        }
    }
})

const httpLink = createHttpLink({
    uri: 'http://localhost:4000',
})
const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink)
})

const query = gql`
query {
    allAuthors {
        name
        born
        bookCount
      }
      allBooks {
        title
        published
        author { name }
      }
}
`
// Client-olio lähettää kyselyn palvelimelle
client.query({ query }).then((response) => {
    console.log(response.data)
})


ReactDOM.createRoot(document.getElementById('root')).render(
<ApolloProvider client={client}>
    <Container>
    <App />
    </Container>

    </ApolloProvider>)