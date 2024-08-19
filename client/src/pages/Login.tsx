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
  )
}
export default Login
