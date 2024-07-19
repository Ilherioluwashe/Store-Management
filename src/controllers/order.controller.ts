import { Response, Request, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as orderService from '../services/order.service'
import { CreateOrderReq } from '../dtos/order.interface'
import { AuthenticatedRequest } from '../dtos/authentication.interface'
import CustomError from '../errors/index.errors'

export const createOrder = async (req: AuthenticatedRequest, res: Response) => {
  const request: CreateOrderReq = req.body
  const userId = req.user?.id
  if (typeof userId !== 'number') {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: 'User not authenticated' })
  }
  const { order, orderItems } = await orderService.createOrder(
    userId,
    request.items,
    request.customerId
  )
  res.status(StatusCodes.CREATED).json({ order: { ...order, orderItems } })
}

export const getAllOrders = async (req: Request, res: Response) => {
  const orders = await orderService.getAllOrders()
  res.status(StatusCodes.OK).json({ orders })
}

export const getOrderById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const order = await orderService.getOrderById(Number(id))

    if (order) {
      res.status(StatusCodes.OK).json(order)
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ message: 'Order not found' })
    }
  } catch (error) {
    console.error('Error fetching order:', error)
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'An error occurred while fetching the order' })
  }
}

export const updateOrder = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const orderId = Number(req.params.id)
    const { items, customerId } = req.body
    const userId = req.user?.id

    if (isNaN(orderId)) {
      return res.status(400).json({ message: 'Invalid order ID' })
    }

    if (typeof userId !== 'number') {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: 'User not authenticated' })
    }

    const updatedOrder = await orderService.updateOrder(
      orderId,
      userId,
      items,
      customerId
    )

    res.status(StatusCodes.OK).json({ order: updatedOrder })
  } catch (error) {
    if (error instanceof Error) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: error.message })
    } else {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: 'An error occurred while updating the order' })
    }
  }
}

export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const orderId = parseInt(req.params.id)
    const result = await orderService.deleteOrder(orderId)
    res.status(StatusCodes.OK).json(result)
  } catch (error) {
    console.log(error)
    if (error instanceof CustomError.NotFoundError) {
      res.status(StatusCodes.NOT_FOUND).json({ message: error.message })
    } else {
      res

        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: 'An error occurred while deleting the order' })
    }
  }
}
