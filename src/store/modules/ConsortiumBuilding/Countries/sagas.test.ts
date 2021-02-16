import { call, put } from 'redux-saga/effects'
import { get, baseURLNamespaceConsortiumBuilding } from 'services/api'
import consortiumBuildingCountriesMock from 'mocks/consortiumBuildingCountries.json'

import { getCountries } from './sagas'
import { GetCountriesSuccess, GetCountriesFailure } from './action'

describe('Consortium Building Countries Sagas', () => {
  it('success triggers success action', () => {
    const generator = getCountries()
    const response = { data: consortiumBuildingCountriesMock }

    expect(generator.next().value).toEqual(
      call(get, `${baseURLNamespaceConsortiumBuilding}/dados/paises`)
    )

    expect(generator.next(response).value).toEqual(
      put(
        GetCountriesSuccess({
          ...response.data,
        })
      )
    )

    expect(generator.next()).toEqual({ done: true, value: undefined })
  })
  it('failure triggers failure action', () => {
    const generator = getCountries()
    const response = undefined
    expect(generator.next().value).toEqual(
      call(get, `${baseURLNamespaceConsortiumBuilding}/dados/paises`)
    )
    expect(generator.next(response).value).toEqual(put(GetCountriesFailure()))
    expect(generator.next()).toEqual({ done: true, value: undefined })
  })
})
