import { describe, it, expect } from 'vitest'
import { app } from '../../src/index'
import supertest from 'supertest'

const api = supertest(app)

describe('Check vehicle routes', () => {
  // Entry point
  it('/api/v1/vehicles/search -> should return missing fields if vin is not provided', async () => {
    const response = await api.get('/api/v1/vehicles/search')
    expect(response.body.info).toBe('Missing fields 🙄')
  })

  // Search by vin
  it('/api/v1/vehicles/search?vin -> should return empty data if vin is not valid', async () => {
    const response = await api.get('/api/v1/vehicles/search?vin=WVWZZZ1AZ3B177144')

    expect(response.body).toStrictEqual({
      status: 'OK',
      data: null,
    })
  })

  it('/api/v1/vehicles/search?vin -> should return empty data if vin is not valid', async () => {
    const response = await api.get('/api/v1/vehicles/search?vin=WVWZZZ1JZ3B177177')

    expect(response.body).toStrictEqual({
      status: 'OK',
      data: {
        id: '12d1d060-c025-11ec-9a04-005056101f82',
        vin: 'WVWZZZ1JZ3B177177',
        brand: 'VOLKSWAGEN',
        model: 'GOLF 1,9',
        plateType: 'Ordinaria',
        fuel: 'Diesel',
        engineSize: 1896,
        fiscalHP: 12.89,
        emissions: 'EURO 3',
      },
    })
  })

  // Search by plate
  it('/api/v1/vehicles/search?plate -> should return invalid plate if plate is not valid (too short)', async () => {
    const response = await api.get('/api/v1/vehicles/search?plate=1234BB')
    expect(response.body.info).toBe('Invalid plate format 🙄')
  })

  it('/api/v1/vehicles/search?plate -> should return invalid plate if plate is not valid (include vowels)', async () => {
    const response = await api.get('/api/v1/vehicles/search?plate=1234AAB')
    expect(response.body.info).toBe('Invalid plate format 🙄')
  })

  it('/api/v1/vehicles/search?plate -> should return internal server error if plate is sended, work in progress', async () => {
    const response = await api.get('/api/v1/vehicles/search?plate=1234BBB')
    expect(response.body.info).toBe('Internal server error 😱, work in progress')
  })
})
