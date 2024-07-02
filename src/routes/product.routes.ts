import { Router } from 'express'
import * as productController from '../controllers/product.controller'
import { validateProductInput } from '../middlewares/validation.midleware'

const router = Router()

router.get('/', productController.getAllProducts)
router.get('/:id', productController.getProductById)
router.post('/', validateProductInput, productController.createProduct)
router.patch('/:id', productController.updateProduct)
router.delete('/:id', productController.deleteProduct)

export default router
