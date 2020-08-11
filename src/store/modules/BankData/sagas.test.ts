import { call, put } from 'redux-saga/effects'
import { get } from 'services/api'

import { getData } from './sagas'
import {
  GetDataSuccess,
  GetDataFailure,
} from './action'

describe('Bank Data Sagas', () => {
  it('success triggers success action', () => {
    const generator = getData()
    const response = { data: { DadosContaPortoSeguro: 'ok' } }

    expect(generator.next().value).toEqual(
      call(get, `/conta/dados?codigoCanal=0`)
    )

    expect(generator.next(response).value).toEqual(
      put(GetDataSuccess(response.data))
    )

    expect(generator.next()).toEqual({ done: true, value: undefined })
  })

  it('failure triggers failure action', () => {
    const generator = getData()
    const response = undefined
    expect(generator.next().value).toEqual(
      call(get, `/conta/dados?codigoCanal=0`)
    )
    expect(generator.next(response).value).toEqual(
      put(GetDataFailure())
    )
    expect(generator.next()).toEqual({ done: true, value: undefined })
  })
})
