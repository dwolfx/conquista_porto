import { Types } from './types'
import {
  GetCreditCardDataSuccess,
  GetCreditCardDataRequest,
  GetCreditCardDataFailure,
} from './action'

describe('Credit Card actions', () => {
  test('if GetCreditCardDataRequest returns the correct object', () => {
    expect(GetCreditCardDataRequest()).toEqual({
      type: Types.GET_REQUEST,
    })
  })

  test('if GetCreditCardDataSuccess returns the correct object', () => {
    const payload = {}
    expect(GetCreditCardDataSuccess(payload)).toEqual({
      type: Types.GET_SUCCESS,
      payload,
    })
  })

  test('if GetCreditCardDataFailure returns the correct object', () => {
    expect(GetCreditCardDataFailure()).toEqual({
      type: Types.GET_FAILURE,
    })
  })
})
