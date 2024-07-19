import { Request } from 'express'
import prisma from '../models/index.models'
import { Staff } from '@prisma/client'
import { hashPassword } from '../utils/password.utils'
import { UpdateStaffData } from '../dtos/staff.interface'

export const createStaff = async (req: Request) => {
  const { name, email, password, role } = req.body
  const hashedPassword = await hashPassword(password)
  const staffCount = await prisma.staff.count()
  const staff = await prisma.staff.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: staffCount === 0 ? 'Admin' : 'User',
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      updatedAt: true,
      createdAt: true,
    },
  })
  return staff
}
export const getAllStaffs = async () => {
  return await prisma.staff.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      updatedAt: true,
      createdAt: true,
    },
  })
}

export const getStaffById = async (id: number): Promise<Staff | null> => {
  const staff = await prisma.staff.findUnique({ where: { id } })
  return staff
}

export const updateStaff = async (
  id: number,
  data: UpdateStaffData
): Promise<Staff | null> => {
  const updatedStaff = await prisma.staff.update({
    where: { id },
    data,
  })
  return updatedStaff
}

export const deleteStaff = async (id: number): Promise<Staff | null> => {
  const deletedStaff = await prisma.staff.delete({
    where: { id },
  })
  return deletedStaff
}
