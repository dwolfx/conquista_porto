import { call, put } from 'redux-saga/effects'
import { get, baseURLNamespaceInvestAws } from 'services/api'
import destinationCountriesMock from 'mocks/destinationCountries.json'

import { getDestinationCountries } from './sagas'
import {
  GetDestinationCountriesSuccess,
  GetDestinationCountriesFailure,
} from './action'

import { IDestinationCountry, IFilteredDestinationCountry } from './types'

describe('Trip Insurance Destination Countries Sagas', () => {
  it('success triggers success action', () => {
    const generator = getDestinationCountries()
    const response = { data: destinationCountriesMock }

    expect(generator.next().value).toEqual(
      call(get, `${baseURLNamespaceInvestAws}/viagem/paises/destino`)
    )

    const filteredDestinationCountries = response.data.ViagemPais.destinos
      .filter(
        (
          country: IDestinationCountry,
          index: number,
          destinos: IDestinationCountry[]
        ) => destinos.findIndex(t => t.codigo === country.codigo) === index
      )
      .map((country: IDestinationCountry) => ({
        text:
          country.descricao.charAt(0).toUpperCase() +
          country.descricao.slice(1).toLowerCase(),
        id: +country.codigo,
        value: country.descricao.toLowerCase(),
      }))
      .sort(
        (
          firstCountry: IFilteredDestinationCountry,
          secondCountry: IFilteredDestinationCountry
        ) => (firstCountry.text > secondCountry.text ? 1 : -1)
      )

    expect(generator.next(response).value).toEqual(
      put(
        GetDestinationCountriesSuccess({
          ...response.data,
          ViagemPais: {
            destinos: filteredDestinationCountries,
          },
        })
      )
    )

    expect(generator.next()).toEqual({ done: true, value: undefined })
  })
  it('failure triggers failure action', () => {
    const generator = getDestinationCountries()
    const response = undefined
    expect(generator.next().value).toEqual(
      call(get, `${baseURLNamespaceInvestAws}/viagem/paises/destino`)
    )
    expect(generator.next(response).value).toEqual(
      put(GetDestinationCountriesFailure())
    )
    expect(generator.next()).toEqual({ done: true, value: undefined })
  })
})
