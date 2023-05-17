import PropTypes from 'prop-types'

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

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handlePasswordChange:  PropTypes.func.isRequired,
  handleUsernameChange:  PropTypes.func.isRequired,
  username:  PropTypes.string.isRequired,
  password:  PropTypes.string.isRequired
}
export default LoginForm