<<<<<<< HEAD
import Wrapper from '../assets/wrappers/LoginPage'
import { FormRow, Logo } from '../components'

const Login = () => {
  return (
    <Wrapper>
      <form className="form">
        <Logo />
        <h4>Login</h4>
        <FormRow type="email" name="email" defaultValue="mike@gmail.com" />
        <FormRow type="password" name="password" defaultValue="password1" />
        <button type="submit" className="btn btn-block">
          submit
        </button>
      </form>
    </Wrapper>
=======
// import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div>
      <h1>Login</h1>
      {/* <Link to="/register">Register Page</Link> */}
    </div>
>>>>>>> 36e46dc03b86ded65f914dbeaa4454f466b21072
  )
}
export default Login
