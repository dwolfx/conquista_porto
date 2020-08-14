import { all, takeLatest, call, put, select } from 'redux-saga/effects'

import { get, baseURLNamespaceInvestAws } from 'services/api'
import { Types, IGetAlignmentTermsPayload } from '../types'
import { getAuth, getSuitabilityInfo } from '../selectors'
import {
  GetAlignmentTermsDataSuccess,
  GetAlignmentTermsDataFailure,
} from './action'

export function* getAlignmentTermsData({
  payload: { data, onSuccess, onErrorToast },
}: IGetAlignmentTermsPayload) {
  // data_operacao = YYYY-MM-DD
  const { data_operacao, valor_bruto, id_fundo } = data

  const { id_cotista } = yield select(getSuitabilityInfo)
  const { cpf } = yield select(getAuth)

  try {
    const response = yield call(
      get,
      `${baseURLNamespaceInvestAws}/cotista/aplicacoes/enquadramento?CodigoCanal=1&id_cotista=${id_cotista}&cpf_cnpj=${cpf}&data_operacao=${data_operacao}&tipo_operacao=1&valor_bruto=${valor_bruto}&id_fundo=${id_fundo}`
    )
    yield put(GetAlignmentTermsDataSuccess(response.data))

    if (onSuccess) {
      onSuccess(response.data)
    }
  } catch (err) {
    yield put(GetAlignmentTermsDataFailure(err))
    onErrorToast({
      type: 'error',
      description: 'Por favor, tente novamente.',
      title: 'Erro ao enviar solicitação.',
    })
  }
}

export default all([
  takeLatest(Types.ALIGNMENT_TERMS_DATA_GET_REQUEST, getAlignmentTermsData),
])
