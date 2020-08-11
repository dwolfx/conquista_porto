import { call, put } from 'redux-saga/effects'
import { get } from 'services/api'

import { getData } from './sagas'
import {
  GetConsortiumVehicleDataSuccess,
  GetConsortiumVehicleDataFailure,
} from './action'

describe('Consortium Vehicle Sagas', () => {
  it('success triggers success action 1', () => {
    const generator = getData()
    const response = { data: { Mensagem: 'ok' } }

    expect(generator.next().value).toEqual(
      call(get, `/consorcios/auto?codigoCanal=1`)
    )

    expect(generator.next(response).value).toEqual(
      put(GetConsortiumVehicleDataSuccess([]))
    )

    expect(generator.next()).toEqual({ done: true, value: undefined })
  })

  it('failure triggers failure action', () => {
    const generator = getData()
    const response = undefined
    expect(generator.next().value).toEqual(
      call(get, `/consorcios/auto?codigoCanal=1`)
    )
    expect(generator.next(response).value).toEqual(
      put(GetConsortiumVehicleDataFailure())
    )
    expect(generator.next()).toEqual({ done: true, value: undefined })
  })
})
