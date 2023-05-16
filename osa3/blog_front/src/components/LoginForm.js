const LoginForm = (props) => {
    return(
        <div>
            <h2>Login</h2>

            <form onSubmit={props.handleSubmit}>
                <p>Username: <input value={props.username} onChange={props.handleUsernameChange}/></p>
                <p>Password: <input value={props.password} onChange={props.handlePasswordChange}/></p>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default LoginForm