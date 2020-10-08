import { Types } from './types'

import {
  GetBankExtractRequest,
  GetBankExtractSuccess,
  GetBankExtractFailure,
  ClearBankExtractData,
  CloseAccountExtractLayer,
  OpenAccountExtractLayer
} from './action'

describe('Credit Card actions', () => {
  test('if GetBankExtractRequest returns the correct object', () => {
    const payload = {
      tipoFiltro: 30,
      dataInicial: '2020-01-01',
      dataFinal: '2020-01-02',
    }

    expect(GetBankExtractRequest(payload)).toEqual({
      type: Types.GET_REQUEST,
      payload: {
        tipoFiltro: 30,
        dataInicial: '2020-01-01',
        dataFinal: '2020-01-02',
      }
    })
  })

  test('if GetBankExtractSuccess returns the correct object', () => {
    const payload = { response: 'success' }

    expect(GetBankExtractSuccess(payload)).toEqual({
      type: Types.GET_SUCCESS,
      payload: { response: 'success' },
    })
  })

  test('if GetBankExtractFailure returns the correct object', () => {
    expect(GetBankExtractFailure()).toEqual({
      type: Types.GET_FAILURE,
    })
  })

  test('if ClearBankExtractData returns the correct object', () => {
    expect(ClearBankExtractData()).toEqual({
      type: Types.CLEAR_DATA,
    })
  })

  test('if OpenAccountExtractLayer returns the correct object', () => {
    expect(OpenAccountExtractLayer()).toEqual({
      type: Types.OPEN_ACCOUNT_EXTRACT_LAYER,
    })
  })

  test('if CloseAccountExtractLayer returns the correct object', () => {
    expect((CloseAccountExtractLayer())).toEqual({
      type: Types.CLOSE_ACCOUNT_EXTRACT_LAYER,
    })
  })
})
