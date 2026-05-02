import express from 'express'
import cors from 'cors'
import validateRoutes from './routes/validate.route'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api', validateRoutes)

export default app
