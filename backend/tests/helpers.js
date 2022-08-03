import Request from 'supertest'
import { app, server } from '../index.js'

const api = Request(app)

export { api, server }
