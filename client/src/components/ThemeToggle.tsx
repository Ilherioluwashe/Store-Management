import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs'
import Wrapper from '../assets/wrappers/ThemeToggle'
import { useDashboardContext } from '../pages/DashboardLayout'

const ThemeToggle = () => {
  const dashboardContext = useDashboardContext()

  if (!dashboardContext) {
    return null // or return some fallback UI
  }

  const { isDarkTheme, toggleDarkTheme } = dashboardContext
  return (
    <Wrapper onClick={toggleDarkTheme}>
      {isDarkTheme ? (
        <BsFillSunFill className="toggle-icon" />
      ) : (
        <BsFillMoonFill />
      )}
    </Wrapper>
  )
}
export default ThemeToggle
