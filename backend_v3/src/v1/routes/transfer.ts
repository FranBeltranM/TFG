import express from 'express'
import * as transferController from '../../controllers/transferController'

const router = express.Router()

/**
 * @openapi
 * /api/v1/transfers/{vehicleId}:
 *   get:
 *     summary: Get a vehicle's transfers
 *     parameters:
 *       - in: path
 *         name: vehicleId
 *         schema:
 *           type: string
 *         required: true
 *         description: Vehicle UUID
 *         example: 12d1d060-c025-11ec-9a04-005056101f82
 *     tags:
 *       - Transfers
 *     responses:
 *       200:
 *         description: Get a vehicle's transfers
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                    type: object
 *                    properties:
 *                      startTransferDate:
 *                        type: string
 *                      writeTransferDate:
 *                        type: string
 *                      endTransferDate:
 *                        type: string
 *                      typeTransfer:
 *                        type: string
 *                      zipCode:
 *                        type: number
 *                      person:
 *                        type: string
 *                      typeServiceVehicle:
 *                        type: string
 *                      city:
 *                        type: string
 *       400:
 *         description: Bad request
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
 *                   info: "Invalid id format 🙄"
 */
router.get('/:id', transferController.checkValidInput, transferController.getTransfersFromVehicle)

router.get('/:id/details', (_, res) => {
  res.send('Work in progress')
})

export default router
