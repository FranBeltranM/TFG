import express from 'express'
import * as resource from '../services/resourceServices'
import { availableResources, paramsEntryPoints } from '../utils/config'
import { checkIsValidParams, log } from '../utils/functions'

const router = express.Router()

router.get(
  '/:type',
  async (req, res, next) => {
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
  },
  async (_req, res, _next) => {
    const { type, debug } = res.locals.params
    const data = await resource.getResource(type, debug)

    return res.status(200).json({
      status: 'OK',
      data,
    })
  }
)

export default router
