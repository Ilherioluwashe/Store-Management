import { Router } from 'express'
import * as productController from '../controllers/product.controller'
import {
  validateProductIdParam,
  validateProductInput,
} from '../middlewares/validation.middleware'
import { authorizedPermissions } from '../middlewares/auth.middleware'

const router = Router()

router.get('/', productController.getAllProducts)
router.get('/:id', validateProductIdParam, productController.getProductById)
router.post(
  '/',
  authorizedPermissions('Admin'),
  validateProductInput,
  productController.createProduct
)
router.patch(
  '/:id',
  authorizedPermissions('Admin'),
  validateProductIdParam,
  productController.updateProduct
)
router.delete(
  '/:id',
  authorizedPermissions('Admin'),
  validateProductIdParam,
  productController.deleteProduct
)

export default router
