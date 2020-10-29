import { call, put } from 'redux-saga/effects'
import { get } from 'services/api'

import { getOccupation } from './sagas'
import mock from './mock.json'
import * as a from './action'

describe('get credit cards', () => {
  it('success triggers success action', () => {
    const generator = getOccupation()
    const response = { data: mock }

    expect(generator.next().value).toEqual(call(get, '/cartoes/profissoes'))

    expect(generator.next(response).value).toEqual(
      put(a.GetCreditCardOccupationSuccess(response.data))
    )
    expect(generator.next()).toEqual({ done: true, value: undefined })
  })

  it('failure triggers failure action', () => {
    const generator = getOccupation()
    const response = {}
    expect(generator.next().value).toEqual(call(get, '/cartoes/profissoes'))
    expect(generator.next(response).value).toEqual(
      put(a.GetCreditCardOccupationFailure())
    )
    expect(generator.next()).toEqual({ done: true, value: undefined })
  })
})
