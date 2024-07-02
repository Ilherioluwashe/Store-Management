import * as dotenv from 'dotenv'
import express, { Request, Response } from 'express'
import morgan from 'morgan'

dotenv.config()
const app = express()

import productsRoutes from './routes/product.routes'
import customerRoutes from './routes/customer.routes'
import errorHandlerMiddleware from './middlewares/error-handler.middleware'

app.use(express.json())
app.use(morgan('dev'))

app.get('/', (req: Request, res: Response) => {
  res.send('hello')
})
app.use('/api/v1/products', productsRoutes)
app.use('/api/v1/customers', customerRoutes)

app.use(errorHandlerMiddleware)

const port: number = parseInt(process.env.PORT as string) || 3000

app.listen(port, () => {
  console.log(`app is listening on port ${port}`)
})
