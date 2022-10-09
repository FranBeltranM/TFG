import { expect, describe, it, beforeAll } from 'vitest'
import { initializeDB } from '../controllers/db.controller'
import * as transferServices from './transferServices'

beforeAll(async () => {
  initializeDB()
})

describe('Check transfer services', () => {
  it('should be a function', (): void => {
    expect(typeof transferServices.getTransfersFromVehicle).toBe('function')
  })

  it('should throw an error if the transfer method receive a incorrect id', async () => {
    try {
      await transferServices.getTransfersFromVehicle('')
    } catch (err: any) {
      expect(err.message).toContain('Incorrect string value')
    }
  })

  it('should return a list of transfers', async () => {
    const results = await transferServices.getTransfersFromVehicle('12d1d060-c025-11ec-9a04-005056101f82')
    expect(Array.isArray(results)).toBe(true)
  })

  it('should return null if this vehicle id does not have transfers', async () => {
    const results = await transferServices.getTransfersFromVehicle('12d1d060-c025-11ec-9a04-005056101f81')
    expect(results).toStrictEqual([])
  })
})
