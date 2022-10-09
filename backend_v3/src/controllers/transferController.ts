import { Request, Response, NextFunction } from 'express'
import { paramsEntryPoints } from '../utils/config'
import { checkIsValidParams, log } from '../utils/functions'
import * as transfer from '../services/transferServices'

export const checkValidInput = async (req: Request, res: Response, next: NextFunction) => {
  const isDebugMode = req.get('DEBUG_FLAG') ?? false
  const { mandatory: mandatoryParams } = paramsEntryPoints['/transfers/id']()

  isDebugMode && log('DEBUG', { params: req.params })

  if (!checkIsValidParams(req.params, mandatoryParams)) {
    return res.status(400).json({
      status: 'KO',
      info: 'Missing fields 🙄',
    })
  }

  const { id } = req.params

  if (id) {
    const idRegex = new RegExp(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/)

    if (!idRegex.test(id))
      return res.status(400).json({
        status: 'KO',
        info: 'Invalid id format 🙄',
      })
  }

  res.locals.params = {
    debug: isDebugMode,
    ...req.params,
  }

  return next()
}

export const getTransfersFromVehicle = async (_req: Request, res: Response, _next: NextFunction) => {
  const { id, debug } = res.locals.params
  const transfers = await transfer.getTransfersFromVehicle(id, debug)

  return res.status(200).json({
    status: 'OK',
    data: transfers,
  })
}
