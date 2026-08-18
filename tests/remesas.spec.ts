import { expect, type Locator, type Page, test } from '@playwright/test'

const enterId = async (root: Page | Locator, id: string) => {
  for (const digit of id) {
    await root.getByRole('button', { name: digit, exact: true }).click()
  }
}

const desktopKeypad = (page: Page) =>
  page.locator('section').filter({ hasText: 'Ventanilla Digital' })

const railNav = (page: Page) =>
  page.getByRole('navigation', { name: 'Principal' }).filter({
    has: page.getByRole('link'),
  })

const tabsNav = (page: Page) =>
  page.getByRole('navigation', { name: 'Principal' }).filter({
    has: page.getByRole('tab'),
  })

const historyRows = (page: Page) =>
  page.getByRole('complementary').getByRole('list').first().getByRole('listitem')

const rowIds = async (page: Page) => {
  const rows = historyRows(page)
  const count = await rows.count()
  const ids: string[] = []
  for (let index = 0; index < count; index += 1) {
    ids.push((await rows.nth(index).locator('span').first().innerText()).trim())
  }
  return ids
}

const gotoDesktop = async (page: Page) => {
  await page.goto('/')
  await expect(
    desktopKeypad(page).getByRole('button', { name: 'Cobrar remesa' }),
  ).toBeEnabled()
}

const gotoMobile = async (page: Page) => {
  await page.setViewportSize({ width: 375, height: 667 })
  await page.goto('/')
  await expect(
    page.getByRole('searchbox', { name: 'Buscar remesas' }),
  ).toBeVisible()
}

test.describe('desktop remesas journeys', () => {
  test('loaded history shows ten charged remesas', async ({ page }) => {
    await gotoDesktop(page)

    const rows = historyRows(page)
    await expect(rows).toHaveCount(10)

    for (let index = 0; index < 10; index += 1) {
      const row = rows.nth(index)
      await expect(row.locator('span').nth(0)).toHaveText(/^#\d+$/)
      await expect(row.locator('span').nth(1)).not.toBeEmpty()
      await expect(row.locator('span').nth(2)).toHaveText(/USD[\s\u00a0]\d/)
    }

    await expect(page.getByText('#290034')).toHaveCount(0)
  })

  test('search filters the charged list', async ({ page }) => {
    await gotoDesktop(page)

    await page.getByRole('searchbox', { name: 'Buscar remesas' }).fill('BanCoppel')

    await expect(page.getByText('#13339906')).toBeVisible()
    await expect(page.getByText('BanCoppel')).toBeVisible()
    await expect(page.getByText('MoneyGram')).toHaveCount(0)
  })

  test('pagination shows the next page', async ({ page }) => {
    await gotoDesktop(page)

    const page1Ids = await rowIds(page)
    expect(page1Ids).toHaveLength(10)

    await page.getByRole('link', { name: '2', exact: true }).click()

    const page2Ids = await rowIds(page)
    expect(page2Ids.length).toBeGreaterThan(0)
    expect(page2Ids).not.toEqual(page1Ids)
    for (const id of page2Ids) {
      expect(page1Ids).not.toContain(id)
    }
  })

  test('desktop keypad charges an unpaid remesa', async ({ page }) => {
    await gotoDesktop(page)

    const keypad = desktopKeypad(page)
    await enterId(keypad, '290034')
    await keypad.getByRole('button', { name: 'Cobrar remesa' }).click()

    await expect(page.getByText('#290034')).toBeVisible()
    await expect(page.getByRole('dialog')).toHaveCount(0)
  })

  test('unknown id shows an error toast', async ({ page }) => {
    await gotoDesktop(page)

    const keypad = desktopKeypad(page)
    await enterId(keypad, '88888888')
    await keypad.getByRole('button', { name: 'Cobrar remesa' }).click()

    await expect(page.getByText('La remesa no existe')).toBeVisible()
    await expect(page.getByText('#88888888')).toHaveCount(0)
  })

  test('print media hides chrome', async ({ page }) => {
    await gotoDesktop(page)
    await expect(
      page.getByRole('navigation', { name: 'pagination' }),
    ).toBeVisible()

    await page.emulateMedia({ media: 'print' })

    await expect(railNav(page)).toBeHidden()
    await expect(desktopKeypad(page)).toBeHidden()
    await expect(tabsNav(page)).toBeHidden()
    await expect(
      page.getByRole('searchbox', { name: 'Buscar remesas' }),
    ).toBeHidden()
    await expect(
      page.getByRole('navigation', { name: 'pagination' }),
    ).toBeHidden()
  })
})

test.describe('mobile remesas journeys', () => {
  test('small viewport shows tabs and history, not the inline keypad', async ({
    page,
  }) => {
    await gotoMobile(page)

    await expect(tabsNav(page)).toBeVisible()
    await expect(railNav(page)).toBeHidden()
    await expect(
      page.getByRole('searchbox', { name: 'Buscar remesas' }),
    ).toBeVisible()
    await expect(desktopKeypad(page)).toBeHidden()
    await expect(
      page.getByRole('button', { name: 'Cobrar', exact: true }),
    ).toBeVisible()
  })

  test('mobile dialog charges an unpaid remesa', async ({ page }) => {
    await gotoMobile(page)

    await page.getByRole('button', { name: 'Cobrar', exact: true }).click()
    const dialog = page.getByRole('dialog')
    await expect(dialog).toBeVisible()

    await enterId(dialog, '311122')
    await dialog.getByRole('button', { name: 'Cobrar remesa' }).click()

    await expect(page.getByText('#311122')).toBeVisible()
  })
})
