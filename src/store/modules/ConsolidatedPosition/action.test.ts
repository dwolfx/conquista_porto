import { Types } from './types'
import {
  GetConsolidatedPositionDataRequest,
  GetConsolidatedPositionDataSuccess,
  GetConsolidatedPositionDataFailure,
} from './action'

describe('Consolidated Position Actions', () => {
  test('if GetConsolidatedPositionDataRequest returns the correct object', () => {
    expect(GetConsolidatedPositionDataRequest()).toEqual({
      type: Types.GET_REQUEST,
    })
  })

  test('if GetConsolidatedPositionDataSuccess returns the correct object', () => {
    const payload = {}

    expect(GetConsolidatedPositionDataSuccess(payload)).toEqual({
      type: Types.GET_SUCCESS,
      payload,
    })
  })

  test('if GetConsolidatedPositionDataFailure returns the correct object', () => {
    expect(GetConsolidatedPositionDataFailure()).toEqual({
      type: Types.GET_FAILURE,
    })
  })
})
