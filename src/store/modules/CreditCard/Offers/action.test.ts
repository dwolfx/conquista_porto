import { Types, ICreditCardOffer } from './types'
import * as a from './action'

describe('CreditCard Offer actions', () => {
  it('should return the correct type: GET_CREDIT_CARD_OFFERS_REQUEST', () => {
    // @ts-expect-error
    expect(a.GetCreditCardOfferRequest()).toEqual({
      type: Types.GET_CREDIT_CARD_OFFERS_REQUEST,
    })
  })

  it('should return the correct type: GET_CREDIT_CARD_OFFERS_SUCCESS', () => {
    const payload: ICreditCardOffer = {
      CodigoOferta: '4',
      MensagemOferta: 'Nenhum cartão disponível no momento.',
      IdSimulacao: '1673',
      Message: {
        TipoCritica: 'SUCESSO',
      },
      CodigoRetorno: '0',
    }
    expect(a.GetCreditCardOfferSuccess(payload)).toEqual({
      type: Types.GET_CREDIT_CARD_OFFERS_SUCCESS,
      payload,
    })
  })

  it('should return the correct type: GET_CREDIT_CARD_OFFERS_FAILURE', () => {
    expect(a.GetCreditCardOfferFailure()).toEqual({
      type: Types.GET_CREDIT_CARD_OFFERS_FAILURE,
    })
  })
})
