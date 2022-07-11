import { promises as fs } from 'fs'
import { query, createPool, deletePool } from './db'
import Registro from '../classes/vehiculo.js'
import { chain } from 'underscore'

// https://blog.logrocket.com/build-rest-api-node-express-mysql/

const codigosAceptados = ['20', '21', '22', '23', '24', '25', '40', '50', '51', '52', '53', '54', '60', '70', '90', '91', '92']

export const loadDataFromFile = async (file) => {
  const data = await fs.readFile(file, 'latin1')
  return data.split('\n')
}

export const checkVinIsRegistered = async (vin) => {
  const sqlQuery = `SELECT *
                    FROM dev.registro
                    WHERE bastidor_itv = '${vin}'`
  const data = query(sqlQuery)

  return data
}

export const getDataFromVIN = async (vin) => {
  const sqlQuery = 'call getDatosBastidor(?)'
  const data = query(sqlQuery, [vin])

  return data
}

export const getNumberOfTransferFromVIN = async (vin) => {
  const sqlQuery = `SELECT COUNT(*) as Total
                    FROM registro
                    WHERE bastidor_itv = '${vin}'`
  const data = query(sqlQuery)

  return data
}

// export const getBrandModelUUID = async (brand, model) => {
//   const sqlQuery = `SELECT BIN_TO_UUID(id,1) as brand_model_uuid
//                     FROM dev5.MarcaModelo
//                     WHERE marca_itv = ? AND modelo_itv = ?`
//   const data = query(sqlQuery, [brand, model])

//   return data
// }

// export const getTechnicalDataUUID = async (mask) => {
//   const sqlQuery = `SELECT BIN_TO_UUID(id,1) as technical_data_uuid
//                     FROM dev5.DatosTecnicos
//                     WHERE mascara = ?`
//   const data = query(sqlQuery, [mask])

//   return data
// }

export const getModelsFromBrand = async (brand) => {
  const sqlQuery = `SELECT id, marca_itv, modelo_itv
                    FROM dev5.MarcaModelo
                    WHERE marca_itv = '${brand}'`
  const data = query(sqlQuery)

  return data
}

// export const insertNewVehicle = async (vehicleUUID, vehicleDataUUID, vin, plateCode, firstMatriculationDate, matriculationDate) => {
//   const sqlQuery = 'call dev5.insertarVehiculo(?, ?, ?, ?, ?, ?)'
//   const data = query(sqlQuery, [vehicleUUID, vehicleDataUUID, vin, plateCode, firstMatriculationDate, matriculationDate])

//   return data
// }

export const insertNewTransfer = async (transferData) => {
  const sqlQuery = 'call dev5.insertarTransferencia(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
  const data = query(sqlQuery, transferData)

  return data
}

export const getTransferDetails = async (transferDetailUUID) => {
  const sqlQuery = `SELECT *
                    FROM TransferenciaDetalle
                    WHERE BIN_TO_UUID(id, 1) = ?`
  const data = query(sqlQuery, [transferDetailUUID])

  return data
}

export const insertNewVehicle = async (dataVehicleArray) => {
  const sqlQuery = 'call dev5.insertarVehiculo(?, ?, ?, ?, ?, ?, ?)'
  const data = query(sqlQuery, dataVehicleArray)

  return data
}

export const insertNewBrandModel = async (dataBrandModel) => {
  const sqlQuery = 'call dev5.insertarMarcaModelo(?, ?)'
  const data = query(sqlQuery, dataBrandModel)

  return data
}

export const insertNewTechnicalData = async (dataTechnical) => {
  const sqlQuery = 'call dev5.insertarDatosTecnicos(?, ?, ?, ?, ?, ?, ?)'
  const data = query(sqlQuery, dataTechnical)

  return data
}

export const getDateFromLastInsert = async () => {
  const sqlQuery = `SELECT fecha_proceso as fecha
                    FROM Transferencia
                    ORDER BY id DESC
                    LIMIT 1`
  const data = query(sqlQuery)

  return data
}

export const insertar = async (file) => {
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
