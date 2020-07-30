import { all, takeLatest, call, put, select } from 'redux-saga/effects'

import { handleGiwRedirect } from 'helpers'
import { get, baseURLNamespacePortopar } from 'services/api'
import { buildToast, ToastTypes } from 'store/modules/toastActions'

import { getSuitability } from './selectors'

import { Types } from './types'
import {
  GetSuitabilityDataSuccess,
  GetSuitabilityDataFailure,
  GetSuitabilityDataNoContent,
  SetSuitabilityLoading,
} from './action'

function* getDataAndRedirect({
  payload: { link, errorPath, history, goalType },
}) {
  yield put(SetSuitabilityLoading(true))

  const suitabilityState = yield select(getSuitability)

  if (suitabilityState.data && Object.entries(suitabilityState.data).length) {
    history.push(link)
  } else {
    try {
      const response = yield call(
        get,
        `${baseURLNamespacePortopar}/cotista/perfil/investidor`
      )

      if (response.status === 204) {
        yield put(GetSuitabilityDataNoContent())
        handleGiwRedirect(
          `portaldecliente/conquista/suitability?vgnextnomenu=1&vgnextnoice=1&tela=perfil&r=true&codigoObjetivo=${goalType}`
        )
      } else if (response.status === 200) {
        yield put(GetSuitabilityDataSuccess(response.data))

        if (link) {
          history.push(link)
        }
      }
    } catch (err) {
      yield put({
        ...SetSuitabilityLoading(false),
        ...GetSuitabilityDataFailure(),
        toast: buildToast(err.message, ToastTypes.error),
      })

      if (errorPath) {
        history.push(errorPath)
      }
    }
  }
}

export default all([
  takeLatest(Types.GET_REQUEST_AND_REDIRECT, getDataAndRedirect),
])
