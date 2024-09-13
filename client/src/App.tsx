import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import {
  AddCustomer,
  AddOrder,
  AddProduct,
  AddStaff,
  AllCustomers,
  AllOrders,
  AllProducts,
  AllStaffs,
  DashboardLayout,
  EditCustomer,
  EditOrder,
  EditProduct,
  EditStaff,
  Error,
  Landing,
  Login,
  HomeLayout,
} from './pages'

import { action as loginAction } from './pages/Login'
import { action as addCustomerAction } from './pages/AddCustomer'
import { loader as allCustomersLoader } from './pages/AllCustomers'

export const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem('darkTheme') === 'true'
  document.body.classList.toggle('dark-theme', isDarkTheme)
  return isDarkTheme
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Landing /> },
      {
        path: '/login',
        element: <Login />,
        action: loginAction,
      },
      {
        path: '/dashboard',
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <AddCustomer />,
            action: addCustomerAction,
          },
          {
            path: 'all-customers',
            element: <AllCustomers />,
            loader: allCustomersLoader,
          },
          {
            path: 'add-product',
            element: <AddProduct />,
          },
          {
            path: 'all-products',
            element: <AllProducts />,
          },
          {
            path: 'add-order',
            element: <AddOrder />,
          },
          {
            path: 'all-orders',
            element: <AllOrders />,
          },
          {
            path: 'add-staff',
            element: <AddStaff />,
          },
          {
            path: 'all-staffs',
            element: <AllStaffs />,
          },
        ],
      },
    ],
  },
])

const App = () => {
  return <RouterProvider router={router} />
}
export default App
