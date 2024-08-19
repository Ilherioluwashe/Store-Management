import Wrapper from '../assets/wrappers/Navbar'
import { FaAlignLeft } from 'react-icons/fa'
import Logo from './Logo.jsx'
import { useDashboardContext } from '../pages/DashboardLayout'
import LogoutContainer from './LogoutContainer'
import ThemeToggle from './ThemeToggle'

const Navbar = () => {
  const dashboardContext = useDashboardContext()

  if (!dashboardContext) {
    return null // or return some fallback UI
  }
  const { toggleSidebar } = dashboardContext
  return (
    <Wrapper>
      <div className="nav-center">
        <button
          type="button"
          className="toggle-btn"
          onClick={toggleSidebar}
          title="Toggle Sidebar"
        >
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h4 className="logo-text">dashboard</h4>
        </div>
        <div className="btn-container">
          <ThemeToggle />
          <LogoutContainer />
        </div>
      </div>
    </Wrapper>
  )
}
export default Navbar
