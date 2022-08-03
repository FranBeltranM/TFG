import { getDataFromVIN } from '../src/services'
import { createPool, deletePool } from '../src/services/db'

test('Expected output from my own vin', async () => {
  createPool()
  let result = await getDataFromVIN('WVWZZZ1JZ3B177177')
  result = result.flat(Infinity)
  result = result.slice(0, result.length - 1)
  deletePool()

  expect(result[0].marca_itv).toBe('VOLKSWAGEN')
})
