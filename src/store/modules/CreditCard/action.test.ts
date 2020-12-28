import { Types, ICreditCard } from './types'
import {
  GetCreditCardDataSuccess,
  GetCreditCardDataRequest,
  GetCreditCardDataFailure,
  OpenCreationLayer,
  CloseCreationLayer,
} from './action'

describe('Credit Card actions', () => {
  it('should return the correct type: GET_REQUEST', () => {
    expect(GetCreditCardDataRequest()).toEqual({
      type: Types.GET_REQUEST,
    })
  })

  it('should return the correct type: GET_SUCCESS', () => {
    const payload: ICreditCard[] = [
      {
        CodigoCanal: 0,
        CpfCnpj: '32036703801',
        Bandeira: 'Visa',
        Fatura: {
          MelhorDataCompra: 22,
          Status: 'Aberta',
          Valor: 25090,
          Vencimento: 16,
        },
        LimiteCartaoAdicional: {
          LimiteCredito: 4588.55,
          LimiteDisponivel: 5000,
          LimiteDisponivelOverlimitt: 1000,
          LimiteSaque: 399.45,
        },
        LimiteTitularCartao: {
          LimiteCredito: 7000.44,
          LimiteDisponivel: 10000,
          LimiteDisponivelOverlimitt: 2000,
          LimiteSaque: 501.33,
        },
        Link: 'string',
        Tipo: 'Gold',
        UltimosDigitos: 3212,
      },
    ]
    expect(GetCreditCardDataSuccess(payload)).toEqual({
      type: Types.GET_SUCCESS,
      payload,
    })
  })

  it('should return the correct type: GET_FAILURE', () => {
    expect(GetCreditCardDataFailure()).toEqual({
      type: Types.GET_FAILURE,
    })
  })

  it('should return the correct type: OPEN_CREDIT_CARD_CREATION', () => {
    expect(OpenCreationLayer()).toEqual({
      type: Types.OPEN_CREDIT_CARD_CREATION,
    })
  })

  it('should return the correct type: CLOSE_CREDIT_CARD_CREATION', () => {
    expect(CloseCreationLayer()).toEqual({
      type: Types.CLOSE_CREDIT_CARD_CREATION,
    })
  })
})
