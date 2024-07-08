import { Request, Response } from 'express'
import * as staffService from '../services/staff.service'
import { StatusCodes } from 'http-status-codes'

export const createStaff = async (req: Request, res: Response) => {
  try {
    const newStaff = await staffService.createStaff(req)
    res.status(StatusCodes.CREATED).json(newStaff)
  } catch (error) {
    return
  }
}

export const getAllStaffs = async (req: Request, res: Response) => {
  console.log()

  const staffs = await staffService.getAllStaffs()
  res.status(StatusCodes.OK).json(staffs)
}
export const getStaffById = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const staff = await staffService.getStaffById(Number(id))
    if (staff) {
      const { password, ...StaffWithoutPassword } = staff
      res.status(StatusCodes.OK).json(StaffWithoutPassword)
    }
  } catch (error) {
    return
  }
}

export const updateStaff = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params
  const data = req.body
  try {
    const updatedStaff = await staffService.updateStaff(Number(id), data)
    if (updatedStaff) {
      const { password, ...StaffWithoutPassword } = updatedStaff
      res.status(StatusCodes.OK).json(StaffWithoutPassword)
    }
  } catch (error) {
    return
  }
}

export const deleteStaff = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params
  try {
    const deletedStaff = await staffService.deleteStaff(Number(id))
    if (deletedStaff) {
      const { password, ...StaffWithoutPassword } = deletedStaff
      res.status(StatusCodes.OK).json({
        message: 'Staff deleted successfully',
        staff: StaffWithoutPassword,
      })
    }
  } catch (error) {
    return
  }
}
