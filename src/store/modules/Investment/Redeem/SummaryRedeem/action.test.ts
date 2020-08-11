import { Types } from './types'
import {
  GetRedeemSummaryRequest,
  GetRedeemSummarySuccess,
  GetRedeemSummaryFailure,
  ClearReddemSummary,
  SetRedeemSummaryLoading,
} from './action'

describe('Summary Redeem actions', () => {
  test('if GetRedeemSummaryRequest returns the correct object', () => {
    const payload = {
      id_fundo: '',
      data_operacao: '',
      valor: '',
      tipo_operacao: '',
      onErrorToast: null,
    }
    expect(GetRedeemSummaryRequest(payload)).toEqual({
      type: Types.REDEEM_SUMMARY_GET_DATA_REQUEST,
      payload: {
        id_fundo: '',
        data_operacao: '',
        valor: '',
        tipo_operacao: '',
        onErrorToast: null,
      },
    })
  })

  test('if GetRedeemSummarySuccess returns the correct object', () => {
    const payload = {}
    expect(GetRedeemSummarySuccess(payload)).toEqual({
      type: Types.REDEEM_SUMMARY_GET_DATA_SUCCESS,
      payload,
    })
  })

  test('if GetRedeemSummaryFailure returns the correct object', () => {
    const payload = {
      message: {
        tipo_critica: 'TIPO_CRITICA',
        mensagem: 'É a verdade, não minto!',
      },
    }
    expect(GetRedeemSummaryFailure(payload)).toEqual({
      type: Types.REDEEM_SUMMARY_GET_DATA_FAILURE,
      message: {
        tipo_critica: 'TIPO_CRITICA',
        mensagem: 'É a verdade, não minto!',
      },
    })
  })

  test('if ClearReddemSummary returns the correct object', () => {
    expect(ClearReddemSummary()).toEqual({
      type: Types.REDDEM_SUMMARY_CLEAR_DATA,
    })
  })

  test('if SetRedeemSummaryLoading returns the correct object', () => {
    expect(SetRedeemSummaryLoading(true)).toEqual({
      type: Types.REDDEM_SUMMARY_SET_LOADING,
      payload: true,
    })
  })
})
