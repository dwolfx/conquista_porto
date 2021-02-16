import { all, takeLatest, call, put } from 'redux-saga/effects'

import { get, baseURLNamespaceConsortiumBuilding } from 'services/api'
import { AxiosResponse } from 'axios'
import { ICivilStatus, ICivilStatusConsortiumBuilding, Types } from './types'
import { GetCivilStatusSuccess, GetCivilStatusFailure } from './action'

export function* getCivilStatus() {
  try {
    const { data }: AxiosResponse<ICivilStatusConsortiumBuilding> = yield call(
      get,
      `${baseURLNamespaceConsortiumBuilding}/dados/estados-civis`
    )

    const countries = data.estados_civis.sort(
      (a: ICivilStatus, b: ICivilStatus) => {
        if (a.descricao > b.descricao) {
          return 1
        }
        if (a.descricao < b.descricao) {
          return -1
        }
        return 0
      }
    )

    yield put(GetCivilStatusSuccess({ estados_civis: countries }))
  } catch (err) {
    yield put(GetCivilStatusFailure())
  }
}

export default all([takeLatest(Types.GET_CIVIL_STATUS_REQUEST, getCivilStatus)])
