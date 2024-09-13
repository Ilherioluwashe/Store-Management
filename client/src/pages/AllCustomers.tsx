import { ActionFunctionArgs, useLoaderData } from 'react-router-dom'
import customFetch from '../utils/customFetch'
import { toast } from 'react-toastify'
import { AxiosError } from 'axios'
import { createContext, useContext } from 'react'
import {
  AllCustomersContextType,
  CustomerType,
} from '../dtos/allCustomers.interface'
import { CustomersContainer, SearchContainer } from '../components'

export const loader = async ({ request }: ActionFunctionArgs) => {
  try {
    const { data } = await customFetch.get<CustomerType[]>('/customers')
    return {
      data: {
        customers: data,
      },
    }
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      toast.error(error.response.data?.msg)
      // toast.error(error.response.data?.msg || 'An error occurred')
    } else {
      toast.error('An unexpected error occurred')
    }
    return { data: { customers: [] as CustomerType[] } }
    // return error
  }
}

const AllCustomersContext = createContext<AllCustomersContextType | null>(null)

// export const useAllCustomers = () => {
//   const context = useContext(AllCustomersContext)
//   if (!context) {
//     throw new Error(
//       'useAllCustomers must be used within an AllCustomersProvider'
//     )
//   }
//   return context
// }

const AllCustomers = () => {
  const { data } = useLoaderData() as { data: CustomerType[] }
  return (
    <AllCustomersContext.Provider value={{ data }}>
      <SearchContainer />
      <CustomersContainer />
    </AllCustomersContext.Provider>
  )
}

// export const useAllCustomersContext = () => {
//   const context = useContext(AllCustomersContext)
//   if (!context) {
//     throw new Error(
//       'useAllCustomers must be used within an AllCustomersProvider'
//     )
//   }
//   return context
// }

export const useAllCustomersContext = () => useContext(AllCustomersContext)

export default AllCustomers
