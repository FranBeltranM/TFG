import { describe, it, expect } from 'vitest'
import { app } from '../../src/index'
import supertest from 'supertest'

const api = supertest(app)

describe('Check resource routes', () => {
  // Entry point
  it('/api/v1/resources -> should return 404', async () => {
    await api.get('/api/v1/resources').expect(404).expect('Content-Type', /html/)
  })

  // Get resources
  it('/api/v1/resources/tre -> should return 400 (bad request, incorrect type)', async () => {
    const response = await api.get('/api/v1/resources/tree')
    expect(response.body.status).toBe('KO')
  })

  it('/api/v1/resources/states -> should return OK', async () => {
    const response = await api.get('/api/v1/resources/states')
    expect(response.body.status).toBe('OK')
  })
})
