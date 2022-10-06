import express from 'express'

const router = express.Router()

router.get('/', (_, res) => res.status(200).send('<h1>Welcome to my api 😊</h1>'))

export default router
