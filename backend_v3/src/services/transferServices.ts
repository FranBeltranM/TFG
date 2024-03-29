import * as transfer from '../database/transfer'
import { Transfer } from '../types'
import { log } from '../utils/functions'

export const getTransfersFromVehicle = async (vehicleId: string, debug = false): Promise<Transfer[] | null> => {
  try {
    const transfers: Transfer[] | null = await transfer.findByVehicleId(vehicleId, debug)
    return transfers
  } catch (err: any) {
    debug && log('ERROR', err.message)
    throw new Error(`transfer.controller.${getTransfersFromVehicle.name} -> ${err.message}`)
  }
}
