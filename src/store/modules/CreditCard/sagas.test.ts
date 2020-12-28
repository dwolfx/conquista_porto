import { call, put } from 'redux-saga/effects'
import { get } from 'services/api'

import { getData } from './sagas'
import { GetCreditCardDataSuccess, GetCreditCardDataFailure } from './action'

describe('get credit cards', () => {
  it('success triggers success action', () => {
    const generator = getData()
    const response = { data: [{ name: 'aqui tem coragi' }] }

    expect(generator.next().value).toEqual(call(get, '/cartoes?codigoCanal=0'))

    expect(generator.next(response).value).toEqual(
      // @ts-expect-error
      put(GetCreditCardDataSuccess(response.data))
    )
    expect(generator.next()).toEqual({ done: true, value: undefined })
  })

  it('success triggers success action (with an ERROR)', () => {
    // cara... é isso mesmo.
    const generator = getData()
    const response = { data: { TipoCritica: 'CRITICA_NEGOCIO' } }

    expect(generator.next().value).toEqual(call(get, '/cartoes?codigoCanal=0'))

    expect(generator.next(response).value).toEqual(
      put(GetCreditCardDataSuccess([]))
    )
    expect(generator.next()).toEqual({ done: true, value: undefined })
  })

  it('failure triggers failure action', () => {
    const generator = getData()
    const response = {}
    expect(generator.next().value).toEqual(call(get, '/cartoes?codigoCanal=0'))
    expect(generator.next(response).value).toEqual(
      put(GetCreditCardDataFailure())
    )
    expect(generator.next()).toEqual({ done: true, value: undefined })
  })
})
