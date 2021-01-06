import reducer from './reducer'
import { Types } from './types'

describe('Trip Insurance credit card Reducer', () => {
  it('should return INITIAL_STATE', () => {
    expect(reducer(undefined, {})).toEqual({
      data: null,
      isLoading: false,
      hasError: false,
    })
  })

  it('should handle GET_TRIP_INSURANCE_CREDIT_CARD_REQUEST', () => {
    expect(
      reducer(
        {
          data: null,
          isLoading: false,
          hasError: false,
        },
        {
          type: Types.GET_TRIP_INSURANCE_CREDIT_CARD_REQUEST,
        }
      )
    ).toEqual({
      data: null,
      isLoading: true,
      hasError: false,
    })
  })

  it('should handle GET_TRIP_INSURANCE_CREDIT_CARD_SUCCESS', () => {
    expect(
      reducer(
        {
          data: null,
          isLoading: false,
          hasError: false,
        },
        {
          type: Types.GET_TRIP_INSURANCE_CREDIT_CARD_SUCCESS,
          payload: { ok: true },
        }
      )
    ).toEqual({
      data: { ok: true },
      hasError: false,
      isLoading: false,
    })
  })

  it('should handle GET_TRIP_INSURANCE_CREDIT_CARD_FAILURE', () => {
    expect(
      reducer(
        {
          data: null,
          hasError: false,
          isLoading: false,
        },
        {
          type: Types.GET_TRIP_INSURANCE_CREDIT_CARD_FAILURE,
        }
      )
    ).toEqual({
      data: null,
      hasError: true,
      isLoading: false,
    })
  })
})
