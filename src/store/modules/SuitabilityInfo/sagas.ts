import { all, takeLatest, call, put, select } from 'redux-saga/effects'

import {
  get,
  baseURLNamespaceInvest,
  baseURLNamespaceInvestAws,
} from 'services/api'
import { Types, IPayload } from './types'
import { GetDataSuccess, GetDataFailure } from './action'
import { getSuitabilityInfo, getCustomerProfile } from './selectors'
import {
  handleInvestButton,
  handleRedeemButton,
  handleWithdrawButton,
} from './utils'

export function* getSuitabilityInfoData() {
  try {
    const response = yield call(get, `${baseURLNamespaceInvest}/cotista/status`)

    yield put(GetDataSuccess({ ...response.data, isValid: false }))
  } catch (err) {
    yield put({
      ...GetDataFailure(),
    })
  }
}

export function* getDataValidate({ payload }: IPayload) {
  const { onSuccess, buttonType, onErrorToast } = payload
  try {
    const suitabilityInfoState = yield select(getSuitabilityInfo)
    let customerProfile = yield select(getCustomerProfile)

    if (!customerProfile) {
      const response = yield call(
        get,
        `${baseURLNamespaceInvestAws}/cliente/dados`
      )
      customerProfile = {
        cpfCnpj: response.data.cpfCnpj,
        customerName: response.data.nomeCliente,
        customerEmail: response.data.emailCliente,
      }
    }

    let suitabilityInfo = suitabilityInfoState
      ? { ...suitabilityInfoState }
      : null

    if (!suitabilityInfo) {
      const response = yield call(
        get,
        `${baseURLNamespaceInvest}/cotista/status`
      )
      suitabilityInfo = { ...response.data }
    }

    let isValid: { isValid?: boolean } = {
      isValid: false,
    }

    switch (buttonType) {
      case 'investir':
        isValid = handleInvestButton(suitabilityInfo, customerProfile)
        break
      case 'resgatar':
        isValid = handleRedeemButton(suitabilityInfo, customerProfile)
        break
      case 'retirar':
        isValid = handleWithdrawButton(suitabilityInfo, customerProfile)
        break
      default:
        isValid = { isValid: false }
        break
    }
    yield put(GetDataSuccess({ ...suitabilityInfo, ...isValid }))

    if (onSuccess) {
      onSuccess({ ...suitabilityInfo, ...isValid })
    }
  } catch (err) {
    yield put({
      ...GetDataFailure(),
    })
    onErrorToast({
      type: 'error',
      description: 'Por favor, tente novamente.',
      title: 'Erro ao processar solicitação.',
    })
  }
}

export default all([
  takeLatest(Types.SUITABILITY_INFO_GET_DATA_REQUEST, getSuitabilityInfoData),
  takeLatest(Types.SUITABILITY_INFO_GET_DATA_REQUEST_VALIDATE, getDataValidate),
])
