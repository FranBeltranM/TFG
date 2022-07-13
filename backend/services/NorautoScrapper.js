// @ts-check

import { webkit } from 'playwright'
import { expect } from '@playwright/test'

export const getVinFromPlate = async (/** @type {string} */ plate) => {
  let _vin = null // Variable a devolver

  // Browser
  const browser = await webkit.launch({ slowMo: 500 })
  const page = await browser.newPage()

  // Página de la que haremos scrap
  await page.goto('https://www.norauto.es/')

  // Función con la que extraeremos el Bastidor de la response
  page.on('response', async response => {
    if (response.url().includes('reg-vin')) {
      const a = await response.text()
      const json = JSON.parse(a)

      json.all[0].immatAttributes.forEach(element => {
        if (element.name === 'CODIF_VIN_PRF') _vin = element.value
      })
    }
  })
  // Aceptamos las cookies
  await page.locator('id=popin_tc_privacy_button_2').click()

  // Clickamos en Mi vehículo
  await page.locator('css=[aria-label="Mi vehículo"]').click()

  // Esperamos a que aparezca el modal
  const item = await page.locator('p', { hasText: 'Por matrícula' })
  await expect(item).toContainText('Por matrícula', { timeout: 5000 })

  // Rellenamos el input con la matrícula
  await page.locator('.plate-number-input').fill(plate)
  await page.locator('.search-plate-btn').click()

  await page.waitForTimeout(2000)

  // Comprobamos si tenemos que elegir una versión de nuestro vehículo
  const selectVersionButton = await page.locator('button', { hasText: 'Seleccionar' })

  // Si tenemos más de una versión posible, clickamos en la primera
  if (await selectVersionButton.count() > 0) {
    await selectVersionButton.first().click()
  }

  // Esperamos a que nos muestre el modal
  await page.waitForSelector('text=Tu vehículo ha sido actualizado')
  // await expect(item2).toContainText('Tu vehículo ha sido actualizado', { timeout: 5000 })

  // Cerramos el navegador
  await browser.close()

  // Devolvemos el vin si lo ha obtenido, en caso contrario False
  return _vin ?? false
}

// Pruebas
// console.log('Matrícula: 1240DSH - Bastidor: ' + await getVinFromPlate('1240DSH'))
// console.log('Matrícula: 5637HHN - Bastidor: ' + await getVinFromPlate('5637HHN'))
// console.log('Matrícula: 4440KKK - Bastidor: ' + await getVinFromPlate('4440KKK'))
// console.log('Matrícula: 0882CKN - Bastidor: ' + await getVinFromPlate('0882CKN'))
// console.log('Matrícula: 4299DVT - Bastidor: ' + await getVinFromPlate('4299DVT'))
// console.log('Matrícula: 7353JYJ - Bastidor: ' + await getVinFromPlate('7353JYJ'))
// console.log('Matrícula: 3344JDJ - Bastidor: ' + await getVinFromPlate('3344JDJ'))
