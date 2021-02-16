import { all, takeLatest, call, put } from 'redux-saga/effects'

import { get, baseURLNamespaceConsortiumBuilding } from 'services/api'
import { AxiosResponse } from 'axios'
import { IFatca, IFatcaConsortiumBuilding, Types } from './types'
import { GetFatcaSuccess, GetFatcaFailure } from './action'

export function* getFatca() {
  try {
    const { data }: AxiosResponse<IFatcaConsortiumBuilding> = yield call(
      get,
      `${baseURLNamespaceConsortiumBuilding}/dados/lista-fatca`
    )

    const countries = data.lista_fatca.sort((a: IFatca, b: IFatca) => {
      if (a.descricao > b.descricao) {
        return 1
      }
      if (a.descricao < b.descricao) {
        return -1
      }
      return 0
    })

    yield put(GetFatcaSuccess({ lista_fatca: countries }))
  } catch (err) {
    yield put(GetFatcaFailure())
  }
}

export default all([takeLatest(Types.GET_FATCA_REQUEST, getFatca)])
