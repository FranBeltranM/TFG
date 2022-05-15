import express from 'express'
import dotenv from 'dotenv'
import Registro from './classes/vehiculo.js'
import { createPool, deletePool, isPoolOpen } from './services/db.js'
import { chain } from 'underscore'
import {
  insertNewBrandModel,
  insertNewTechnicalData,
  insertNewVehicle,
  insertNewTransfer,
  getTransferDetails,
  getDataFromVIN,
  loadDataFromFile,
  getDateFromLastInsert
} from './services/index.js'

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
    ?.bastidor

  const debug = req
    .query
    ?.debug

  if (bastidor) {
    let results = await getDataFromVIN(bastidor)
    results = results.flat(Infinity)

    const obj = {
      vehicle: {},
      transfers: []
    }

    results
      .slice(0, results.length - 1)
      .forEach((value, key) => {
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
            firstProvince: value.provincia_mat
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
          City: value.municipio
        })
      })

    res.send(obj)
  } else {
    res.send({ Error: 'No ha facilitado un bastidor.' })
  }

  await deletePool()
})

// app.get('/buscarDetalleTransferencia', async (req, res) => {
//   createPool()
//   const transferDetailsUUID = req
//     .query
//     .transferDetails

//   const results = await getTransferDetails(transferDetailsUUID)
//   deletePool()

//   const {
//     ind_precinto,
//     ind_embargo,
//     localidad_vehiculo,
//     cod_provincia_mat,
//     cod_provincia_veh,
//     clave_tramite,
//     codigo_postal,
//     persona_fisica_juridica,
//     servicio_itv,
//     municipio,
//     renting,
//     ind_baja_def,
//     ind_baja_temp,
//     ind_sustraccion
//   } = results[0]

//   res.send(results)
// })

const insertar = async (file) => {
  console.log(`Fichero: ${file}`)
  createPool()
  let total = 0; let registryInserted = 0
  const data = await loadDataFromFile(`/Users/franciscojesusbeltranmoreno/dev/DGT-Files/export_mensual_trf_${file}.txt`)
  const output = []

  let arrayPromises = []
  let arrayResolves = []

  // Lectura de datos
  data.forEach(value => {
    if (value.length > 50) {
      const registro = new Registro(value)
      if (codigosAceptados.includes(registro.getCodigoTipo)) { output.push(registro) }
    } else {
      console.log(`Fichero ${file} leído completamente.`)
      console.log([{ 'Fichero completo': 'Línea vacía.' }])
    }
  })

  // Configuración BBDD
  // const out = []
  const chunkSize = 250
  const totalIterations = output.length

  console.log({ filter: totalIterations, raw: data.length })

  const uniqueBrandModel = Object
    .values(
      chain(output)
        .indexBy(function (value) { return [value.marca_itv, value.modelo_itv] })
        ._wrapped
    )

  console.log('Insertando Marcas y Modelos.')

  for (let i = 0; i < uniqueBrandModel.length; i += chunkSize) {
    const chunk = uniqueBrandModel.slice(i, i + chunkSize)

    chunk.forEach(value => {
      // arrayPromises.push(insertNewBrandModel([value.marca_itv, value.modelo_itv]))
      arrayPromises.push(insertNewBrandModel([value.marca_itv, value.modelo_itv]))
    })

    // Resolución de promesas
    arrayResolves = await Promise.all(arrayPromises)

    // Flat arrays
    arrayResolves = arrayResolves.flat(Infinity)

    registryInserted += arrayResolves.filter(r => r.affectedRows > 0).length
    total += chunkSize

    // console.clear()
    // console.log('Insertando Marcas y Modelos')
    // console.log(`Total: ${total}/${uniqueBrandModel.length} | Registros Insertados: ${registryInserted}`)

    arrayPromises = []
    arrayResolves = []
  }

  console.log(`Total: ${total}/${uniqueBrandModel.length} | Registros Insertados: ${registryInserted}`)

  total = 0
  registryInserted = 0

  const uniqueTechnicalData = Object
    .values(
      chain(output)
        .indexBy(function (value) { return value.getMascara })
        ._wrapped
    )

  console.log('Insertando Datos Técnicos')

  for (let i = 0; i < uniqueTechnicalData.length; i += chunkSize) {
    const chunk = uniqueTechnicalData.slice(i, i + chunkSize)

    chunk.forEach(value => {
      arrayPromises.push(insertNewTechnicalData(value.getDatosTecnicos))
    })

    // Resolución de promesas
    arrayResolves = await Promise.all(arrayPromises)

    // Flat arrays
    arrayResolves = arrayResolves.flat(Infinity)

    registryInserted += arrayResolves.filter(r => r.affectedRows > 0).length
    total += chunkSize

    // console.clear()
    // console.log('Insertando Datos Técnicos')
    // console.log(`Total: ${total}/${uniqueTechnicalData.length} | Registros Insertados: ${registryInserted}`)

    arrayPromises = []
    arrayResolves = []
  }

  console.log(`Total: ${total}/${uniqueTechnicalData.length} | Registros Insertados: ${registryInserted}`)
  total = 0
  registryInserted = 0

  const uniqueVehicleData = Object
    .values(
      chain(output)
        .indexBy(function (value) { return [value.bastidor_itv, value.cod_clase_mat, value.fecha_prim_matriculacion, value.fecha_matricula] })
        ._wrapped
    )

  console.log('Insertando Vehículos')

  for (let i = 0; i < uniqueVehicleData.length; i += chunkSize) {
    const chunk = uniqueVehicleData.slice(i, i + chunkSize)

    chunk.forEach(value => {
      arrayPromises.push(insertNewVehicle(value.getDatosInsertVehicle))
    })

    // Resolución de promesas
    arrayResolves = await Promise.all(arrayPromises)

    // Flat arrays
    arrayResolves = arrayResolves.flat(Infinity)

    registryInserted += arrayResolves.filter(r => r.affectedRows > 0).length
    total += chunkSize

    // console.clear()
    // console.log('Insertando Vehículos')
    // console.log(`Total: ${total}/${uniqueVehicleData.length} | Registros Insertados: ${registryInserted}`)

    arrayPromises = []
    arrayResolves = []
  }

  console.log(`Total: ${total}/${uniqueVehicleData.length} | Registros Insertados: ${registryInserted}`)
  console.log('Insertando Transferencias')

  total = 0
  registryInserted = 0

  for (let i = 0; i < output.length; i += chunkSize) {
    const chunk = output.slice(i, i + chunkSize)

    chunk.forEach(value => {
      arrayPromises.push(insertNewTransfer(value.getDatosInsertTransfer))
    })

    // Resolución de promesas
    arrayResolves = await Promise.all(arrayPromises)

    // Flat arrays
    arrayResolves = arrayResolves.flat(Infinity)

    registryInserted += arrayResolves.filter(r => r.affectedRows > 0).length
    total += chunkSize

    // console.clear()
    // console.log('Insertando Transferencias')
    // console.log(`Total: ${total}/${output.length} | Registros Insertados: ${registryInserted}`)

    arrayPromises = []
    arrayResolves = []
  }

  console.log(`Total: ${total}/${output.length} | Registros Insertados: ${registryInserted}`)
  deletePool()
}

