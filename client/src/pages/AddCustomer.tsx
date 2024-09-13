import {
  Form,
  useNavigation,
  useOutletContext,
  ActionFunctionArgs,
  redirect,
} from 'react-router-dom'
import Wrapper from '../assets/wrappers/DashboardFormPage'
import { FormRow } from '../components'
import customFetch from '../utils/customFetch'
import { toast } from 'react-toastify'
import { AxiosError } from 'axios'

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)

  try {
    await customFetch.post('/customers', data)
    toast.success('Customer added successfully')
    return redirect('all-customers')
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      toast.error(error.response.data?.msg)
      // toast.error(error.response.data?.msg || 'An error occurred')
    } else {
      toast.error('An unexpected error occurred')
    }
    return error
  }
}

const AddCustomer = () => {
  const { user } = useOutletContext()
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'
  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">add customer</h4>
        <div className="form-center">
          <FormRow type="text" name="name" />
          <FormRow type="email" name="email" />
          <FormRow type="text" name="phoneNumber" />
          <FormRow type="text" name="address" />
          <button
            type="submit"
            className="btn btn-block form-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'submitting...' : 'submit'}
          </button>
        </div>
      </Form>
    </Wrapper>
  )
}
export default AddCustomer
