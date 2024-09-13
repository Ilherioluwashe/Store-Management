export interface CustomerType {
  id: string
  name: string
  address: string
  phoneNumber: string
  email: string
}

export interface AllCustomersContextType {
  data: {
    customers: CustomerType[]
  }
}
