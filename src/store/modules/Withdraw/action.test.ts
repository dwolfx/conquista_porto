import { Types, ISummartPayload } from './types'
import {
  GetWithdrawDetailsRequest,
  GetWithdrawDetailsSuccess,
  GetWithdrawDetailsFailure,
  GetWithdrawSummaryRequest,
  GetWithdrawSummarySuccess,
  GetWithdrawSummaryFailure,
} from './action'

describe('Withdraw Actions', () => {
  test('if GetWithdrawDetailsRequest returns the correct object', () => {
    const payload = {}
    expect(GetWithdrawDetailsRequest(payload)).toEqual({
      type: Types.GET_WITHDRAW_DETAILS_REQUEST,
      payload,
    })
  })

  test('if GetWithdrawDetailsSuccess returns the correct object', () => {
    const payload = {}

    expect(GetWithdrawDetailsSuccess(payload)).toEqual({
      type: Types.GET_WITHDRAW_DETAILS_SUCCESS,
      payload,
    })
  })

  test('if GetWithdrawDetailsFailure returns the correct object', () => {
    expect(GetWithdrawDetailsFailure()).toEqual({
      type: Types.GET_WITHDRAW_DETAILS_FAILURE,
    })
  })

  test('if GetWithdrawSummaryRequest returns the correct object', () => {
    const payload = { data: { valor_operacao: 1 } }
    expect(GetWithdrawSummaryRequest(payload)).toEqual({
      type: Types.GET_WITHDRAW_SUMMARY_REQUEST,
      payload,
    })
  })

  test('if GetWithdrawSummarySuccess returns the correct object', () => {
    const payload = {}
    expect(GetWithdrawSummarySuccess(payload)).toEqual({
      type: Types.GET_WITHDRAW_SUMMARY_SUCCESS,
      payload,
    })
  })

  test('if GetWithdrawSummaryFailure returns the correct object', () => {
    expect(GetWithdrawSummaryFailure()).toEqual({
      type: Types.GET_WITHDRAW_SUMMARY_FAILURE,
    })
  })
})
