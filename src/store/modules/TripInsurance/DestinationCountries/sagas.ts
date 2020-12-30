import { all, takeLatest, call, put } from 'redux-saga/effects'

import { get, baseURLNamespaceInvestAws } from 'services/api'
import {
  Types,
  IDestinationCountry,
  IFilteredDestinationCountry,
} from './types'
import {
  GetDestinationCountriesSuccess,
  GetDestinationCountriesFailure,
} from './action'

export function* getDestinationCountries() {
  try {
    const { data } = yield call(
      get,
      `${baseURLNamespaceInvestAws}/viagem/paises/destino`
    )

    const { destinos } = data.ViagemPais

    const filteredDestinationCountries = destinos
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

    yield put(
      GetDestinationCountriesSuccess({
        ...data,
        ViagemPais: {
          destinos: filteredDestinationCountries,
        },
      })
    )
  } catch (err) {
    yield put(GetDestinationCountriesFailure())
  }
}

export default all([
  takeLatest(Types.GET_DESTINATION_CONTRIES_REQUEST, getDestinationCountries),
])
