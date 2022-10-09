import { describe, it, expect } from 'vitest'
import { app } from '../../src/index'
import supertest from 'supertest'

const api = supertest(app)

describe('Check index routes', () => {
  it('/api -> should return 200', async () => {
    const response = await api.get('/api').expect(200)
    expect(response.text).toContain('Welcome to my api')
  })
})
