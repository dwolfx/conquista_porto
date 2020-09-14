import { all, takeLatest, call, put } from 'redux-saga/effects'

import { get, baseURLNamespaceAtlas } from 'services/api'
import { Types } from './types'
import {
  GetConsolidatedPositionDataSuccess,
  GetConsolidatedPositionDataFailure,
} from './action'

export function* getData() {
  try {
    const response = yield call(
      get,
      `${baseURLNamespaceAtlas}/cotista/posicao/consolidado`
    )

    yield put(GetConsolidatedPositionDataSuccess(response.data))
  } catch (err) {
    yield put(GetConsolidatedPositionDataFailure())
  }
}

export default all([takeLatest(Types.GET_REQUEST, getData)])
