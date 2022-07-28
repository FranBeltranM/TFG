import { workerData, parentPort } from 'worker_threads'
import {
  createPool,
  deletePool,
  getVinFromPlate,
  getDataFromVIN,
} from '../services/db'

try {
  createPool()
  let { plate, bastidor, debug } = workerData

  if (plate) {
    getVinFromPlate(plate)
      .catch(err => {
        throw err
      })
      .then(vin => {
        bastidor = vin
      })
  }

  if (bastidor) {
    let results

    getDataFromVIN(bastidor)
      .catch(err => {
        throw err
      })
      .then(res => (results = res))

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

    parentPort.postMessage({ status: 'Done', data: obj })
  } else {
    parentPort.postMessage({
      status: 'Done',
      data: 'No ha facilitado un bastidor.',
    })

    // res.send({ Error: 'No ha facilitado un bastidor.' })
  }

  deletePool().then(e => e)
} catch (err) {
  console.log(`ERROR -> ${err}`)
} finally {
  deletePool().then(e => e)
}
