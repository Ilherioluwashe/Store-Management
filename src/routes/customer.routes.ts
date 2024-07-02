import { Router } from 'express'
import * as customerController from '../controllers/customer.controller'
import {
  validateCustomerInput,
  validateCustomerIdParam,
} from '../middlewares/validation.middleware'

const router = Router()

router.post('/', validateCustomerInput, customerController.createCustomer)
router.get('/', customerController.getAllCustomers)
router.get('/:id', validateCustomerIdParam, customerController.getCustomerById)
router.patch('/:id', validateCustomerIdParam, customerController.updateCustomer)
router.delete(
  '/:id',
  validateCustomerIdParam,
  customerController.deleteCustomer
)

export default router
