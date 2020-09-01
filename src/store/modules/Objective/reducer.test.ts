import reducer from './reducer'
import { Types } from './types'

const defaultState = {
  data: null,
  relculateFundsData: null,
  objectives: null,
  isLoading: false,
  hasError: false,
  isLoadingList: true,
  isLoadingBySimulate: false,
  isLoadingRelculateFundsData: false,
  hasErrorRelculateFundsData: false,
  isLoadingPutRecommendation: false,
  hasErrorPutRecommendation: false,
}

describe('Objective Insurance Reducer', () => {
  it('should return INITIAL_STATE', () => {
    expect(reducer(undefined, {})).toEqual(defaultState)
  })

  it('should handle GET_REQUEST', () => {
    expect(
      reducer(
        {
          ...defaultState,
        },
        {
          type: Types.GET_REQUEST,
        }
      )
    ).toEqual({
      ...defaultState,
      isLoadingList: true,
      hasError: false,
    })
  })

  it('should handle GET_SUCCESS', () => {
    expect(
      reducer(
        {
          ...defaultState,
        },
        {
          type: Types.GET_SUCCESS,
          payload: ['ok'],
        }
      )
    ).toEqual({
      ...defaultState,
      objectives: ['ok'],
      isLoadingList: false,
    })
  })

  it('should handle GET_FAILURE', () => {
    expect(
      reducer(
        {
          ...defaultState,
        },
        {
          type: Types.GET_FAILURE,
        }
      )
    ).toEqual({
      ...defaultState,
      isLoadingList: false,
      hasError: true,
    })
  })

  it('should handle POST_REQUEST', () => {
    expect(
      reducer(
        {
          ...defaultState,
        },
        {
          type: Types.POST_REQUEST,
        }
      )
    ).toEqual({
      ...defaultState,
      isLoading: true,
      hasError: false,
    })
  })

  it('should handle POST_REQUEST_BY_SIMULATE', () => {
    expect(
      reducer(
        {
          ...defaultState,
        },
        {
          type: Types.POST_REQUEST_BY_SIMULATE,
        }
      )
    ).toEqual({
      ...defaultState,
      isLoadingBySimulate: true,
    })
  })

  it('should handle POST_SUCCESS', () => {
    expect(
      reducer(
        {
          ...defaultState,
        },
        {
          type: Types.POST_SUCCESS,
          payload: { teste: 'ok' },
        }
      )
    ).toEqual({
      ...defaultState,
      data: { teste: 'ok' },
      isLoadingBySimulate: false,
      isLoading: false,
    })
  })

  it('should handle POST_FAILURE', () => {
    expect(
      reducer(
        {
          ...defaultState,
        },
        {
          type: Types.POST_FAILURE,
        }
      )
    ).toEqual({
      ...defaultState,
      isLoadingBySimulate: false,
      isLoading: false,
      hasError: true,
    })
  })

  it('should handle PUT_RECOMMENDATION_REQUEST', () => {
    expect(
      reducer(
        {
          ...defaultState,
        },
        {
          type: Types.PUT_RECOMMENDATION_REQUEST,
        }
      )
    ).toEqual({
      ...defaultState,
      isLoadingPutRecommendation: true,
      hasErrorPutRecommendation: false,
    })
  })

  it('should handle PUT_RECOMMENDATION_SUCCESS', () => {
    expect(
      reducer(
        {
          ...defaultState,
        },
        {
          type: Types.PUT_RECOMMENDATION_SUCCESS,
          payload: { teste: 'ok' },
        }
      )
    ).toEqual({
      ...defaultState,
      data: { teste: 'ok' },
      isLoadingPutRecommendation: false,
      hasErrorPutRecommendation: false,
    })
  })

  it('should handle PUT_RECOMMENDATION_FAILURE', () => {
    expect(
      reducer(
        {
          ...defaultState,
        },
        {
          type: Types.PUT_RECOMMENDATION_FAILURE,
        }
      )
    ).toEqual({
      ...defaultState,
      isLoadingPutRecommendation: false,
      hasErrorPutRecommendation: true,
    })
  })
  it('should handle POST_RECALCULATE_FUNDS_REQUEST', () => {
    expect(
      reducer(
        {
          ...defaultState,
        },
        {
          type: Types.POST_RECALCULATE_FUNDS_REQUEST,
        }
      )
    ).toEqual({
      ...defaultState,
      isLoadingRelculateFundsData: true,
      hasErrorRelculateFundsData: false,
    })
  })

  it('should handle POST_RECALCULATE_FUNDS_SUCCESS', () => {
    expect(
      reducer(
        {
          ...defaultState,
        },
        {
          type: Types.POST_RECALCULATE_FUNDS_SUCCESS,
          payload: { teste: 'ok' },
        }
      )
    ).toEqual({
      ...defaultState,
      relculateFundsData: { teste: 'ok' },
      isLoadingRelculateFundsData: false,
      hasErrorRelculateFundsData: false,
    })
  })

  it('should handle POST_RECALCULATE_FUNDS_FAILURE', () => {
    expect(
      reducer(
        {
          ...defaultState,
        },
        {
          type: Types.POST_RECALCULATE_FUNDS_FAILURE,
        }
      )
    ).toEqual({
      ...defaultState,
      isLoadingRelculateFundsData: false,
      hasErrorRelculateFundsData: true,
    })
  })

  it('should handle CLEAN_DATA', () => {
    expect(
      reducer(
        {
          ...defaultState,
        },
        {
          type: Types.CLEAN_DATA,
        }
      )
    ).toEqual({
      ...defaultState,
      data: {},
    })
  })
})
