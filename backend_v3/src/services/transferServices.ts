import { Transfer } from '../types'
import * as transfer from '../controllers/transfer.controller'

export const getTransfersFromVehicle = async (vehicleId: string, debug = false): Promise<Transfer[] | null> => {
  const transfers: Transfer[] | null = await transfer.findByIdVehicle(vehicleId, debug)
  return transfers
}

export const getTransferDetails = (transferId: string): string => {
  // const transfer = await Transfer.findById(transferId);
  return transferId
}
