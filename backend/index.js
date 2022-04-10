import express from 'express'
import dotenv from 'dotenv'
import Registro from './classes/vehiculo.js'
import {
  getDataFromVIN,
  getTechnicalDataUUID,
  getBrandModelUUID,
  insertNewVehicle,
  loadDataFromFile,
  insertNewTransfer,
  getTransferDetails
} from './services/index.js'
import { createPool, deletePool } from './services/db.js'

const codigosAceptados = ['20', '21', '22', '23', '24', '25', '40', '50', '51', '52', '53', '54', '60', '70', '90', '91', '92']

dotenv.config()
const app = express()
const PORT = process.env.PORT

app.listen(PORT || 3000, () => console.log(`[SERVER-LOG] Server listen on PORT => ${PORT || 3000}`))

app.get('/', (req, res) => {
  res
    .status(200)
    .send('Hola')
})

app.get('/buscar', async (req, res) => {
  createPool()
  const bastidor = req
    .query
    .bastidor

  let results = await getDataFromVIN(bastidor)
  results = results.flat(Infinity)

  deletePool()

  const obj = {
    vehicle: {},
    transfers: []
  }

  results
    .slice(0, results.length - 1)
    .forEach((value, key) => {
      console.log({ value })
      if (key === 0) {
        obj.vehicle = {
          brand: value.marca_itv,
          model: value.modelo_itv
        }
      }

      obj.transfers.push({
        plateType: value.cod_clase_mat,
        firstPlateDate: value.fecha_prim_matriculacion,
        plateDate: value.fecha_matricula,
        startTransferDate: value.fecha_tramite,
        endTransferDate: value.fecha_tramitacion,
        closeTransferDate: value.fecha_proceso,
        transferDetails: value.detalles_uuid
      })
    })

  res.send(obj)
})

app.get('/buscarDetalleTransferencia', async (req, res) => {
  createPool()
  const transferDetailsUUID = req
    .query
    .transferDetails

  const results = await getTransferDetails(transferDetailsUUID)
  deletePool()

  const {
    ind_precinto,
    ind_embargo,
    localidad_vehiculo,
    cod_provincia_mat,
    cod_provincia_veh,
    clave_tramite,
    codigo_postal,
    persona_fisica_juridica,
    servicio_itv,
    municipio,
    renting,
    ind_baja_def,
    ind_baja_temp,
    ind_sustraccion
  } = results[0]

  res.send(results)
})

app.get('/insertarDatos', async (req, res) => {
  let total = 0; let vehiclesInserted = 0; let transfersInserted = 0
  createPool()
  const data = await loadDataFromFile('../DGT-files/export_mensual_trf_202111.txt')
  const output = []

  // Creación de objeto tipo Registro
  data.forEach(value => {
    if (value.length > 50) {
      const registro = new Registro(value)
      if (codigosAceptados.includes(registro.getCodigoTipo)) { output.push(registro) }
    } else { console.table([{ 'Fichero completo': 'Línea vacía.' }]) }
  })

  let vehiclesBrandModelPromises = []
  let vehiclesTechnicalDataResolve = []

  let vehiclesTechnicalDataPromises = []
  let vehiclesBrandModelResolve = []

  let vehiclesNewInsertPromises = []
  let vehiclesNewInsertResolve = []

  let vehiclesNewTransferPromises = []
  let vehiclesNewTransferResolve = []

  // Configuración BBDD
  const out = []
  const chunkSize = 100
  const totalIterations = output.length

  console.log({ filter: totalIterations, raw: data.length })

  // Lecturas de BBDD
  for (let i = 0; i < totalIterations; i += chunkSize) {
    // console.log(i)
    const chunk = output.slice(i, i + chunkSize)

    // Guardado de promesas
    // Nos traemos los UUID de las marcas-modelos y los datos técnicos
    chunk.forEach(chunkElem => {
      vehiclesBrandModelPromises.push(getBrandModelUUID(chunkElem.getMarca, chunkElem.getModelo))
      vehiclesTechnicalDataPromises.push(getTechnicalDataUUID(chunkElem.getMascara))
    })

    // Resolución de promesas
    vehiclesBrandModelResolve = await Promise.all(vehiclesBrandModelPromises)
    vehiclesTechnicalDataResolve = await Promise.all(vehiclesTechnicalDataPromises)

    // Flat arrays
    vehiclesBrandModelResolve = vehiclesBrandModelResolve.flat(Infinity)
    vehiclesTechnicalDataResolve = vehiclesTechnicalDataResolve.flat(Infinity)

    // NOTE: Ahora procedemos a insertar el nuevo vehículo si procede
    for (let j = 0; j < chunk.length; j++) {
      const brandModelUUID = vehiclesBrandModelResolve[j]?.brand_model_uuid
      const vehicleDataUUID = vehiclesTechnicalDataResolve[j]?.technical_data_uuid
      const registro = chunk[j]

      // TODO: Insertar marcas-modelos que no existen
      // TODO: Insertar datos técnicos que no existen

      try {
        vehiclesNewInsertPromises.push(insertNewVehicle(brandModelUUID, vehicleDataUUID, registro.getBastidor,
          registro.cod_clase_mat, registro.fec_prim_matriculacion, registro.fec_matricula,
          registro.getFechaTramite, registro.getFechaTramitacion, registro.getFechaProceso))
      } catch (err) {
        console.log({ err, registro })
      }
    }

    vehiclesNewInsertResolve = await Promise.all(vehiclesNewInsertPromises)
    vehiclesNewInsertResolve = vehiclesNewInsertResolve.flat(Infinity)

    for (let j = 0; j < chunk.length; j++) {
      const datosTransferencia = chunk[j].getDatosTransferencia

      try {
        vehiclesNewTransferPromises.push(insertNewTransfer(datosTransferencia))
      } catch (err) {
        console.log(err)
      }

      out.push({
        vin: datosTransferencia.bastidor,
        vehicle_uuid: vehiclesBrandModelResolve[j]?.brand_model_uuid,
        vehicle_data_technical_uuid: vehiclesTechnicalDataResolve[j]?.technical_data_uuid,
        vehicle_transfer: datosTransferencia
      })
    }

    vehiclesNewTransferResolve = await Promise.all(vehiclesNewTransferPromises)
    vehiclesNewTransferResolve = vehiclesNewTransferResolve.flat(Infinity)

    // Contadores
    vehiclesInserted += vehiclesNewInsertResolve.filter(r => r.affectedRows > 0).length
    transfersInserted += vehiclesNewTransferResolve.filter(r => r.affectedRows > 0).length
    total += chunkSize

    console.clear()
    console.log(`Total: ${total}/${totalIterations} | Vehiculos Insertados: ${vehiclesInserted} | Transferencias Insertadas: ${transfersInserted}`)

    // NOTE: Limpieza de arrays
    vehiclesBrandModelPromises = []
    vehiclesBrandModelResolve = []

    vehiclesTechnicalDataPromises = []
    vehiclesTechnicalDataResolve = []

    vehiclesNewInsertPromises = []
    vehiclesNewInsertResolve = []

    vehiclesNewTransferPromises = []
    vehiclesNewTransferResolve = []
  }

  await deletePool()
  res.json(out)
})
