import React from 'react'

const LoginForm = ({handleLogin, handleUsername, handlePassword}) => {
    return (
        <form onSubmit={handleLogin}>
            <h1>Welcome! Please log in!</h1>
           <label>Username: <input type='text' onChange={handleUsername}/></label>
           <label>Password: <input type='password' onChange={handlePassword}/></label>
           <button type="submit">Login</button>
               

        </form>
    )
}

export default LoginForm