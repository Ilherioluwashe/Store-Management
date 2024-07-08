import { Router } from 'express'
import * as staffController from '../controllers/staff.controller'
import {
  validateStaffInput,
  validateStaffIdParam,
} from '../middlewares/validation.middleware'
import { authorizedPermissions } from '../middlewares/auth.middleware'

const router = Router()

router.post(
  '/',
  authorizedPermissions('Admin'),
  validateStaffInput,
  staffController.createStaff
)
router.get('/', authorizedPermissions('Admin'), staffController.getAllStaffs)
router.get('/:id', validateStaffIdParam, staffController.getStaffById)
router.patch('/:id', validateStaffIdParam, staffController.updateStaff)
router.delete('/:id', validateStaffIdParam, staffController.deleteStaff)

export default router
