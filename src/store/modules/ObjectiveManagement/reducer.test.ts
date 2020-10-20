import reducer from './reducer'
import { Types } from './types'

const defaultState = {
  data: null,
  isLoading: true,
  isLoadingObjectiveList: true,
  isLoadingDelete: false,
  isLoadingUpdate: false,
  isLoadingFundsMovement: false,
  hasErrorFundsMovement: false,
  isLoadingTransfer: false,
  isLoadingExtractFund: false,
  dataExtract: [],
}

describe('ObjectiveManagement Reducer', () => {
  it('should return INITIAL_STATE', () => {
    expect(reducer(undefined, {})).toEqual(defaultState)
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
          payload: {},
        }
      )
    ).toEqual({
      ...defaultState,
      data: {},
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
      data: {},
      isLoading: false,
    })
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
      isLoading: true,
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
          payload: {},
        }
      )
    ).toEqual({
      ...defaultState,
      data: {},
      isLoading: false,
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
      data: {},
      isLoading: false,
    })
  })

  it('should handle DELETE_REQUEST', () => {
    expect(
      reducer(
        {
          ...defaultState,
        },
        {
          type: Types.DELETE_REQUEST,
        }
      )
    ).toEqual({
      ...defaultState,
      isLoadingDelete: true,
    })
  })

  it('should handle DELETE_SUCCESS', () => {
    expect(
      reducer(
        {
          ...defaultState,
        },
        {
          type: Types.DELETE_SUCCESS,
        }
      )
    ).toEqual({
      ...defaultState,
      isLoadingDelete: false,
      data: {},
    })
  })

  it('should handle DELETE_FAILURE', () => {
    expect(
      reducer(
        {
          ...defaultState,
        },
        {
          type: Types.DELETE_FAILURE,
        }
      )
    ).toEqual({
      ...defaultState,
      isLoadingDelete: false,
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

  it('should handle DEFAULT', () => {
    expect(
      reducer(
        {
          ...defaultState,
        },
        {
          type: null,
        }
      )
    ).toEqual(defaultState)
  })
})
