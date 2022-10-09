import { Request, Response, NextFunction } from 'express'
import { availableResources, paramsEntryPoints } from '../utils/config'
import { checkIsValidParams, log } from '../utils/functions'
import * as resource from '../services/resourceServices'

export const checkValidInput = async (req: Request, res: Response, next: NextFunction) => {
  const isDebugMode = req.get('DEBUG_FLAG') ?? false
  const { mandatory: mandatoryParams } = paramsEntryPoints['/resources/type']()

  isDebugMode && log('DEBUG', { params: req.params })

  if (!checkIsValidParams(req.params, mandatoryParams)) {
    return res.status(400).json({
      status: 'KO',
      info: 'Missing fields 🙄',
    })
  }

  const { type } = req.params

  if (!availableResources.includes(type)) {
    return res.status(400).json({
      status: 'KO',
      info: 'Invalid resource type 🤔',
    })
  }

  res.locals.params = {
    debug: isDebugMode,
    ...req.params,
  }

  return next()
}

export const getResource = async (_req: Request, res: Response, _next: NextFunction) => {
  const { type, debug } = res.locals.params
  const data = await resource.getResource(type, debug)

  return res.status(200).json({
    status: 'OK',
    data,
  })
}
