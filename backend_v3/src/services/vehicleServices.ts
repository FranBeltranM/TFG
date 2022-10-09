import * as vehicle from '../database/Vehicle'
import { Vehicle } from '../types'
import { log } from '../utils/functions'

export const getVehicleByVin = async (vin: string, debug = false): Promise<Vehicle | null> => {
  try {
    const results: Vehicle | null = await vehicle.findByVin(vin, debug)
    return results
  } catch (err: any) {
    debug && log('ERROR', err.message)
    throw new Error(`vehicle.controller.${getVehicleByVin.name} -> ${err.message}`)
  }
}
