import express from 'express'
import dotenv from 'dotenv'
import { router } from './routes/index.js'

dotenv.config()
const app = express()
const PORT = process.env.PORT

app.listen(PORT || 3000, () => console.log(`[SERVER-LOG] Server listen on PORT => ${PORT || 3000}`))

app.get('/', router)
app.get('/buscar', router)
app.get('/buscarDetalleTransferencia', router)
app.get('/insertarDatosOFF', router)
app.get('/fechaUltimaInsercion', router)
