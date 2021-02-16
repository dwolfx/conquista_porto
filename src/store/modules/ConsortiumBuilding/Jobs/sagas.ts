import { all, takeLatest, call, put } from 'redux-saga/effects'

import { get, baseURLNamespaceConsortiumBuilding } from 'services/api'
import { AxiosResponse } from 'axios'
import { IJobs, IJobsConsortiumBuilding, Types } from './types'
import { GetJobsSuccess, GetJobsFailure } from './action'

export function* getJobs() {
  try {
    const { data }: AxiosResponse<IJobsConsortiumBuilding> = yield call(
      get,
      `${baseURLNamespaceConsortiumBuilding}/dados/profissoes`
    )

    const countries = data.profissoes.sort((a: IJobs, b: IJobs) => {
      if (a.descricao > b.descricao) {
        return 1
      }
      if (a.descricao < b.descricao) {
        return -1
      }
      return 0
    })

    yield put(GetJobsSuccess({ profissoes: countries }))
  } catch (err) {
    yield put(GetJobsFailure())
  }
}

export default all([takeLatest(Types.GET_JOBS_REQUEST, getJobs)])
