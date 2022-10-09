import express from 'express'
import * as transferController from '../controllers/transfer.controller'

const router = express.Router()

router.get('/:id', transferController.checkValidInput, transferController.getTransfersFromVehicle)

router.get('/:id/details', (_, res) => {
  res.send('Work in progress')
})

export default router
