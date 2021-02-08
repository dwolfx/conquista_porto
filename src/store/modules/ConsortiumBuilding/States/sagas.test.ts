import { call, put } from 'redux-saga/effects'
import { get, baseURLNamespaceConsortiumBuilding } from 'services/api'
import consortiumBuildingStatesMock from 'mocks/consortiumBuildingStates.json'

import { getStates } from './sagas'
import { GetStatesSuccess, GetStatesFailure } from './action'

describe('Consortium Building States Sagas', () => {
  it('success triggers success action', () => {
    const generator = getStates()
    const response = { data: consortiumBuildingStatesMock }

    expect(generator.next().value).toEqual(
      call(
        get,
        `${baseURLNamespaceConsortiumBuilding}/produtos/comercializacao/uf`
      )
    )

    expect(generator.next(response).value).toEqual(
      put(
        GetStatesSuccess({
          ...response.data,
        })
      )
    )

    expect(generator.next()).toEqual({ done: true, value: undefined })
  })
  it('failure triggers failure action', () => {
    const generator = getStates()
    const response = undefined
    expect(generator.next().value).toEqual(
      call(
        get,
        `${baseURLNamespaceConsortiumBuilding}/produtos/comercializacao/uf`
      )
    )
    expect(generator.next(response).value).toEqual(put(GetStatesFailure()))
    expect(generator.next()).toEqual({ done: true, value: undefined })
  })
})
