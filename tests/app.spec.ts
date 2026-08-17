import { expect, test } from '@playwright/test'

test('app boots', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'Prueba Front' })).toBeVisible()
})
