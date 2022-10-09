import express from 'express'
import dotenv from 'dotenv'
import apicache from 'apicache'

import v1ResourceRouter from './v1/routes/resource'
import v1TransferRouter from './v1/routes/transfer'
import v1VehicleRouter from './v1/routes/vehicle'
import v1IndexRouter from './v1/routes/index'
import { swaggerDocs as V1SwaggerDocs } from './v1/swagger'

import { initializeDB } from './database/db'
import { log } from './utils/functions'

dotenv.config()
const app = express()
const PORT = Number(process.env.PORT) || 3000
const cache = apicache.middleware

app.use(express.json())
app.use(cache('1 minutes'))

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, async () => {
    log('INFO', `🚀 Server running on port ${PORT}`)

    const pool = await initializeDB()
    pool !== null && log('INFO', `Connected to database succesfully`)

    V1SwaggerDocs(app, PORT)
  })
}

if (process.env.NODE_ENV === 'test') {
  const pool = async () => {
    const pool = await initializeDB()
    return pool
  }

  pool()
}

app.use('/api/v1', v1IndexRouter)
app.use('/api/v1/vehicles', v1VehicleRouter)
app.use('/api/v1/transfers', v1TransferRouter)
app.use('/api/v1/resources', v1ResourceRouter)

export { app }
