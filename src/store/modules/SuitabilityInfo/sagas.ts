import { all, takeLatest, call, put, select } from 'redux-saga/effects'

import {
  get,
  baseURLNamespaceInvest,
  baseURLNamespaceInvestAws,
} from 'services/api'
import { Types } from './types'
import { GetDataSuccess, GetDataFailure } from './action'
import { getSuitabilityInfo, getCustomerProfile, getAuth } from './selectors'
import {
  handleInvestButton,
  handleRedeemButton,
  handleWithdrawButton,
} from './utils'
import { IToast } from 'hooks/toast'

interface IPayload {
  type: string
  payload: {
    onSuccess: Function
    buttonType: 'investir' | 'retirar' | 'resgatar'
    onErrorToast: (toast: Omit<IToast, 'id'>) => void
  }
}
interface IProps {
  type: string
  payload: { cpf: string }
}

function* getData({ payload }: IProps) {
  const { cpf } = payload
  try {
    const response = yield call(
      get,
      `${baseURLNamespaceInvest}/cotista/status?cpf=${cpf}`
    )

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

    const auth = yield select(getAuth)

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
        `${baseURLNamespaceInvest}/cotista/status?cpf=${auth.cpf}`
      )
      suitabilityInfo = { ...response.data }
    }

    let isValid: { isValid: boolean } | {} = {
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
  takeLatest(Types.SUITABILITY_INFO_GET_DATA_REQUEST, getData),
  takeLatest(Types.SUITABILITY_INFO_GET_DATA_REQUEST_VALIDATE, getDataValidate),
])
