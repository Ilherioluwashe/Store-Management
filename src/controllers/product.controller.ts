import { Request, Response } from 'express'
import * as productService from '../services/product.service'
import { StatusCodes } from 'http-status-codes'

export const getAllProducts = async (req: Request, res: Response) => {
  const products = await productService.getAllProducts()
  res.status(StatusCodes.OK).json(products)
}

export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const product = await productService.getProductById(Number(id))
    if (product) {
      res.status(StatusCodes.OK).json(product)
    }
  } catch (error) {
    return
  }
}

export const createProduct = async (req: Request, res: Response) => {
  try {
    const newProduct = await productService.createProduct(req)
    res.status(StatusCodes.CREATED).json(newProduct)
  } catch (error) {
    return
  }
}
// export const createProduct = async (req: Request, res: Response) => {
//   try {
//     const newProduct = await productService.createProduct(req)
//     res.status(StatusCodes.CREATED).json(newProduct)
//   } catch (error) {
//     return res.status(StatusCodes.BAD_REQUEST).json('All fields are required')
//   }
// }

export const updateProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params
  const data = req.body

  try {
    const updatedProduct = await productService.updateProduct(Number(id), data)
    if (updatedProduct) {
      res.status(StatusCodes.OK).json(updatedProduct)
    }
  } catch (error) {
    return
  }
}

export const deleteProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params

  try {
    const deletedProduct = await productService.deleteProduct(Number(id))
    if (deletedProduct) {
      res.status(StatusCodes.OK).json({
        message: 'Product deleted successfully',
        product: deletedProduct,
      })
    }
  } catch (error) {
    return
  }
}
