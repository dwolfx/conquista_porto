import { call, select, all, takeLatest, put } from 'redux-saga/effects'

import { get, baseURLNamespaceInvestAws } from 'services/api'
import { Types } from './types'
import { IGetRedeemAlignmentTermsPayload } from './types'
import { getAuth, getSuitabilityInfo } from '../selectors'
import { 
  GetRedeemAlignmentTermsSuccess, 
  GetRedeemAlignmentTermsFailure 
} from './action'

function* getRedeemAlignmentTermsData({
  payload: { data, onSuccess, onErrorToast },
}: IGetRedeemAlignmentTermsPayload) {
  const { data_operacao, valor_bruto, id_fundo } = data
  const { id_cotista } = yield select(getSuitabilityInfo)
  const { cpf } = yield select(getAuth)

  try {
    const response = yield call(
      get,
      `${baseURLNamespaceInvestAws}/cotista%E2%80%8B/enquadramento/resgate?cpf_cnpj=${cpf}&id_cotista=${id_cotista}&data_operacao=${data_operacao}&tipo_operacao=2&valor_bruto=${valor_bruto}&id_fundo=${id_fundo}&CodigoCanal=1`
    )
    yield put(GetRedeemAlignmentTermsSuccess(response.data))

    if (onSuccess) {
      onSuccess(response.data)
    }
  } catch (err) {
    yield put(GetRedeemAlignmentTermsFailure(err))
    onErrorToast({
      type: 'error',
      description: 'Por favor, tente novamente.',
      title: 'Erro ao enviar solicitação.',
    })
  }
}

export default all([
  takeLatest(Types.REDEEM_TERMS_DATA_REQUEST, getRedeemAlignmentTermsData),
])
