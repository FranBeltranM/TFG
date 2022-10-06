import express from 'express'
import { paramsEntryPoints } from '../utils/config'
import { checkIsValidParams, log } from '../utils/functions'
import * as vehicle from '../controllers/vehicle.controller'

const router = express.Router()

router.get(
  '/search',
  (req, res, next) => {
    const isDebugMode = req.get('DEBUG_FLAG') ?? false
    const { mandatory: mandatoryParams } = paramsEntryPoints['/search']()

    isDebugMode && log('DEBUG', { params: req.query })

    if (!checkIsValidParams(req.query, mandatoryParams))
      return res.status(400).json({
        status: 'KO',
        info: 'Missing fields 🙄',
      })

    if (req.query.plate) {
      const plate = String(req.query.plate).toUpperCase()
      const plateRegex = new RegExp(/^[0-9]{4}[A-Z]{3}$/)
      if (!plateRegex.test(plate))
        return res.status(400).json({
          status: 'KO',
          info: 'Invalid plate format 🙄',
        })
    }

    res.locals.params = {
      debug: isDebugMode,
      ...req.query,
    }

    return next()
  },
  async (_req, res, _next) => {
    try {
      const data = await vehicle.findByVin(res.locals.params.vin, res.locals.params.debug)
      res.status(200).json({
        status: 'OK',
        data: data,
      })
    } catch (err: any) {
      log('ERROR', err.toString())
      res.status(500).json({
        status: 'KO',
        info: 'Internal server error 😱',
        reason: err.toString(),
      })
    }
  }
)

export default router
