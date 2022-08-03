import { api, server } from './helpers.js'

test('home is working properly', async () => {
  await api.get('/').expect(200)
})

test('Searching vin is working properly', async () => {
  const response = await api.get('/buscar?bastidor=10231226')

  expect(response.body.vehicle.brand).toBe('VOLKSWAGEN')
})

test('Searching with incorrect vin', async () => {
  const response = await api.get('/buscar?bastidor=0882CKN')

  expect(response.body.vehicle.vin).toBe(undefined)
}, 30000)

test('Searching from plate is working properly', async () => {
  const response = await api.get('/buscar?plate=7353JYJ')

  expect(response.body.vehicle.vin).toBe('WVWZZZ6RZHY224641')
}, 30000)

afterAll(() => {
  server.close()
})
