import {
  redirect,
  ActionFunctionArgs,
  useNavigation,
  Form,
} from 'react-router-dom'
import Wrapper from '../assets/wrappers/LoginPage'
import { FormRow, Logo } from '../components'
import customFetch from '../utils/customFetch'
import { toast } from 'react-toastify'
import { AxiosError } from 'axios'

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)
  try {
    await customFetch.post('/auth/login', data)
    toast.success('Login Successful')
    return redirect('/dashboard')
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      toast.error(error.response.data?.msg)
      // toast.error(error.response.data?.msg || 'An error occurred')
    } else {
      toast.error('An unexpected error occurred')
    }
    return null
  }
}

const Login = () => {
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'
  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Login</h4>
        <FormRow type="email" name="email" defaultValue="mikee@gmail.com" />
        <FormRow type="password" name="password" defaultValue="password" />
        <button type="submit" className="btn btn-block" disabled={isSubmitting}>
          {isSubmitting ? 'submitting...' : 'submit'}
        </button>
      </Form>
    </Wrapper>
  )
}
export default Login
