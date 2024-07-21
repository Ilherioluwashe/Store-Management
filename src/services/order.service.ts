import prisma from '../models/index.models'
import CustomError from '../errors/index.errors'
import { Prisma } from '@prisma/client'
import { generateInvoice } from '../utils/invoiceGenerator.utils'
import { v2 as cloudinary } from 'cloudinary'
import { OrderItemReq } from '../dtos/order.interface'

export const createOrder = async (
  userId: number,
  cartItems: any[],
  customerId: number
) => {
  let orderItems = []
  let subtotal = 0
  const productIds = cartItems.flatMap<number>((c) => {
    return c.productId
  })

  const cartItemProducts = await prisma.product.findMany({
    where: {
      id: {
        in: productIds,
      },
    },
    select: {
      name: true,
      id: true,
      price: true,
      quantity: true,
    },
  })
  for (const item of cartItems) {
    const dbProduct = cartItemProducts.find((x) => x.id == item.productId)
    if (!dbProduct) {
      throw new CustomError.NotFoundError(
        `No product with id: ${item.productId}`
      )
    }
    const { name, price, id } = dbProduct
    const singleOrderItem = {
      quantity: item.quantity,
      name,
      price,
      productId: id,
    }

    orderItems.push(singleOrderItem)
    subtotal += item.quantity * Number(price)

    await prisma.product.update({
      where: { id: item.productId },
      data: { quantity: { decrement: item.quantity } },
    })
  }

  const total = subtotal
  const order = await prisma.order.create({
    data: {
      orderItems: { create: orderItems },
      total,
      staffId: userId,
      customerId,
    },
    include: {
      orderItems: true,
      customer: true,
      staff: { select: { name: true } },
    },
  })

  const staff = await prisma.staff.findUnique({
    where: { id: userId },
  })

  if (!staff) {
    throw new Error('Staff not found')
  }
  const cloudinaryResult: any = await generateInvoice(
    order,
    order.customer,
    staff
  )
  const pdfUrl = cloudinary.url(`invoices/invoice-${order.id}`, {
    resource_type: 'raw',
    format: 'pdf',
    flags: 'attachment:false',
  })
  const updatedOrder = await prisma.order.update({
    where: { id: order.id },
    data: { invoiceUrl: pdfUrl },
    include: {
      orderItems: true,
      customer: { select: { name: true } },
      staff: { select: { name: true } },
    },
  })

  return {
    order: { ...updatedOrder, invoiceUrl: cloudinaryResult.secure_url },
    orderItems,
  }
}

export const getAllOrders = async () => {
  return await prisma.order.findMany({
    include: {
      orderItems: {
        select: {
          name: true,
          price: true,
          quantity: true,
        },
      },
      customer: {
        select: {
          name: true,
        },
      },
      staff: {
        select: {
          name: true,
        },
      },
    },
  })
}

export const getOrderById = async (id: number) => {
  return await prisma.order.findUnique({
    where: { id },
    include: {
      orderItems: {
        select: {
          name: true,
          price: true,
          quantity: true,
        },
      },
      customer: {
        select: {
          name: true,
        },
      },
      staff: {
        select: {
          name: true,
        },
      },
    },
  })
}

export const updateOrder = async (
  orderId: number,
  userId: number,
  items: OrderItemReq[],
  customerId: number
) => {
  try {
    const existingOrder = await prisma.order.findUnique({
      where: { id: orderId },
      include: { orderItems: true, customer: true, staff: true },
    })

    if (!existingOrder) {
      throw new Error(`Order with id ${orderId} not found`)
    }

    for (const item of existingOrder.orderItems) {
      await prisma.product.update({
        where: { id: item.productId },
        data: { quantity: { increment: item.quantity } },
      })
    }

    await prisma.orderItem.deleteMany({
      where: { orderId: orderId },
    })

    let subtotal = 0
    const newOrderItems: Prisma.OrderItemCreateWithoutOrderInput[] = []

    for (const item of items) {
      const product = await prisma.product.findUnique({
        where: { id: item.productId },
      })

      if (!product) {
        throw new Error(`Product with id ${item.productId} not found`)
      }

      if (item.quantity <= 0) {
        throw new Error(`Invalid quantity for product ${item.productId}`)
      }

      if (product.quantity < item.quantity) {
        throw new Error(`Insufficient stock for product ${item.productId}`)
      }

      const orderItem: Prisma.OrderItemCreateWithoutOrderInput = {
        quantity: item.quantity,
        name: product.name,
        price: product.price,
        product: { connect: { id: product.id } },
      }

      newOrderItems.push(orderItem)
      subtotal += item.quantity * Number(product.price)

      await prisma.product.update({
        where: { id: product.id },
        data: { quantity: { decrement: item.quantity } },
      })
    }

    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: {
        orderItems: {
          create: newOrderItems,
        },
        total: subtotal,
        staff: { connect: { id: userId } },
        customer: { connect: { id: customerId } },
      },
      include: {
        orderItems: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                price: true,
              },
            },
          },
        },
        customer: true,
        staff: true,
      },
    })

    const cloudinaryResponse = await generateInvoice(
      updatedOrder,
      updatedOrder.customer,
      updatedOrder.staff
    )

    const orderWithUpdatedInvoice = await prisma.order.update({
      where: { id: orderId },
      data: {
        invoiceUrl: cloudinaryResponse.secure_url,
      },
    })

    return orderWithUpdatedInvoice
  } catch (error) {
    console.error('Error updating order:', error)
    throw error
  }
}

export const deleteOrder = async (orderId: number) => {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { orderItems: true },
  })

  if (!order) {
    throw new CustomError.NotFoundError(`No order with id: ${orderId}`)
  }

  return await prisma.$transaction(async (prisma) => {
    await prisma.orderItem.deleteMany({
      where: { orderId: orderId },
    })

    await prisma.order.delete({
      where: { id: orderId },
    })

    for (const item of order.orderItems) {
      await prisma.product.update({
        where: { id: item.productId },
        data: { quantity: { increment: item.quantity } },
      })
    }

    return { message: `Order ${orderId} has been deleted successfully` }
  })
}
