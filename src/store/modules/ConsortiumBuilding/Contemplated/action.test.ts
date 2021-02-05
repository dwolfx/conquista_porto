import { Types } from './types'
import {
  GetContemplatedIntervalDataRequest,
  GetContemplatedIntervalDataSuccess,
  GetContemplatedIntervalDataFailure,
} from './action'

describe('Consortium Building Contemplated actions', () => {
  test('if GetContemplatedIntervalDataRequest returns the correct object', () => {
    expect(GetContemplatedIntervalDataRequest()).toEqual({
      type: Types.GET_REQUEST,
    })
  })

  test('if GetContemplatedIntervalDataSuccess returns the correct object', () => {
    const payload = {}

    expect(GetContemplatedIntervalDataSuccess(payload)).toEqual({
      type: Types.GET_SUCCESS,
      payload,
    })
  })

  test('if GetContemplatedIntervalDataFailure returns the correct object', () => {
    expect(GetContemplatedIntervalDataFailure()).toEqual({
      type: Types.GET_FAILURE,
    })
  })
})
