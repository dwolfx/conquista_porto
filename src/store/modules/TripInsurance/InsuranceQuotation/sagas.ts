import { all, takeLatest, call, put } from 'redux-saga/effects'

import { post, baseURLNamespaceInvestAws } from 'services/api'
import { Types, IPayload, IInsuranceQuotationResponse } from './types'
import {
  PostInsuranceQuotationSuccess,
  PostInsuranceQuotationFailure,
} from './action'

export function* postInsuranceQuotation({
  payload,
  onErrorToast,
  onSuccess,
}: IPayload) {
  try {
    const { data }: { data: IInsuranceQuotationResponse } = yield call(
      post,
      `${baseURLNamespaceInvestAws}/viagem/cotacao/seguro`,
      payload
    )

    let newData: IInsuranceQuotationResponse = data

    if (data?.Message?.TipoCritica === 'CRITICA_NEGOCIO') {
      throw new Error(`Erro ao efetuar chamada 'viagem/cotacao/seguro'`)
    }

    if (data?.ViagemPacote?.pacotes) {
      newData = {
        ...data,
        ViagemPacote: {
          pacotes: [data.ViagemPacote.pacotes].flatMap(pacote => pacote),
        },
      }
    }

    yield put(PostInsuranceQuotationSuccess(newData))
    if (onSuccess) onSuccess()
  } catch (err) {
    yield put(PostInsuranceQuotationFailure())
    onErrorToast({
      type: 'error',
      description: 'Por favor, tente novamente',
      title: 'Erro ao enviar solicitação.',
    })
  }
}

export default all([
  takeLatest(Types.POST_INSURANCE_QUOTATION_REQUEST, postInsuranceQuotation),
])
