import { Router } from 'express'
import * as staffController from '../controllers/staff.controller'
import {
  validateStaffInput,
  validateStaffIdParam,
} from '../middlewares/validation.middleware'

const router = Router()

router.post('/', validateStaffInput, staffController.createStaff)
router.get('/', staffController.getAllStaffs)
router.get('/:id', validateStaffIdParam, staffController.getStaffById)
router.patch('/:id', validateStaffIdParam, staffController.updateStaff)
router.delete('/:id', validateStaffIdParam, staffController.deleteStaff)

export default router
