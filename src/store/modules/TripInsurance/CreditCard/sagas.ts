import { all, takeLatest, call, put } from 'redux-saga/effects'

import { get, baseURLNamespaceInvest } from 'services/api'
import { Types, ICreditCard, IMessage, IGetCreditCards } from './types'
import {
  GetTripInsuranceCreditCardSuccess,
  GetTripInsuranceCreditCardFailure,
} from './action'

export function* getCreditCards({
  onSuccess,
  Step,
  onErrorToast,
}: IGetCreditCards) {
  try {
    const {
      data,
    }: { data: { Message: IMessage } | ICreditCard[] } = yield call(
      get,
      `${baseURLNamespaceInvest}/cartoes?codigoCanal=1&integracao=1`
    )

    yield put(
      GetTripInsuranceCreditCardSuccess(
        Array.isArray(data)
          ? {
              Message: {
                TipoCritica: '',
                Mensagem: '',
              },
              creditCards: data,
            }
          : { ...data, creditCards: [] }
      )
    )
    if (onSuccess && Step) onSuccess(Step)
  } catch (err) {
    yield put(GetTripInsuranceCreditCardFailure())
    onErrorToast({
      type: 'error',
      description: 'Por favor, tente novamente',
      title: 'Erro ao enviar solicitação.',
    })
  }
}
export default all([
  takeLatest(Types.GET_TRIP_INSURANCE_CREDIT_CARD_REQUEST, getCreditCards),
])
