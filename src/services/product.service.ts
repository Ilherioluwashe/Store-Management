import { Request } from 'express'
import prisma from '../models/index.models'
import { Product } from '@prisma/client'

export const getAllProducts = async () => {
  return await prisma.product.findMany()
}

export const getProductById = async (id: number): Promise<Product | null> => {
  const product = await prisma.product.findUnique({ where: { id } })
  return product
}

export const createProduct = async (req: Request) => {
  const { name, description, price, quantity, inStock } = req.body

  const product = await prisma.product.create({
    data: {
      name,
      description,
      price: parseFloat(price),
      quantity: parseInt(quantity, 10),
      inStock,
    },
  })

  return product
}

interface UpdateProductData {
  name?: string
  price?: number
  description?: string
  quantity?: number
  inStock?: boolean
}

export const updateProduct = async (
  id: number,
  data: UpdateProductData
): Promise<Product | null> => {
  const updatedProduct = await prisma.product.update({
    where: { id },
    data,
  })
  return updatedProduct
}

export const deleteProduct = async (id: number): Promise<Product | null> => {
  const deletedProduct = await prisma.product.delete({
    where: { id },
  })
  return deletedProduct
}
