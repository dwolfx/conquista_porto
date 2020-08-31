import { Types } from './types'
import {
  GetPositionDataRequest,
  GetPositionDataSuccess,
  GetPositionDataFailure,
  DisplayInformation,
  SetIdFund,
} from './action'

describe('Investment/Position actions', () => {
  test('if GetPositionDataRequest returns the correct object', () => {
    expect(GetPositionDataRequest()).toEqual({
      type: Types.ADD_REQUEST,
    })
  })

  test('if GetPositionDataSuccess returns the correct object', () => {
    const payload = [{}]
    expect(GetPositionDataSuccess(payload)).toEqual({
      type: Types.ADD_SUCCESS,
      payload,
    })
  })

  test('if GetPositionDataFailure returns the correct object', () => {
    expect(GetPositionDataFailure()).toEqual({
      type: Types.ADD_FAILURE,
    })
  })

  test('if DisplayInformation returns the correct object', () => {
    const displayInformation = true
    expect(DisplayInformation(displayInformation)).toEqual({
      type: Types.DISPLAY_INFORMATION,
      displayInformation,
    })
  })

  test('if SetIdFund returns the correct object', () => {
    const idFund = '5105'
    expect(SetIdFund(idFund)).toEqual({
      type: Types.SET_ID_FUND,
      idFund,
    })
  })
})
