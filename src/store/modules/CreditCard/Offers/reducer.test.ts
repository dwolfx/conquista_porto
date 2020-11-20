import reducer from './reducer'
import { Types } from './types'

describe('Credit Card Expiration Days reducer tests', () => {
  it('should exists', () => {
    expect(reducer).toBeDefined()
  })
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      data: null,
      hasError: false,
      isLoading: false,
    })
  })

  it('should handle GET_CREDIT_CARD_OFFERS_REQUEST', () => {
    expect(
      reducer(
        {
          data: null,
          hasError: false,
          isLoading: false,
        },
        {
          type: Types.GET_CREDIT_CARD_OFFERS_REQUEST,
        }
      )
    ).toEqual({
      data: null,
      hasError: false,
      isLoading: true,
    })
  })

  it('should handle GET_CREDIT_CARD_OFFERS_SUCCESS', () => {
    expect(
      reducer(
        {
          data: null,
          hasError: false,
          isLoading: false,
        },
        {
          type: Types.GET_CREDIT_CARD_OFFERS_SUCCESS,
          payload: { name: 'Aqui tem coragi' },
        }
      )
    ).toEqual({
      data: { name: 'Aqui tem coragi' },
      hasError: false,
      isLoading: false,
    })
  })

  it('should handle GET_CREDIT_CARD_OFFERS_FAILURE', () => {
    expect(
      reducer(
        {
          data: null,
          hasError: false,
          isLoading: false,
        },
        {
          type: Types.GET_CREDIT_CARD_OFFERS_FAILURE,
        }
      )
    ).toEqual({
      data: null,
      hasError: true,
      isLoading: false,
    })
  })
})
