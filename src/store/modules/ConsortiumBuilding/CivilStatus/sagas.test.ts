import { call, put } from 'redux-saga/effects'
import { get, baseURLNamespaceConsortiumBuilding } from 'services/api'
import consortiumBuildingCivilStatusMock from 'mocks/consortiumBuildingCivilStatus.json'

import { getCivilStatus } from './sagas'
import { GetCivilStatusSuccess, GetCivilStatusFailure } from './action'

describe('Consortium Building CivilStatus Sagas', () => {
  it('success triggers success action', () => {
    const generator = getCivilStatus()
    const response = { data: consortiumBuildingCivilStatusMock }

    expect(generator.next().value).toEqual(
      call(get, `${baseURLNamespaceConsortiumBuilding}/dados/estados-civis`)
    )

    expect(generator.next(response).value).toEqual(
      put(
        GetCivilStatusSuccess({
          ...response.data,
        })
      )
    )

    expect(generator.next()).toEqual({ done: true, value: undefined })
  })
  it('failure triggers failure action', () => {
    const generator = getCivilStatus()
    const response = undefined
    expect(generator.next().value).toEqual(
      call(get, `${baseURLNamespaceConsortiumBuilding}/dados/estados-civis`)
    )
    expect(generator.next(response).value).toEqual(put(GetCivilStatusFailure()))
    expect(generator.next()).toEqual({ done: true, value: undefined })
  })
})
