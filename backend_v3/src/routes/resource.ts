import express from 'express'
import * as resourceController from '../controllers/resource.controller'

const router = express.Router()

router.get(
  '/:type',
  resourceController.checkValidInput,
  resourceController.getResource
)

export default router
