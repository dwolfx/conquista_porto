import { all, takeLatest, call, put, select } from 'redux-saga/effects'

import { get, baseURLNamespaceInvest } from 'services/api'
import { Types } from './types'
import { GetDataSuccess, GetDataFailure } from './action'
import { getSuitabilityInfo, getBankData } from './selectors'
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

    yield put(GetDataSuccess(response.data))
  } catch (err) {
    yield put({
      ...GetDataFailure(),
    })
  }
}

function* getDataValidate({ payload }: IPayload) {
  const { onSuccess, buttonType, onErrorToast } = payload
  try {
    const suitabilityInfoState = yield select(getSuitabilityInfo)
    const bankData = yield select(getBankData)

    let suitabilityInfo = suitabilityInfoState
      ? { ...suitabilityInfoState }
      : null

    if (!suitabilityInfo) {
      const response = yield call(
        get,
        `${baseURLNamespaceInvest}/cotista/status?cpf=${bankData.DadosContaPortoSeguro.cpf}`
      )
      suitabilityInfo = { ...response.data }
    }
    yield put(GetDataSuccess(suitabilityInfo))

    switch (buttonType) {
      case 'investir':
        onSuccess(handleInvestButton(suitabilityInfo, bankData))
        break
      case 'resgatar':
        onSuccess(handleRedeemButton(suitabilityInfo, bankData))
        break
      case 'retirar':
        onSuccess(handleWithdrawButton(suitabilityInfo, bankData))
        break
      default:
        break
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
