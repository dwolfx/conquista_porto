import reducer from './reducer'
import { Types } from './types'

describe('Investment Details reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      data: {},
      isError: false,
      isLoading: false,
    })
  })

  it('should handle INVESTMENT_DETAILS_ADD_REQUEST', () => {
    expect(
      reducer(
        {
          data: {},
          isError: false,
          isLoading: false,
        },
        {
          type: Types.INVESTMENT_DETAILS_ADD_REQUEST,
        }
      )
    ).toEqual({
      data: {},
      isError: false,
      isLoading: true,
    })
  })

  it('should handle INVESTMENT_DETAILS_ADD_SUCCESS', () => {
    expect(
      reducer(
        {
          data: {},
          isError: false,
          isLoading: false,
        },
        {
          type: Types.INVESTMENT_DETAILS_ADD_SUCCESS,
          payload: { property: 'Some value' },
        }
      )
    ).toEqual({
      data: { property: 'Some value' },
      isError: false,
      isLoading: false,
    })
  })

  it('should handle INVESTMENT_DETAILS_ADD_FAILURE', () => {
    expect(
      reducer(
        {
          data: {},
          isError: false,
          isLoading: false,
        },
        {
          type: Types.INVESTMENT_DETAILS_ADD_FAILURE,
        }
      )
    ).toEqual({
      data: {},
      isError: true,
      isLoading: false,
    })
  })
})
