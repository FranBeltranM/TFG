import { expect, describe, it, beforeAll } from 'vitest'
import { initializeDB } from '../database/db'
import * as resourceServices from './resourceServices'

beforeAll(async () => {
  initializeDB()
})

describe('Check resource services', () => {
  it('should be a function', (): void => {
    expect(typeof resourceServices.getResource).toBe('function')
  })

  it('should throw an error if receive a unknown resource type', async () => {
    try {
      await resourceServices.getResource('unknown')
    } catch (err: any) {
      expect(err.message).toContain('is not a function')
    }
  })

  it('should return a list of resources', async () => {
    const results = await resourceServices.getResource('origin')
    expect(Array.isArray(results)).toBe(true)
  })
})
