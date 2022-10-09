import express from 'express'
import * as resourceController from '../../controllers/resourceController'

const router = express.Router()

/**
 * @openapi
 * /api/v1/resources/{type}:
 *   get:
 *     summary: Get a resource type
 *     parameters:
 *      - in: path
 *        name: type
 *        schema:
 *          type: string
 *          example: engine
 *        required: true
 *     tags:
 *       - Resources
 *     responses:
 *       200:
 *         description: Get a resource type
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                  type: string
 *                 data:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                     key:
 *                      type: string
 *                     value:
 *                      type: string
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
 *                   info: "Invalid resource type 🤔"
 */
router.get('/:type', resourceController.checkValidInput, resourceController.getResource)

export default router
