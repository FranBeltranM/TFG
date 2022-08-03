import { getDataFromVIN } from '../src/services/index.js'

test('Expected output from my own vin', async () => {
  const result = await getDataFromVIN('WVWZZZ1JZ3B177177')
  expect(result.vehicle.brand).toBe('VOLKSWAGEN')
})
