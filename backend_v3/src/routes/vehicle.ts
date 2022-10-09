import express from 'express'
import * as vehicleController from '../controllers/vehicleController'

const router = express.Router()

router.get('/search', vehicleController.checkValidInput, vehicleController.getVehicle)

export default router
