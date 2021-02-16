import { call, put } from 'redux-saga/effects'
import { get, baseURLNamespaceConsortiumBuilding } from 'services/api'
import consortiumBuildingFatcaMock from 'mocks/consortiumBuildingFatca.json'

import { getFatca } from './sagas'
import { GetFatcaSuccess, GetFatcaFailure } from './action'

describe('Consortium Building Fatca Sagas', () => {
  it('success triggers success action', () => {
    const generator = getFatca()
    const response = { data: consortiumBuildingFatcaMock }

    expect(generator.next().value).toEqual(
      call(get, `${baseURLNamespaceConsortiumBuilding}/dados/lista-fatca`)
    )

    expect(generator.next(response).value).toEqual(
      put(
        GetFatcaSuccess({
          ...response.data,
        })
      )
    )

    expect(generator.next()).toEqual({ done: true, value: undefined })
  })
  it('failure triggers failure action', () => {
    const generator = getFatca()
    const response = undefined
    expect(generator.next().value).toEqual(
      call(get, `${baseURLNamespaceConsortiumBuilding}/dados/lista-fatca`)
    )
    expect(generator.next(response).value).toEqual(put(GetFatcaFailure()))
    expect(generator.next()).toEqual({ done: true, value: undefined })
  })
})
