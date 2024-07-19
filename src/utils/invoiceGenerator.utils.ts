import PDFDocument from 'pdfkit'
import cloudinary from 'cloudinary'
import streamifier from 'streamifier'
import { Staff } from '../dtos/staff.interface'
import { OrderItem } from '../dtos/order.interface'
import { Prisma } from '@prisma/client'
import { Customer } from '../dtos/customer.interface'

interface Order {
  id: number
  createdAt: Date
  orderItems: OrderItem[]
  total: Prisma.Decimal
  customer: Customer
  staff: Staff
}

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
})

const addInvoiceContent = (
  doc: PDFKit.PDFDocument,
  order: Order,
  customer: Customer,
  staff: Staff
) => {
  doc.fontSize(20).text('Invoice', 50, 50)

  doc
    .fontSize(10)
    .text(`Invoice Number: ${order.id}`, 50, 100)
    .text(`Date: ${order.createdAt.toLocaleDateString()}`, 50, 115)
    .text(`Customer: ${customer.name}`, 50, 130)
    .text(`Address: ${customer.address}`, 50, 145)
    .text(`Address: ${customer.phoneNumber}`, 50, 160)
    .text(`Address: ${customer.email}`, 50, 175)
    .text(`Staff: ${staff.name}`, 50, 190)

  doc
    .fontSize(10)
    .text('Item', 50, 230)
    .text('Quantity', 200, 230)
    .text('Unit Price', 280, 230)
    .text('Amount', 350, 230)

  let y = 250
  order.orderItems.forEach((item: OrderItem) => {
    const price = parseFloat(item.price.toString())
    doc
      .fontSize(10)
      .text(item.name, 50, y)
      .text(item.quantity.toString(), 200, y)
      .text(`$${item.price.toFixed(2)}`, 280, y)
      .text(`$${(item.quantity * price).toFixed(2)}`, 350, y)
    y += 20
  })

  doc
    .fontSize(10)
    .text('Total:', 280, y + 20)
    .text(`$${order.total.toFixed(2)}`, 350, y + 20)
}

export const generateInvoice = async (
  order: Order,
  customer: Customer,
  staff: Staff
): Promise<cloudinary.UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 50 })

    doc.info = {
      Title: `Invoice for Order ${order.id}`,
      Author: 'Your Company Name',
      Subject: 'Invoice',
      Keywords: 'invoice, order',
      CreationDate: new Date(),
    }

    const chunks: Buffer[] = []
    doc.on('data', (chunk) => chunks.push(chunk))
    doc.on('end', () => {
      const pdfBuffer = Buffer.concat(chunks)
      uploadToCloudinary(pdfBuffer, order.id).then(resolve).catch(reject)
    })

    addInvoiceContent(doc, order, customer, staff)

    doc.end()
  })
}

export const uploadToCloudinary = (
  buffer: Buffer,
  orderId: number
): Promise<cloudinary.UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.v2.uploader.upload_stream(
      {
        folder: 'invoices',
        public_id: `invoice-${orderId}`,
        resource_type: 'raw',
        format: 'pdf',
        type: 'upload',
        access_mode: 'public',
      },
      (error, result) => {
        if (error) reject(error)
        else resolve(result as cloudinary.UploadApiResponse)
      }
    )

    streamifier.createReadStream(buffer).pipe(uploadStream)
  })
}
