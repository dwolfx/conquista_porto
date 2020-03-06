import { all, takeLatest, call, put, select } from 'redux-saga/effects'
import { get, baseURLNamespacePortopar } from 'services/api'
import { handleGiwRedirect } from 'helpers'
import { getSuitability } from './selectors'

import { Types } from './types'
import {
  GetSuitabilityDataSuccess,
  GetSuitabilityDataFailure,
  GetSuitabilityDataNoContent,
  SetSuitabilityLoading,
} from './action'

function* getDataAndRedirect({ payload: { cpf, link, errorLink, history } }) {
  yield put(SetSuitabilityLoading(true))

  const suitabilityState = yield select(getSuitability)

  if (suitabilityState.data) {
    history.push(link)
  } else {
    try {
      const response = yield call(
        get,
        `${baseURLNamespacePortopar}/cotista/perfil/investidor/${cpf}`
      )
      if (response.status === 204) {
        yield put(GetSuitabilityDataNoContent())
        handleGiwRedirect(
          'portaldecliente/conquista/suitability?vgnextnomenu=1&vgnextnoice=1&tela=perfil&r=true'
        )
      } else if (response.status === 200) {
        yield put(GetSuitabilityDataSuccess(response.data))

        if (link) {
          history.push(link)
        }
      } else {
        throw Error()
      }
    } catch (err) {
      yield put(SetSuitabilityLoading(false))
      yield put(GetSuitabilityDataFailure())
      history.push(errorLink || '/')
    }
  }
}

export default all([
  takeLatest(Types.GET_REQUEST_AND_REDIRECT, getDataAndRedirect),
])
