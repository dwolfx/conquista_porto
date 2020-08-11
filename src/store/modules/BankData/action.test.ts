import { Types } from './types'
import {
  GetBankDataRequest,
  GetDataSuccess,
  GetDataFailure,
} from './action'

describe('Life Insurance Actions', () => {
  test('if GetBankDataRequest returns the correct object', () => {
    expect(GetBankDataRequest()).toEqual({
      type: Types.BANK_DATA_GET_DATA_REQUEST,
    })
  })

  test('if GetDataSuccess returns the correct object', () => {
    const payload = {}

    expect(GetDataSuccess(payload)).toEqual({
      type: Types.BANK_DATA_GET_DATA_SUCCESS,
      payload,
    })
  })

  test('if GetDataFailure returns the correct object', () => {
    expect(GetDataFailure()).toEqual({
      type: Types.BANK_DATA_GET_DATA_FAILURE,
    })
  })
})
