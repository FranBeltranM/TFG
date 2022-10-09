import express from 'express'
import * as vehicleController from '../../controllers/vehicleController'

const router = express.Router()

/**
 * @openapi
 * /api/v1/vehicles/search:
 *   get:
 *     summary: Get vehicle by VIN or plate
 *     description: Get vehicle by VIN or plate
 *     tags:
 *       - Vehicle
 *     parameters:
 *       - in: query
 *         name: vin
 *         schema:
 *           type: string
 *         description: Vehicle identification number
 *         example: WVWZZZ1JZ3B177177
 *       - in: query
 *         name: plate
 *         schema:
 *           type: string
 *         description: Vehicle plate
 *     responses:
 *       200:
 *         description: Get vehicle by VIN or plate
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                    id:
 *                      type: string
 *                    vin:
 *                      type: string
 *                    brand:
 *                      type: string
 *                    model:
 *                      type: string
 *                    plateType:
 *                      type: string
 *                    fuel:
 *                      type: string
 *                    engineSize:
 *                      type: number
 *                    fiscalHP:
 *                      type: number
 *                    emissions:
 *                      type: string
 *       400:
 *         description: Bad request, missing parameters or invalid parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                  type: string
 *                 info:
 *                  type: string
 *               example:
 *                 - status: "KO"
 *                   info: "Missing fields 🙄"
 *                 - status: "KO"
 *                   info: "Invalid plate format 🙄"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                  type: string
 *                 info:
 *                  type: string
 *               example:
 *                 - status: "KO"
 *                   info: "Internal server error 😱"

 */
router.get('/search', vehicleController.checkValidInput, vehicleController.getVehicle)

export default router
