import { TextField, Button } from '@mui/material'
import PropTypes from 'prop-types'

const LoginForm = (props) => {
  return(
    <div>
      <h2>Login</h2>

      <form onSubmit={props.handleSubmit}>
        <div>
          <TextField label="username"value={props.username} onChange={props.handleUsernameChange}/>
        </div>
        <div>
          <TextField label="password" type='password'  value={props.password} onChange={props.handlePasswordChange}/>
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

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handlePasswordChange:  PropTypes.func.isRequired,
  handleUsernameChange:  PropTypes.func.isRequired,
  username:  PropTypes.string.isRequired,
  password:  PropTypes.string.isRequired
}
export default LoginForm