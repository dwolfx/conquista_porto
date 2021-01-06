import { all, takeLatest, call, put } from 'redux-saga/effects'

import { get, baseURLNamespaceInvest } from 'services/api'
import { Types, ICreditCard, IMessage } from './types'
import {
  GetTripInsuranceCreditCardSuccess,
  GetTripInsuranceCreditCardFailure,
} from './action'

export function* getCreditCards() {
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
  } catch (err) {
    yield put(GetTripInsuranceCreditCardFailure())
  }
}

export default all([
  takeLatest(Types.GET_TRIP_INSURANCE_CREDIT_CARD_REQUEST, getCreditCards),
])
