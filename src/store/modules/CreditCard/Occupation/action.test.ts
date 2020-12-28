import { Types } from './types'
import * as a from './action'
import payload from './mock.json'

describe('Occupation actions', () => {
  it('should return the correct type: CREDIT_CARD_OCCUPATION_REQUEST', () => {
    expect(a.GetCreditCardOccupationRequest()).toEqual({
      type: Types.CREDIT_CARD_OCCUPATION_REQUEST,
    })
  })
  it('should return the correct type: CREDIT_CARD_OCCUPATION_SUCCESS', () => {
    expect(a.GetCreditCardOccupationSuccess(payload)).toEqual({
      type: Types.CREDIT_CARD_OCCUPATION_SUCCESS,
      payload,
    })
  })
  it('should return the correct type: CREDIT_CARD_OCCUPATION_FAILURE', () => {
    expect(a.GetCreditCardOccupationFailure()).toEqual({
      type: Types.CREDIT_CARD_OCCUPATION_FAILURE,
      payload: {
        profissoesVO: [],
      },
    })
  })
})
