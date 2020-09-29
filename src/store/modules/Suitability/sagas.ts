import { all, takeLatest, call, put, select } from 'redux-saga/effects'

import { handleGiwRedirect } from 'helpers'
import { get, baseURLNamespacePortopar } from 'services/api'
import { getSuitabilityInfoData } from 'store/modules/SuitabilityInfo/sagas'

import { selectSuitability, selectSuitabilityInfo } from './selectors'

import { Types } from './types'
import {
  GetSuitabilityDataSuccess,
  GetSuitabilityDataFailure,
  GetSuitabilityDataNoContent,
  SetSuitabilityLoading,
} from './action'

export function* getDataAndRedirect({
  payload: { link, errorPath, history, goalType, addToast },
}: any) {
  yield put(SetSuitabilityLoading(true))

  const suitabilityState = yield select(selectSuitability)
  let suitabilityInfo = yield select(selectSuitabilityInfo)

  if (!suitabilityInfo.data) {
    yield call(getSuitabilityInfoData)

    suitabilityInfo = yield select(selectSuitabilityInfo)
  }

  let isSuitabilityInfoValid = Boolean(
    suitabilityInfo.data?.status_data_vigencia_suitability &&
      suitabilityInfo.data?.status_possui_suitability
  )

  if (
    suitabilityState?.data &&
    Object.entries(suitabilityState.data).length &&
    isSuitabilityInfoValid
  ) {
    history.push(link)
  } else {
    try {
      const response = yield call(
        get,
        `${baseURLNamespacePortopar}/cotista/perfil/investidor`
      )

      if (response.status === 204 || !isSuitabilityInfoValid) {
        let giwSuitabilityUrl = `portaldecliente/conquista/suitability?vgnextnomenu=1&vgnextnoice=1&tela=perfil&r=true`

        if (goalType) {
          giwSuitabilityUrl += `&codigoObjetivo=${goalType}`
        }

        handleGiwRedirect(giwSuitabilityUrl)
        yield put(GetSuitabilityDataNoContent())
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
      })

      addToast({
        type: 'error',
        description: 'Ocorreu um erro',
        title: JSON.parse(err.message)?.msg || 'Tente novamente mais tarde.',
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
