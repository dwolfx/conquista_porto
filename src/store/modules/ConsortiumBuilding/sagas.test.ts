import { get } from 'services/api'
import { call, put } from 'redux-saga/effects'

import { getData } from './sagas'
import {
  GetConsortiumBuildingDataSuccess,
  GetConsortiumBuildingDataFailure,
} from './action'

describe('Consortium Building Sagas', () => {
  it('success triggers success action', () => {
    const generator = getData()
    const response = { data: [] }

    expect(generator.next().value).toEqual(
      call(get, `/consorcios/imovel?codigoCanal=1`)
    )

    expect(generator.next(response).value).toEqual(
      put(GetConsortiumBuildingDataSuccess(response.data))
    )

    expect(generator.next()).toEqual({ done: true, value: undefined })
  })

  it('failure triggers failure action', () => {
    const generator = getData()
    const response = undefined
    expect(generator.next().value).toEqual(
      call(get, `/consorcios/imovel?codigoCanal=1`)
    )
    expect(generator.next(response).value).toEqual(
      put(GetConsortiumBuildingDataFailure())
    )
    expect(generator.next()).toEqual({ done: true, value: undefined })
  })
})
