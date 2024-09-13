import Wrapper from '../assets/wrappers/CustomersContainer'
import { CustomerType } from '../dtos/allCustomers.interface'
import { useAllCustomersContext } from '../pages/AllCustomers'
import Customer from './Customer'

const CustomersContainer: React.FC = () => {
  const context = useAllCustomersContext()
  if (!context || !context.data || !context.data.customers) {
    return (
      <Wrapper>
        <h2>No customers to display...</h2>
      </Wrapper>
    )
  }

  const { customers } = context.data
  if (customers.length === 0) {
    return (
      <Wrapper>
        <h2>No customers to display...</h2>
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <div className="customers">
        {customers.map((customer: CustomerType) => {
          return <Customer key={customer.id} {...customer} />
        })}
      </div>
    </Wrapper>
  )
}

export default CustomersContainer
