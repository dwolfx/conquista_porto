import { Types } from './types'
import { GetStatesRequest, GetStatesSuccess, GetStatesFailure } from './action'

describe('Consortium Building States Actions', () => {
  test('if GetStatesRequest returns the correct object', () => {
    expect(GetStatesRequest()).toEqual({
      type: Types.GET_STATES_REQUEST,
    })
  })

  test('if GetStatesSuccess returns the correct object', () => {
    const payload = {}

    expect(GetStatesSuccess(payload)).toEqual({
      type: Types.GET_STATES_SUCCESS,
      payload,
    })
  })

  test('if GetStatesFailure returns the correct object', () => {
    expect(GetStatesFailure()).toEqual({
      type: Types.GET_STATES_FAILURE,
    })
  })
})