app.get('/insertarDatosOFF', async (req, res) => {
  // const { year, month } = req.query
  // await insertar(`${year}${month}`)
  // await insertar(`${year}02`)
  // await insertar(`${year}03`)
  // await insertar(`${year}04`)
  // await insertar(`${year}05`)
  // await insertar(`${year}06`)
  // await insertar(`${year}07`)
  // await insertar(`${year}08`)
  // await insertar(`${year}09`)
  // await insertar(`${year}10`)
  // await insertar(`${year}11`)
  // await insertar(`${year}12`)

  res.send('<h1>Este servicio está desactivado.</h1>')
})

app.get('/insertarDatos', async (req, res) => {
  const file = req.query.fichero
  const debug = req.query?.debug

  createPool()
  let total = 0; let registryInserted = 0
  const data = await loadDataFromFile(`/Users/franciscojesusbeltranmoreno/dev/DGT-Files/export_mensual_trf_${file}.txt`)
  const output = []

  let arrayPromises = []
  let arrayResolves = []

  // Lectura de datos
  data.forEach(value => {
    if (value.length > 50) {
      const registro = new Registro(value)
      if (codigosAceptados.includes(registro.getCodigoTipo)) { output.push(registro) }
    } else {
      res.write(`Fichero ${file} leído completamente.</h1>`)
      console.log([{ 'Fichero completo': 'Línea vacía.' }])
    }
  })

  // Configuración BBDD
  const chunkSize = 250
  const totalIterations = output.length

  console.log({ filter: totalIterations, raw: data.length })

  const uniqueBrandModel = Object
    .values(
      chain(output)
        .indexBy(function (value) { return [value.marca_itv, value.modelo_itv] })
        ._wrapped
    )

  res.write('<p>Insertando Marcas y Modelos.</p>')

  for (let i = 0; i < uniqueBrandModel.length; i += chunkSize) {
    const chunk = uniqueBrandModel.slice(i, i + chunkSize)

    chunk.forEach(value => {
      arrayPromises.push(insertNewBrandModel([value.marca_itv, value.modelo_itv]))
    })

    // Resolución de promesas
    arrayResolves = await Promise.all(arrayPromises)

    // Flat arrays
    arrayResolves = arrayResolves.flat(Infinity)

    registryInserted += arrayResolves.filter(r => r.affectedRows > 0).length
    total += chunkSize

    if (debug) {
      console.clear()
      console.log('Insertando Marcas y Modelos')
      console.log(`Total: ${total}/${uniqueBrandModel.length} | Registros Insertados: ${registryInserted}`)
    }

    arrayPromises = []
    arrayResolves = []
  }

  res.write(`<p>Total: ${total}/${uniqueBrandModel.length} | Registros Insertados: ${registryInserted}</p>`)

  total = 0
  registryInserted = 0

  const uniqueTechnicalData = Object
    .values(
      chain(output)
        .indexBy(function (value) { return value.getMascara })
        ._wrapped
    )

  res.write('<p>Insertando Datos Técnicos</p>')

  for (let i = 0; i < uniqueTechnicalData.length; i += chunkSize) {
    const chunk = uniqueTechnicalData.slice(i, i + chunkSize)

    chunk.forEach(value => {
      arrayPromises.push(insertNewTechnicalData(value.getDatosTecnicos))
    })

    // Resolución de promesas
    arrayResolves = await Promise.all(arrayPromises)

    // Flat arrays
    arrayResolves = arrayResolves.flat(Infinity)

    registryInserted += arrayResolves.filter(r => r.affectedRows > 0).length
    total += chunkSize

    if (debug) {
      console.clear()
      console.log('Insertando Datos Técnicos')
      console.log(`Total: ${total}/${uniqueTechnicalData.length} | Registros Insertados: ${registryInserted}`)
    }

    arrayPromises = []
    arrayResolves = []
  }

  res.write(`<p>Total: ${total}/${uniqueTechnicalData.length} | Registros Insertados: ${registryInserted}</p>`)
  total = 0
  registryInserted = 0

  const uniqueVehicleData = Object
    .values(
      chain(output)
        .indexBy(function (value) { return [value.bastidor_itv, value.cod_clase_mat, value.fecha_prim_matriculacion, value.fecha_matricula] })
        ._wrapped
    )

  res.write('<p>Insertando Vehículos</p>')

  for (let i = 0; i < uniqueVehicleData.length; i += chunkSize) {
    const chunk = uniqueVehicleData.slice(i, i + chunkSize)

    chunk.forEach(value => {
      arrayPromises.push(insertNewVehicle(value.getDatosInsertVehicle))
    })

    // Resolución de promesas
    arrayResolves = await Promise.all(arrayPromises)

    // Flat arrays
    arrayResolves = arrayResolves.flat(Infinity)

    registryInserted += arrayResolves.filter(r => r.affectedRows > 0).length
    total += chunkSize

    if (debug) {
      console.clear()
      console.log('Insertando Vehículos')
      console.log(`Total: ${total}/${uniqueVehicleData.length} | Registros Insertados: ${registryInserted}`)
    }

    arrayPromises = []
    arrayResolves = []
  }

  res.write(`<p>Total: ${total}/${uniqueVehicleData.length} | Registros Insertados: ${registryInserted}</p>`)
  res.write('<p>Insertando Transferencias</p>')

  total = 0
  registryInserted = 0

  for (let i = 0; i < output.length; i += chunkSize) {
    const chunk = output.slice(i, i + chunkSize)

    chunk.forEach(value => {
      arrayPromises.push(insertNewTransfer(value.getDatosInsertTransfer))
    })

    // Resolución de promesas
    arrayResolves = await Promise.all(arrayPromises)

    // Flat arrays
    arrayResolves = arrayResolves.flat(Infinity)

    registryInserted += arrayResolves.filter(r => r.affectedRows > 0).length
    total += chunkSize

    if (debug) {
      console.clear()
      console.log('Insertando Transferencias')
      console.log(`Total: ${total}/${output.length} | Registros Insertados: ${registryInserted}`)
    }

    arrayPromises = []
    arrayResolves = []
  }

  res.write(`<p>Total: ${total}/${output.length} | Registros Insertados: ${registryInserted}</p>`)
  res.end()
  deletePool()
})

app.get('/fechaUltimaInsercion', async (req, res) => {
  createPool()
  const lastInsertDate = await getDateFromLastInsert()
  res.json({
    date: lastInsertDate[0].fecha
  })
  await deletePool()
})
