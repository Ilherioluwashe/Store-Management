import { Request } from 'express'
import prisma from '../models/index.models'
import { Customer } from '@prisma/client'
import { UpdateCustomerData } from '../dtos/customer.interface'

export const createCustomer = async (req: Request) => {
  const { name, email, phoneNumber, address } = req.body
  const customer = await prisma.customer.create({
    data: {
      name,
      email,
      phoneNumber,
      address,
    },
  })
  return customer
}
export const getAllCustomers = async () => {
  return await prisma.customer.findMany()
}
export const getCustomerById = async (id: number): Promise<Customer | null> => {
  const customer = await prisma.customer.findUnique({ where: { id } })
  return customer
}

export const updateCustomer = async (
  id: number,
  data: UpdateCustomerData
): Promise<Customer | null> => {
  const updatedCustomer = await prisma.customer.update({
    where: { id },
    data,
  })
  return updatedCustomer
}

export const deleteCustomer = async (id: number): Promise<Customer | null> => {
  const deletedCustomer = await prisma.customer.delete({
    where: { id },
  })
  return deletedCustomer
}
