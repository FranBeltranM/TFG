import express from 'express'
import cluster from 'cluster'
import os from 'os'
import dotenv from 'dotenv'
import { router } from './src/routes/index.js'
import { insertar } from './src/services/index.js'

const numCPUs = os.cpus().length

dotenv.config()
const app = express()
const PORT = process.env.PORT
const isInsertionActivated = true

if (cluster.isPrimary) {
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork()
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`)
  })
} else {
  app
    .listen(PORT || 3000, () =>
      console.log(`[SERVER-LOG] Server listen on PORT => ${PORT || 3000}`)
    )
    .setTimeout(0)

  app.get('/', router)
  app.get('/buscar', router)
  app.get('/buscarDetalleTransferencia', router)

  app.get('/insertarDatosOFF', async (req, res) => {
    if (isInsertionActivated) {
      const { year, month } = req.query
      await insertar(`${year}${month}`)
    } else {
      res.send('<h1>Este servicio está desactivado.</h1>')
    }
  })

  app.get('/fechaUltimaInsercion', router)
  app.get('/getVinFromPlate', router)
}
