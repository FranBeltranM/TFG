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
  res.status(200).send('Hola')
})

router.get('/buscar', async (req, res) => {
  createPool()

  let bastidor = req.query?.bastidor
  const { plate } = req.query

  const debug = req.query?.debug

  if (plate) {
    bastidor = await getVinFromPlate(plate)
  }

  if (bastidor) {
    let results = await getDataFromVIN(bastidor)
    results = results.flat(Infinity)

    const obj = {
      vehicle: {},
      transfers: [],
    }

    results.slice(0, results.length - 1).forEach((value, key) => {
      if (debug) console.log({ value })

      if (key === 0) {
        obj.vehicle = {
          brand: value.marca_itv,
          model: value.modelo_itv,
          plateType: value.clase_matricula,
          vin: value.bastidor_itv,
          fuel: value.tipo_combustible,
          engineSize: value.cilindrada_itv,
          fiscalHP: value.potencia_itv,
          emissions: value.nivel_emisiones_euro_itv,
          firstProvince: value.provincia_mat,
        }
      }

      obj.transfers.push({
        plateType: value.cod_clase_mat,
        firstPlateDate: value.fecha_prim_matriculacion,
        plateDate: value.fecha_matricula,
        startTransferDate: value.fecha_tramite,
        writeTransferDate: value.fecha_proceso,
        endTransferDate: value.fecha_tramitacion,
        transferDetails: value.detalles_uuid,
        province: value.cod_provincia_veh,
        typeTransfer: value.tipo_tramite,
        zipCode: value.codigo_postal,
        person: value.persona_fisica_juridica,
        typeServiceVehicle: value.tipo_servicio,
        city: value.municipio,
      })
    })

    res.send(obj)
  } else {
    res.send({ Error: 'No ha facilitado un bastidor.' })
  }

  await deletePool()
})

// router.get('/insertarDatosOFF',
// })

router.get('/fechaUltimaInsercion', async (req, res) => {
  createPool()
  const lastInsertDate = await getDateFromLastInsert()
  res.json({
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
