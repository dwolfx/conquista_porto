import { Types } from './types'
import {
  GetCountriesRequest,
  GetCountriesSuccess,
  GetCountriesFailure,
} from './action'

describe('Consortium Building Countries Actions', () => {
  test('if GetCountriesRequest returns the correct object', () => {
    expect(GetCountriesRequest()).toEqual({
      type: Types.GET_COUNTRIES_REQUEST,
    })
  })

  test('if GetCountriesSuccess returns the correct object', () => {
    const payload = {}

    expect(GetCountriesSuccess(payload)).toEqual({
      type: Types.GET_COUNTRIES_SUCCESS,
      payload,
    })
  })

  test('if GetCountriesFailure returns the correct object', () => {
    expect(GetCountriesFailure()).toEqual({
      type: Types.GET_COUNTRIES_FAILURE,
    })
  })
})
