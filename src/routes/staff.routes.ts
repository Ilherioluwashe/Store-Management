import { Router } from 'express'
import * as staffController from '../controllers/staff.controller'
import {
  validateStaffInput,
  validateStaffIdParam,
} from '../middlewares/validation.middleware'
import {
  authenticateUser,
  authorizedPermissions,
} from '../middlewares/auth.middleware'
import { checkStaffExistence } from '../middlewares/checkStaffExistence.utils'

const router = Router()

router.post(
  '/',
  checkStaffExistence,
  authorizedPermissions({ roles: ['Admin'] }),
  validateStaffInput,
  staffController.createStaff
)
router.get(
  '/',
  authenticateUser,
  authorizedPermissions({ roles: ['Admin'] }),
  staffController.getAllStaffs
)
router.get(
  '/:id',
  authenticateUser,
  authorizedPermissions({ roles: ['Admin'], allowSameUser: true }),
  validateStaffIdParam,
  staffController.getStaffById
)
router.patch(
  '/:id',
  authenticateUser,
  authorizedPermissions({ allowSameUser: true }),
  validateStaffIdParam,
  staffController.updateStaff
)
router.delete(
  '/:id',
  authenticateUser,
  authorizedPermissions({ roles: ['Admin'] }),
  validateStaffIdParam,
  staffController.deleteStaff
)

export default router
