import { call, put } from 'redux-saga/effects'
import { get } from 'services/api'
import { Types, ICreditCardOfferRequest } from './types'

import { getOffers } from './sagas'
import {
  GetCreditCardOfferSuccess,
  GetCreditCardOfferFailure
} from './action'

describe('ExpirationDays sagas tests', () => {
  it('should exists', () => {
    expect(getOffers).toBeDefined()
  })
  it('success triggers success action', () => {
    const params: ICreditCardOfferRequest = {
      type: Types.GET_CREDIT_CARD_OFFERS_REQUEST as keyof typeof Types,
      onSuccess: () => {},
      dataNasc: '28/09/1995',
      uf: 'SP',
      nome: 'CarlosAlberto'
    }
    const generator = getOffers(params)
    const response = { 
      data: {
        CodigoOferta: "3",
        MensagemOferta: "Nenhum cartão disponível no momento.",
        IdSimulacao: "1717",
        Message: {
          TipoCritica: "SUCESSO"
        },
        isMasterCardActive: true,
        isVisaActive: true,
        CodigoRetorno: "0"
      },
      isLoading: false,
      hasError: false
    }

    expect(generator.next().value).toEqual(call(get, '/cartoes/ofertas?codigoCanal=1&nome=CarlosAlberto&uf=SP&dataNascimento=28/09/1995'))

    expect(generator.next(response).value).toEqual(
      put(GetCreditCardOfferSuccess(response.data))
    )
    expect(generator.next()).toEqual({ done: true, value: undefined })
  })
  it('success triggers error action', () => {
    const params: ICreditCardOfferRequest = {
      type: Types.GET_CREDIT_CARD_OFFERS_REQUEST as keyof typeof Types,
      onSuccess: () => {},
      dataNasc: '28/09/1995',
      uf: 'SP',
      nome: 'CarlosAlberto'
    }
    const generator = getOffers(params)
    const response = undefined
    generator.next()
    expect(generator.throw(response).value).toEqual(put(GetCreditCardOfferFailure()))
    expect(generator.next()).toEqual({ done: true, value: undefined })
  })
 
})
