import { products, customers } from './data'
import prisma from '../src/models/index.models'

async function seed() {
  //   for (let staff of staffs) {
  //     await prisma.staff.create({
  //       data: staff,
  //     })
  //   }
  for (let product of products) {
    await prisma.product.create({
      data: product,
    })
  }
  for (let customer of customers) {
    await prisma.customer.create({
      data: customer,
    })
  }
}
seed()
  .catch((e) => {
    console.log(e)
    process.exit(1)
  })
  .finally(() => {
    prisma.$disconnect
  })
