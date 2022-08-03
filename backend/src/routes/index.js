import express from 'express'
import { createPool, deletePool } from '../services/db.js'
import {
  getDataFromVIN,
  getDateFromLastInsert,
  getTransferDetails,
} from '../services/index.js'
import { getVinFromPlate } from '../services/NorautoScrapper.js'

const router = express.Router()
// const isInsertionActivated = true

router.get('/', (req, res) => {
  res.status(200).send('<h1>Hola</h1>')
})

router.get('/buscar', async (req, res) => {
  const { plate, debug } = req.query
  let { bastidor } = req.query

  bastidor = plate ? await getVinFromPlate(plate) : bastidor

  bastidor
    ? res.send(await getDataFromVIN(bastidor, debug))
    : res.send({ Error: 'No ha facilitado un bastidor.' })
})

// router.get('/insertarDatosOFF',
// })

router.get('/fechaUltimaInsercion', async (req, res) => {
  createPool()
  const lastInsertDate = await getDateFromLastInsert()
  res.send({
    date: lastInsertDate[0].fecha,
  })
  await deletePool()
})

router.get('/buscarDetalleTransferencia', async (req, res) => {
  createPool()
  const transferDetailsUUID = req.query.transferDetails

  const results = await getTransferDetails(transferDetailsUUID)

  // const {
  //   ind_precinto,
  //   ind_embargo,
  //   localidad_vehiculo,
  //   cod_provincia_mat,
  //   cod_provincia_veh,
  //   clave_tramite,
  //   codigo_postal,
  //   persona_fisica_juridica,
  //   servicio_itv,
  //   municipio,
  //   renting,
  //   ind_baja_def,
  //   ind_baja_temp,
  //   ind_sustraccion
  // } = results[0]

  res.send(results)
  await deletePool()
})

router.get('/getVinFromPlate', async (req, res) => {
  const { plate } = req.query

  res.send(await getVinFromPlate(plate))
})

export { router }
