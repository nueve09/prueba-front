import { afterEach, describe, expect, it, vi } from 'vitest'

import { chargeRemesa, fetchRemesas, replaceRemesasApi } from '@/api/remesas'
import { remesaSeedList } from '@/data/remesas'
import { todayCompactDate } from '@/lib/dates'
import { remesaErrorMessage } from '@/lib/errors'

const UNCHARGED_ID = '290034'
const CHARGED_ID = '29939303'

const settle = async <T>(promise: Promise<T>) => {
  await vi.advanceTimersByTimeAsync(280)
  return promise
}

const settleRejected = async (
  promise: Promise<unknown>,
  matcher?: object,
) => {
  const assertion = matcher
    ? expect(promise).rejects.toMatchObject(matcher)
    : expect(promise).rejects.toBeTruthy()
  await vi.advanceTimersByTimeAsync(280)
  await assertion
}

describe('chargeRemesa', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it('charges an uncharged remesa and sets today’s compact date', async () => {
    vi.useFakeTimers()

    const charged = await settle(chargeRemesa(UNCHARGED_ID))

    expect(charged.status).toBe('COBRADO')
    expect(charged.charged_at).toBe(todayCompactDate())

    const list = await settle(fetchRemesas())
    expect(list.find((remesa) => remesa.id === UNCHARGED_ID)).toMatchObject({
      status: 'COBRADO',
      charged_at: todayCompactDate(),
    })
  })

  it('rejects already charged, unknown, and invalid ids without mutating the list', async () => {
    vi.useFakeTimers()
    const before = structuredClone(remesaSeedList)

    await settleRejected(chargeRemesa(CHARGED_ID), {
      code: 'ALREADY_CHARGED',
      message: remesaErrorMessage.alreadyCharged,
    })
    await settleRejected(chargeRemesa('99999999'), {
      code: 'NOT_FOUND',
      message: remesaErrorMessage.notFound,
    })
    await settleRejected(chargeRemesa(''))
    await settleRejected(chargeRemesa('abc'))
    await settleRejected(chargeRemesa('123456789'))

    const after = await settle(fetchRemesas())
    expect(after).toEqual(before)
    expect(after.find((remesa) => remesa.id === UNCHARGED_ID)?.status).toBe(
      'NO_COBRADO',
    )
  })
})

describe('fetchRemesas', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it('returns the Zod-parsed seed list', async () => {
    vi.useFakeTimers()
    const list = await settle(fetchRemesas())
    expect(list).toEqual(remesaSeedList)
  })

  it('rejects an invalid in-memory payload', async () => {
    vi.useFakeTimers()
    replaceRemesasApi([{ id: 'bad' }])
    const pending = fetchRemesas()
    const assertion = expect(pending).rejects.toBeTruthy()
    await vi.advanceTimersByTimeAsync(280)
    await assertion
  })
})
