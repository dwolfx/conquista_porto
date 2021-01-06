import reducer from './reducer'
import { Types } from './types'

describe('Trip Insurance insurance quotation Reducer', () => {
  it('should return INITIAL_STATE', () => {
    expect(reducer(undefined, {})).toEqual({
      data: null,
      isLoading: false,
      hasError: false,
    })
  })

  it('should handle POST_INSURANCE_QUOTATION_REQUEST', () => {
    expect(
      reducer(
        {
          data: null,
          isLoading: false,
          hasError: false,
        },
        {
          type: Types.POST_INSURANCE_QUOTATION_REQUEST,
        }
      )
    ).toEqual({
      data: null,
      isLoading: true,
      hasError: false,
    })
  })

  it('should handle POST_INSURANCE_QUOTATION_SUCCESS', () => {
    expect(
      reducer(
        {
          data: null,
          isLoading: false,
          hasError: false,
        },
        {
          type: Types.POST_INSURANCE_QUOTATION_SUCCESS,
          payload: { ok: true },
        }
      )
    ).toEqual({
      data: { ok: true },
      hasError: false,
      isLoading: false,
    })
  })

  it('should handle POST_INSURANCE_QUOTATION_FAILURE', () => {
    expect(
      reducer(
        {
          data: null,
          hasError: false,
          isLoading: false,
        },
        {
          type: Types.POST_INSURANCE_QUOTATION_FAILURE,
        }
      )
    ).toEqual({
      data: null,
      hasError: true,
      isLoading: false,
    })
  })
})
