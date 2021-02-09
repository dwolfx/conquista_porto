import { all, takeLatest, call, put } from 'redux-saga/effects'

import { get, baseURLNamespaceConsortiumBuilding } from 'services/api'
import { loggerSucess, loggerError } from 'logger'
import { Types } from './types'
import {
  GetContemplatedIntervalDataSuccess,
  GetContemplatedIntervalDataFailure,
} from './action'

export function* getData() {
  const getContemplatedIntervalDataURL = `${baseURLNamespaceConsortiumBuilding}/produtos/1/valores`
  try {
    const response = yield call(get, getContemplatedIntervalDataURL)
    yield put(GetContemplatedIntervalDataSuccess({ data: response.data }))
    loggerSucess(getContemplatedIntervalDataURL, 'GET', response?.status)
  } catch (err) {
    yield put(GetContemplatedIntervalDataFailure())
    loggerError(getContemplatedIntervalDataURL, 'GET', err)
  }
}

export default all([takeLatest(Types.GET_REQUEST, getData)])
