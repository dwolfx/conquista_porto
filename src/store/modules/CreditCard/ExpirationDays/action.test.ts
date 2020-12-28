import { Types, ICreditCardExpirationDays } from './types'
import * as a from './action'

describe('Credit Card actions', () => {
  it('should return the correct type: CREDIT_CARD_EXPIRATION_DAYS_REQUEST', () => {
    expect(a.GetCreditCardExpirationDaysRequest()).toEqual({
      type: Types.CREDIT_CARD_EXPIRATION_DAYS_REQUEST,
    })
  })

  it('should return the correct type: CREDIT_CARD_EXPIRATION_DAYS_SUCCESS', () => {
    const payload: ICreditCardExpirationDays = {
      codRetorno: '0',
      bandeiras: [
        {
          bandeira: 'VISA',
          codBandeira: '1',
          descricao: '12',
        },
      ],
      msgRetorno: 'Consulta realizada com sucesso.',
    }

    expect(a.GetCreditCardExpirationDaysSuccess(payload)).toEqual({
      type: Types.CREDIT_CARD_EXPIRATION_DAYS_SUCCESS,
      payload,
    })
  })

  it('should return the correct type: CREDIT_CARD_EXPIRATION_DAYS_FAILURE', () => {
    expect(a.GetCreditCardExpirationDaysFailure()).toEqual({
      type: Types.CREDIT_CARD_EXPIRATION_DAYS_FAILURE,
    })
  })

  it('should return the correct type: CREDIT_CARD_EXPIRATION_DAYS_CLEAR_DATA', () => {
    expect(a.GetCreditCardExpirationDaysClearData()).toEqual({
      type: Types.CREDIT_CARD_EXPIRATION_DAYS_CLEAR_DATA,
    })
  })
})
