import express from 'express'
import * as vehicleController from '../controllers/vehicle.controller'

const router = express.Router()

router.get('/search', vehicleController.checkValidInput, vehicleController.getVehicle)

export default router
