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
      },
      {
        path: '/dashboard',
        element: <DashboardLayout />,
      },
    ],
  },
])

const App = () => {
  return <RouterProvider router={router} />
}
export default App
