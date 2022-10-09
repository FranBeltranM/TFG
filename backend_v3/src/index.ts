import express from 'express'
import dotenv from 'dotenv'
import resource from './routes/resource'
import transfer from './routes/transfer'
import vehicle from './routes/vehicle'
import index from './routes/index'
import { initializeDB } from './database/db'
import { log } from './utils/functions'

dotenv.config()
const app = express()
const PORT = process.env.PORT || 3000
app.use(express.json())

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, async () => {
    log('INFO', `🚀 Server running on port ${PORT}`)

    const pool = await initializeDB()
    pool !== null && log('INFO', `Connected to database succesfully`)
  })
}

process.env.NODE_ENV === 'test' && (await initializeDB())

app.use('/api', index)
app.use('/api/vehicles', vehicle)
app.use('/api/transfers', transfer)
app.use('/api/resources', resource)

export { app }
