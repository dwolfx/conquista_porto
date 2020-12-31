import { Types } from './types'
import {
  GetBankExtractFundRequest,
  GetBankExtractFundSuccess,
  GetBankExtractFundFailure,
  ClearBankExtractFundData,
} from './action'

describe('BankExtractFund Actions', () => {
  test('if GetBankExtractFundRequest returns the correct object', () => {
    const payload = {}
    expect(GetBankExtractFundRequest(payload)).toEqual({
      type: Types.GET_REQUEST,
      payload,
    })
  })

  test('if GetBankExtractFundSuccess returns the correct object', () => {
    const payload = {}

    expect(GetBankExtractFundSuccess(payload)).toEqual({
      type: Types.GET_SUCCESS,
      payload,
    })
  })

  test('if GetBankExtractFundFailure returns the correct object', () => {
    expect(GetBankExtractFundFailure()).toEqual({
      type: Types.GET_FAILURE,
    })
  })

  test('if ClearBankExtractFundData returns the correct object', () => {
    expect(ClearBankExtractFundData()).toEqual({
      type: Types.CLEAR_DATA,
    })
  })
})
