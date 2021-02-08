import { all, takeLatest, call, put } from 'redux-saga/effects'

import { get, baseURLNamespaceConsortiumBuilding } from 'services/api'
import { Types } from './types'
import { GetStatesSuccess, GetStatesFailure } from './action'

export function* getStates() {
  try {
    const { data } = yield call(
      get,
      `${baseURLNamespaceConsortiumBuilding}/produtos/comercializacao/uf`
    )
    yield put(
      GetStatesSuccess({
        ...data,
      })
    )
  } catch (err) {
    yield put(GetStatesFailure())
  }
}

export default all([takeLatest(Types.GET_STATES_REQUEST, getStates)])
