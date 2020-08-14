import reducer from './reducer'
import { Types } from './types'

describe('Bank Data Reducer', () => {
  it('should return INITIAL_STATE', () => {
    expect(reducer(undefined, {})).toEqual({
      status: '',
      data: null,
      isLoading: true,
      hasError: false,
    })
  })

  it('should handle BANK_DATA_GET_DATA_REQUEST', () => {
    expect(
      reducer(
        {
          status: '',
          data: null,
          isLoading: false,
          hasError: false,
        },
        {
          type: Types.BANK_DATA_GET_DATA_REQUEST,
        }
      )
    ).toEqual({
      status: '',
      data: null,
      isLoading: true,
      hasError: false,
    })
  })

  it('should handle BANK_DATA_GET_DATA_SUCCESS', () => {
    expect(
      reducer(
        {
          status: '',
          data: null,
          isLoading: false,
          hasError: false,
        },
        {
          type: Types.BANK_DATA_GET_DATA_SUCCESS,
          payload: ['ok'],
        }
      )
    ).toEqual({
      data: ['ok'],
      hasError: false,
      status: 'loaded',
      isLoading: false,
    })
  })

  it('should handle BANK_DATA_GET_DATA_FAILURE', () => {
    expect(
      reducer(
        {
          data: null,
          hasError: false,
          status: '',
          isLoading: false,
        },
        {
          type: Types.BANK_DATA_GET_DATA_FAILURE,
        }
      )
    ).toEqual({
      data: {},
      status: '',
      hasError: true,
      isLoading: false,
    })
  })
})
