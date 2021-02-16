import { all, takeLatest, call, put } from 'redux-saga/effects'

import { get, baseURLNamespaceConsortiumBuilding } from 'services/api'
import { AxiosResponse } from 'axios'
import { ICountries, ICountriesConsortiumBuilding, Types } from './types'
import { GetCountriesSuccess, GetCountriesFailure } from './action'

export function* getCountries() {
  try {
    const { data }: AxiosResponse<ICountriesConsortiumBuilding> = yield call(
      get,
      `${baseURLNamespaceConsortiumBuilding}/dados/paises`
    )

    const countries = data.paises.sort((a: ICountries, b: ICountries) => {
      if (a.descricao > b.descricao) {
        return 1
      }
      if (a.descricao < b.descricao) {
        return -1
      }
      return 0
    })

    yield put(GetCountriesSuccess({ paises: countries }))
  } catch (err) {
    yield put(GetCountriesFailure())
  }
}

export default all([takeLatest(Types.GET_COUNTRIES_REQUEST, getCountries)])
