import { all, takeLatest, call, put, select } from 'redux-saga/effects'
import { get } from 'services/api'
import { handleGiwRedirect } from 'helpers'
import { getSuitability } from './selectors'

import { Types } from './types'
import {
  GetSuitabilityDataSuccess,
  GetSuitabilityDataFailure,
  GetSuitabilityDataNoContent,
  SetSuitabilityLoading,
} from './action'

function* getDataAndRedirect({ cpf, link, history }) {
  try {
    yield put(SetSuitabilityLoading())

    const suitabilityState = yield select(getSuitability)

    if (suitabilityState.data) {
      history.push(link)
    } else {
      const response = yield call(
        get,
        `/invest/portopar/v1/cotista/perfil/investidor/${cpf}`
      )
      console.log(response)

      if (response.status === 204) {
        yield put(GetSuitabilityDataNoContent())
        handleGiwRedirect(
          'portaldecliente/conquista/suitability?vgnextnomenu=1&vgnextnoice=1&tela=perfil?r=true'
        )
      } else {
        yield put(GetSuitabilityDataSuccess(response.data))
        history.push(link)
      }
    }
  } catch (err) {
    yield put(GetSuitabilityDataFailure())
  }
}

export default all([
  takeLatest(Types.GET_REQUEST_AND_REDIRECT, getDataAndRedirect),
])
