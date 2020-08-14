import reducer from './reducer'
import { Types } from './types'

const defaultState = {
  hasErrorDetails: false,
  isLoadingDetails: true,
  detailsData: {},
  hasErrorSummary: false,
  isLoadingSummary: false,
  summaryData: {},
}

describe('Withdraw Reducer', () => {
  it('should return INITIAL_STATE', () => {
    expect(reducer(undefined, {})).toEqual(defaultState)
  })

  it('should handle GET_WITHDRAW_DETAILS_REQUEST', () => {
    expect(
      reducer(
        {
          ...defaultState,
        },
        {
          type: Types.GET_WITHDRAW_DETAILS_REQUEST,
        }
      )
    ).toEqual({
      ...defaultState,
      hasErrorDetails: false,
      isLoadingDetails: true,
    })
  })

  it('should handle GET_WITHDRAW_DETAILS_SUCCESS', () => {
    expect(
      reducer(
        {
          ...defaultState,
        },
        {
          type: Types.GET_WITHDRAW_DETAILS_SUCCESS,
          payload: {},
        }
      )
    ).toEqual({
      ...defaultState,
      isLoadingDetails: false,
      detailsData: {},
    })
  })

  it('should handle GET_WITHDRAW_DETAILS_FAILURE', () => {
    expect(
      reducer(
        {
          ...defaultState,
        },
        {
          type: Types.GET_WITHDRAW_DETAILS_FAILURE,
        }
      )
    ).toEqual({
      ...defaultState,
      hasErrorDetails: true,
      isLoadingDetails: false,
    })
  })

  it('should handle GET_WITHDRAW_SUMMARY_REQUEST', () => {
    expect(
      reducer(
        {
          ...defaultState,
        },
        {
          type: Types.GET_WITHDRAW_SUMMARY_REQUEST,
        }
      )
    ).toEqual({
      ...defaultState,
      hasErrorSummary: false,
      isLoadingSummary: true,
    })
  })

  it('should handle GET_WITHDRAW_SUMMARY_SUCCESS', () => {
    expect(
      reducer(
        {
          ...defaultState,
        },
        {
          type: Types.GET_WITHDRAW_SUMMARY_SUCCESS,
          payload: {},
        }
      )
    ).toEqual({
      ...defaultState,
      isLoadingSummary: false,
      summaryData: {},
    })
  })

  it('should handle GET_WITHDRAW_SUMMARY_FAILURE', () => {
    expect(
      reducer(
        {
          ...defaultState,
        },
        {
          type: Types.GET_WITHDRAW_SUMMARY_FAILURE,
        }
      )
    ).toEqual({
      ...defaultState,
      hasErrorSummary: true,
      isLoadingSummary: false,
    })
  })
})
