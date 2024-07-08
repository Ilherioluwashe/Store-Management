import * as dotenv from 'dotenv'
import express, { Request, Response } from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'

dotenv.config()
const app = express()

import productsRoutes from './routes/product.routes'
import customerRoutes from './routes/customer.routes'
import staffRoutes from './routes/staff.routes'
import authRoutes from './routes/auth.routes'
import errorHandlerMiddleware from './middlewares/error-handler.middleware'
import {
  authenticateUser,
  authorizedPermissions,
} from './middlewares/auth.middleware'

app.use(express.json())
app.use(cookieParser())
app.use(morgan('dev'))

app.get('/', (req: Request, res: Response) => {
  res.send('hello')
})
app.use('/api/v1/products', authenticateUser, productsRoutes)
app.use('/api/v1/customers', authenticateUser, customerRoutes)
app.use('/api/v1/staffs', authenticateUser, staffRoutes)
app.use('/api/v1/auth', authRoutes)

app.use(errorHandlerMiddleware)

const port: number = parseInt(process.env.PORT as string) || 3000

app.listen(port, () => {
  console.log(`app is listening on port ${port}`)
})
