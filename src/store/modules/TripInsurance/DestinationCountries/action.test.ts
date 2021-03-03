import { Types } from './types'
import {
  GetDestinationCountriesRequest,
  GetDestinationCountriesSuccess,
  GetDestinationCountriesFailure,
} from './action'

describe('Trip Insurance Actions', () => {
  test('if GetDestinationCountriesRequest returns the correct object', () => {
    expect(GetDestinationCountriesRequest()).toEqual({
      type: Types.GET_DESTINATION_COUNTRIES_REQUEST,
    })
  })

  test('if GetDestinationCountriesSuccess returns the correct object', () => {
    const payload = {}

    expect(GetDestinationCountriesSuccess(payload)).toEqual({
      type: Types.GET_DESTINATION_COUNTRIES_SUCCESS,
      payload,
    })
  })

  test('if GetDestinationCountriesFailure returns the correct object', () => {
    expect(GetDestinationCountriesFailure()).toEqual({
      type: Types.GET_DESTINATION_COUNTRIES_FAILURE,
    })
  })
})
