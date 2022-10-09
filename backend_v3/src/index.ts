import express from 'express'
import dotenv from 'dotenv'
import resource from './routes/resource'
import transfers from './routes/transfers'
import vehicle from './routes/vehicle'
import index from './routes/index'
import { initializeDB } from './controllers/db.controller'
import { log } from './utils/functions'

dotenv.config()
const app = express()
const PORT = process.env.PORT || 3000
app.use(express.json())

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, async () => {
    log('INFO', `Server running on port ${PORT}`)

    const pool = await initializeDB()
    pool !== null && log('INFO', `Connected to database succesfully`)
  })
}

process.env.NODE_ENV === 'test' && (await initializeDB())

app.use('/api', index)
app.use('/api/vehicle', vehicle)
app.use('/api/transfers', transfers)
app.use('/api/resources', resource)

export { app }
