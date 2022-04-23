import { promises as fs } from 'fs'
import { query } from './db'

// https://blog.logrocket.com/build-rest-api-node-express-mysql/

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
