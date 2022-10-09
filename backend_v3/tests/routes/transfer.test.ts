import { describe, it, expect } from 'vitest'
import { app } from '../../src/index'
import supertest from 'supertest'

const api = supertest(app)

describe('Check transfers routes', () => {
  // Entry point
  it('/api/transfers -> should return 404', async () => {
    const response = await api.get('/api/transfers')
    expect(response.status).toBe(404)
  })

  // Get transfers
  it('/api/transfers/1 -> should return 400 (bad request, invalid id format)', async () => {
    const response = await api.get('/api/transfers/1')
    expect(response.body.info).toBe('Invalid id format 🙄')
  })

  it('/api/transfers/1 -> should return OK', async () => {
    const response = await api.get('/api/transfers/12d1d060-c025-11ec-9a04-005056101f82')
    expect(response.body.status).toBe('OK')
  })

  // Get transfers details
  it('/api/transfers/1/details -> should return 404', async () => {
    const response = await api.get('/api/transfers/1/details')
    expect(response.text).toBe('Work in progress')
  })
})
