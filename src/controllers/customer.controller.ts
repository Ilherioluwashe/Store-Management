import { Request, Response } from 'express'
import * as customerService from '../services/customer.service'
import { StatusCodes } from 'http-status-codes'

export const createCustomer = async (req: Request, res: Response) => {
  try {
    const newCustomer = await customerService.createCustomer(req)
    res.status(StatusCodes.CREATED).json(newCustomer)
  } catch (error) {
    return
  }
}

export const getAllCustomers = async (req: Request, res: Response) => {
  const customers = await customerService.getAllCustomers()
  res.json(customers)
}

export const getCustomerById = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const customer = await customerService.getCustomerById(Number(id))
    if (customer) {
      res.status(StatusCodes.OK).json(customer)
    }
  } catch (error) {
    return
  }
}

export const updateCustomer = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params
  const data = req.body
  try {
    const updatedCustomer = await customerService.updateCustomer(
      Number(id),
      data
    )
    if (updatedCustomer) {
      res.status(StatusCodes.OK).json(updatedCustomer)
    }
  } catch (error) {
    return
  }
}
export const deleteCustomer = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params
  try {
    const deletedCustomer = await customerService.deleteCustomer(Number(id))
    if (deletedCustomer) {
      res.status(StatusCodes.OK).json({
        message: 'Customer deleted successfully',
        customer: deletedCustomer,
      })
    }
  } catch (error) {
    return
  }
}
