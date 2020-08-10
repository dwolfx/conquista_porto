import { call, put } from 'redux-saga/effects'
import { get } from 'services/api'

import { getData } from './sagas'
import {
  GetVehicleFinancingSuccess,
  GetVehicleFinancingFailure,
} from './action'

describe('get vehicle financing', () => {
  it('success triggers success action', () => {
    const generator = getData()
    const response = { data: [{ name: 'aqui tem coragi' }] }

    expect(generator.next().value).toEqual(
      call(get, '/financiamentos/auto?codigoCanal=0')
    )

    expect(generator.next(response).value).toEqual(
      put(GetVehicleFinancingSuccess(response.data))
    )
    expect(generator.next()).toEqual({ done: true, value: undefined })
  })

  it('success triggers success action (with an ERROR)', () => {
    const generator = getData()
    const response = { data: { Mensagem: 'Deu ruim aqui, para tudooooo' } }

    expect(generator.next().value).toEqual(
      call(get, '/financiamentos/auto?codigoCanal=0')
    )

    expect(generator.next(response).value).toEqual(
      put(GetVehicleFinancingSuccess([]))
    )
    expect(generator.next()).toEqual({ done: true, value: undefined })
  })

  it('failure triggers failure action', () => {
    const generator = getData()
    const response = {}
    expect(generator.next().value).toEqual(
      call(get, '/financiamentos/auto?codigoCanal=0')
    )
    expect(generator.next(response).value).toEqual(
      put(GetVehicleFinancingFailure())
    )
    expect(generator.next()).toEqual({ done: true, value: undefined })
  })
})
