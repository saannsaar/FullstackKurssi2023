import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'
import { TextField, Button } from '@mui/material'

const LoginForm = ({ setError, setToken }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [ login, result ] = useMutation(LOGIN, {
        onError: (error) => {
            setError(error.graphQLErrors[0].message)
        }
    })

    //effecthook which sets the token to the Apps state and to the local storage when the server responses to the mutation
    useEffect(() => {
        if ( result.data ) {
            const token = result.data.login.value
            setToken(token)
            localStorage.setItem('library-user-token', token)
        }
    })

    const submit = async (event) => {
        event.preventDefault()
    
        login({ variables: { username, password } })
    }

    return (
        <div>
        <h2>login</h2>
        <form onSubmit={submit}>
          <div>
            <TextField label="username" value={username} onChange={({ target }) => setUsername(target.value)} />
          </div>
          <div>
            <TextField label="password" type='password' value={password} onChange={({ target }) => setPassword(target.value)}/>
          </div>
          <div>
            <Button variant="contained" color="primary" type="submit">
              login
            </Button>
          </div>
        </form>
      </div>


    )
}

export default LoginForm