import { Outlet, useNavigate } from 'react-router-dom'
import Wrapper from '../assets/wrappers/Dashboard'
import { BigSidebar, Navbar, SmallSidebar } from '../components'
import { createContext, useContext, useState } from 'react'
import { DashboardContextType } from '../dtos/dashboardLayout.interface'
import { checkDefaultTheme } from '../App'
import customFetch from '../utils/customFetch'
import { toast } from 'react-toastify'
// import customFetch from '../utils/customFetch'

// export const loader = async () => {
//   try {
//     const { data } = await customFetch.get('/staffs/current-staff')
//     return data
//   } catch (error) {
//     return redirect('/')
//   }
// }

const DashboardContext = createContext<DashboardContextType | null>(null)
const DashboardLayout = () => {
  // const data = useLoaderData()
  // console.log(data)

  const user = { name: 'mike' }

  const navigate = useNavigate()
  const [showSidebar, setShowSidebar] = useState(false)
  const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme())

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme
    setIsDarkTheme(newDarkTheme)
    document.body.classList.toggle('dark-theme', newDarkTheme)
    localStorage.setItem('darkTheme', newDarkTheme.toString())
  }

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar)
  }

  const logoutUser = async () => {
    navigate('/')
    await customFetch.get('/auth/logout')
    toast.success('Logging out...')
  }

  return (
    <DashboardContext.Provider
      value={{
        user,
        showSidebar,
        isDarkTheme,
        toggleDarkTheme,
        toggleSidebar,
        logoutUser,
      }}
    >
      <Wrapper>
        <main className="dashboard">
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar />
            <div className="dashboard-page">
              <Outlet context={user} />
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  )
}

// export const useDashboardContext = () => useContext(DashboardContext)
export const useDashboardContext = (): DashboardContextType => {
  const context = useContext(DashboardContext)
  if (context === null) {
    throw new Error(
      'useDashboardContext must be used within a DashboardProvider'
    )
  }
  return context
}
export default DashboardLayout
