import { Link, useRouteError } from 'react-router-dom'
<<<<<<< HEAD
import img from '../assets/images/not-found.svg'
import Wrapper from '../assets/wrappers/ErrorPage'

const Error = () => {
  const error = useRouteError() as { status: number }

  console.log(error)
  if (error.status === 404) {
    return (
      <Wrapper>
        <div>
          <img src={img} alt="not found" />
          <h3>Ohh! page not found</h3>
          <p>We can't seem to find the page you're looking for</p>
          <Link to="/dashboard">back home</Link>
        </div>
      </Wrapper>
    )
  }
  return (
    <Wrapper>
      <div>
        <h3>something went wrong</h3>
      </div>
    </Wrapper>
=======

const Error = () => {
  const error = useRouteError()
  console.log(error)
  return (
    <div>
      <h1>Error Page!!!</h1>
      <Link to="/dashboard">back home</Link>
    </div>
>>>>>>> 36e46dc03b86ded65f914dbeaa4454f466b21072
  )
}
export default Error
