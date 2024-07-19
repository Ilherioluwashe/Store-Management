import { Customer, Prisma, Staff } from '@prisma/client'

export interface CreateOrderReq {
  customerId: number
  items: Array<OrderItemReq>
  // user: any

  staffId: number
}

export interface OrderItemReq {
  productId: number
  quantity: number
}

export interface OrderItem {
  id: number
  name: string
  price: Prisma.Decimal
  quantity: number
  productId: number
  orderId: number
}
