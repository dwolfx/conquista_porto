import { get, baseURLNamespaceConsortiumBuilding } from 'services/api'
import { call, put } from 'redux-saga/effects'
import consortiumBuildingContemplatedMock from 'mocks/consortiumBuildingContemplated.json'

import { getData } from './sagas'
import {
  GetContemplatedIntervalDataSuccess,
  GetContemplatedIntervalDataFailure,
} from './action'

describe('Consortium Building Contemplated sagas', () => {
  it('success triggers success action', () => {
    const generator = getData()
    const response = { data: consortiumBuildingContemplatedMock }

    expect(generator.next().value).toEqual(
      call(get, `${baseURLNamespaceConsortiumBuilding}/produtos/1/valores`)
    )

    expect(generator.next(response).value).toEqual(
      put(GetContemplatedIntervalDataSuccess(response))
    )
  })

  it('failure triggers failure action', () => {
    const generator = getData()
    const response = undefined
    expect(generator.next().value).toEqual(
      call(get, `${baseURLNamespaceConsortiumBuilding}/produtos/1/valores`)
    )
    expect(generator.next(response).value).toEqual(
      put(GetContemplatedIntervalDataFailure())
    )
  })
})
