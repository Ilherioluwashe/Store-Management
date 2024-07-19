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
  authorizedPermissions({ roles: ['Admin'] }),
  validateProductInput,
  productController.createProduct
)
router.patch(
  '/:id',
  authorizedPermissions({ roles: ['Admin'] }),
  validateProductIdParam,
  productController.updateProduct
)
router.delete(
  '/:id',
  authorizedPermissions({ roles: ['Admin'] }),
  validateProductIdParam,
  productController.deleteProduct
)

export default router
