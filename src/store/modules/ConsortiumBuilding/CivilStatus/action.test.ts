import { Types } from './types'
import {
  GetCivilStatusRequest,
  GetCivilStatusSuccess,
  GetCivilStatusFailure,
} from './action'

describe('Consortium Building CivilStatus Actions', () => {
  test('if GetCivilStatusRequest returns the correct object', () => {
    expect(GetCivilStatusRequest()).toEqual({
      type: Types.GET_CIVIL_STATUS_REQUEST,
    })
  })

  test('if GetCivilStatusSuccess returns the correct object', () => {
    const payload = {}

    expect(GetCivilStatusSuccess(payload)).toEqual({
      type: Types.GET_CIVIL_STATUS_SUCCESS,
      payload,
    })
  })

  test('if GetCivilStatusFailure returns the correct object', () => {
    expect(GetCivilStatusFailure()).toEqual({
      type: Types.GET_CIVIL_STATUS_FAILURE,
    })
  })
})
