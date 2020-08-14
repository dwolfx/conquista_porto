import reducer from './reducer'
import { Types } from './types'

describe('Summary Redeem reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      data: null,
      isLoading: false,
      hasError: false,
    })
  })

  it('should handle REDEEM_SUMMARY_GET_DATA_REQUEST', () => {
    expect(
      reducer(
        {
          data: null,
          hasError: false,
          isLoading: false,
        },
        {
          type: Types.REDEEM_SUMMARY_GET_DATA_REQUEST,
        }
      )
    ).toEqual({
      data: null,
      hasError: false,
      isLoading: true,
    })
  })

  it('should handle REDEEM_SUMMARY_GET_DATA_SUCCESS', () => {
    expect(
      reducer(
        {
          data: null,
          hasError: false,
          isLoading: false,
        },
        {
          type: Types.REDEEM_SUMMARY_GET_DATA_SUCCESS,
          payload: [{ name: 'É a verdade, não minto. Padrão badaras' }],
        }
      )
    ).toEqual({
      data: [{ name: 'É a verdade, não minto. Padrão badaras' }],
      hasError: false,
      isLoading: false,
    })
  })

  it('should handle REDEEM_SUMMARY_GET_DATA_FAILURE', () => {
    expect(
      reducer(
        {
          data: null,
          hasError: false,
          isLoading: false,
        },
        {
          type: Types.REDEEM_SUMMARY_GET_DATA_FAILURE,
        }
      )
    ).toEqual({
      data: null,
      hasError: true,
      isLoading: false,
    })
  })

  it('should handle REDDEM_SUMMARY_CLEAR_DATA', () => {
    const INITIAL_STATE = {
      data: null,
      hasError: false,
      isLoading: false,
    }
    expect(
      reducer(INITIAL_STATE, {
        type: Types.REDDEM_SUMMARY_CLEAR_DATA,
      })
    ).toEqual({
      data: null,
      isLoading: false,
      hasError: false,
    })
  })

  it('should handle REDDEM_SUMMARY_SET_LOADING', () => {
    const INITIAL_STATE = {
      data: null,
      hasError: false,
      isLoading: false,
    }
    expect(
      reducer(INITIAL_STATE, {
        type: Types.REDDEM_SUMMARY_SET_LOADING,
        payload: true,
      })
    ).toEqual({
      data: null,
      hasError: false,
      isLoading: true,
    })
  })
})
