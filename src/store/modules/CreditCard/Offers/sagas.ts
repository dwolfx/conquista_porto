import { all, takeLatest, call, put } from 'redux-saga/effects'

import { get, baseURLNamespaceInvestAws } from 'services/api'
import {
  Types,
  ICreditCardOffer,
  OFFER_CODE,
  ICreditCardOfferRequest,
  ICreditCardOfferError,
} from './types'
import * as a from './action'

export function* getOffers({
  onSuccess,
  dataNasc,
  nome,
  uf,
  addToast,
}: ICreditCardOfferRequest) {
  try {
    const response = yield call(
      get,
      `${baseURLNamespaceInvestAws}/cartoes/ofertas?codigoCanal=1&nome=${nome}&uf=${uf}&dataNascimento=${dataNasc}`
    )

    let responseData: ICreditCardOffer & ICreditCardOfferError = response.data

    /*
      CodigoOferta === 1 // Somente Visa Disponível
      CodigoOferta === 2 // Somente Master Disponível
      CodigoOferta === 3 // Ambos disponíveis
      CodigoOferta === 4 // Nenhum disponível
     */

    if (
      responseData.Message.Mensagem ||
      responseData.Message.TipoCritica === 'CRITICA_NEGOCIO'
    ) {
      throw new Error('Erro ao verificar ofertas')
    } else {
      responseData = {
        ...responseData,
        isMasterCardActive:
          responseData.CodigoOferta === OFFER_CODE.ONLY_MASTER_CODE ||
          responseData.CodigoOferta === OFFER_CODE.BOTH_FLAGS_AVAILABLE,
        isVisaActive:
          responseData.CodigoOferta === OFFER_CODE.ONLY_VISA_CODE ||
          responseData.CodigoOferta === OFFER_CODE.BOTH_FLAGS_AVAILABLE,
      }
      onSuccess(responseData)
      yield put(a.GetCreditCardOfferSuccess(responseData))
    }
  } catch (err) {
    yield put(a.GetCreditCardOfferFailure())
    addToast({
      type: 'error',
      title: 'Erro ao verificar ofertas',
      description: 'Tente novamente em alguns instantes.',
    })
  }
}

export default all([
  takeLatest(Types.GET_CREDIT_CARD_OFFERS_REQUEST, getOffers),
])
