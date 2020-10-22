import reducer from './reducer'
import { Types } from './types'

describe('Credit Card reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      data: null,
      hasError: false,
      isLoading: false,
      isCreationLayerOpen: false
    })
  })

  it('should handle GET_REQUEST', () => {
    expect(
      reducer(
        {
          data: null,
          hasError: false,
          isLoading: false,
          isCreationLayerOpen: false,
        },
        {
          type: Types.GET_REQUEST,
        }
      )
    ).toEqual({
      data: null,
      hasError: false,
      isLoading: true,
      isCreationLayerOpen: false,
    })
  })

  it('should handle GET_SUCCESS', () => {
    expect(
      reducer(
        {
          data: null,
          hasError: false,
          isLoading: false,
          isCreationLayerOpen: false,
        },
        {
          type: Types.GET_SUCCESS,
          payload: [{ name: 'Aqui tem coragi' }],
        }
      )
    ).toEqual({
      data: [{ name: 'Aqui tem coragi' }],
      hasError: false,
      isLoading: false,
      isCreationLayerOpen: false,
    })
  })

  it('should handle GET_FAILURE', () => {
    expect(
      reducer(
        {
          data: null,
          hasError: false,
          isLoading: false,
          isCreationLayerOpen: false,
        },
        {
          type: Types.GET_FAILURE,
        }
      )
    ).toEqual({
      data: null,
      hasError: true,
      isLoading: false,
      isCreationLayerOpen: false,
    })
  })
  it('should handle OPEN_CREDIT_CARD_CREATION', () => {
    expect(
      reducer(
        {
          data: null,
          hasError: false,
          isLoading: false,
          isCreationLayerOpen: false,
        },
        {
          type: Types.OPEN_CREDIT_CARD_CREATION,
        }
      )
    ).toEqual({
      data: null,
      hasError: false,
      isLoading: false,
      isCreationLayerOpen: true,
    })
  })
  it('should handle CLOSE_CREDIT_CARD_CREATION', () => {
    expect(
      reducer(
        {
          data: null,
          hasError: false,
          isLoading: false,
          isCreationLayerOpen: true,
        },
        {
          type: Types.CLOSE_CREDIT_CARD_CREATION,
        }
      )
    ).toEqual({
      data: null,
      hasError: false,
      isLoading: false,
      isCreationLayerOpen: false,
    })
  })
})
