import { Router } from 'express'
import * as productController from '../controllers/product.controller'
import {
  validateProductIdParam,
  validateProductInput,
} from '../middlewares/validation.middleware'

const router = Router()

router.get('/', productController.getAllProducts)
router.get('/:id', validateProductIdParam, productController.getProductById)
router.post('/', validateProductInput, productController.createProduct)
router.patch('/:id', validateProductIdParam, productController.updateProduct)
router.delete('/:id', validateProductIdParam, productController.deleteProduct)

export default router
