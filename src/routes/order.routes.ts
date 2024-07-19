import { Router } from 'express'
import * as orderController from '../controllers/order.controller'
import { validateOrderInput } from '../middlewares/validation.middleware'
import {
  authenticateUser,
  authorizedPermissions,
} from '../middlewares/auth.middleware'

const router = Router()

router.post(
  '/',
  authenticateUser,
  validateOrderInput,
  orderController.createOrder
)
router.get(
  '/',
  authenticateUser,
  authorizedPermissions({ roles: ['Admin'] }),
  orderController.getAllOrders
)
router.get('/:id', authenticateUser, orderController.getOrderById)
router.patch(
  '/:id',
  authenticateUser,
  validateOrderInput,
  orderController.updateOrder
)
router.delete(
  '/:id',
  authenticateUser,
  authorizedPermissions({ roles: ['Admin'] }),
  orderController.deleteOrder
)

export default router
