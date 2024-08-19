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
        children: [
          {
            index: true,
            element: <AddCustomer />,
          },
          {
            path: 'all-customers',
            element: <AllCustomers />,
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
