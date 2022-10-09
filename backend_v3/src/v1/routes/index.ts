import express from 'express'

const router = express.Router()

/**
 * @openapi
 * /api/v1:
 *   get:
 *     summary: Show the a welcome message
 *     tags:
 *       - Index
 *     responses:
 *       200:
 *         description: Welcome message
 *         content:
 *           text/html:
 *             schema:
 *                 type: string
 *                 example:
 *                   - <h1>Welcome to my api 😊</h1>
 */
router.get('/', (_, res) => res.status(200).send('<h1>Welcome to my api 😊</h1>'))

export default router
