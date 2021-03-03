import reducer from './reducer'
import { Types } from './types'

describe('Credit Card Expiration Days reducer tests', () => {
  it('should be defined', () => {
    expect(reducer).toBeDefined()
  })
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      data: null,
      hasError: false,
      isLoading: false,
    })
  })
  it('should handle loading', () => {
    const initialState = {
      data: null,
      hasError: false,
      isLoading: false,
    }
    expect(
      reducer(initialState, { type: Types.CREDIT_CARD_OCCUPATION_REQUEST })
    ).toEqual({
      data: null,
      hasError: false,
      isLoading: true,
    })
  })
  it('should handle failure', () => {
    const initialState = {
      data: null,
      hasError: false,
      isLoading: false,
    }
    expect(
      reducer(initialState, { type: Types.CREDIT_CARD_OCCUPATION_FAILURE })
    ).toEqual({
      data: null,
      hasError: true,
      isLoading: false,
    })
  })
  it('should handle success', () => {
    const initialState = {
      data: null,
      hasError: false,
      isLoading: false,
    }
    expect(
      reducer(initialState, {
        type: Types.CREDIT_CARD_OCCUPATION_SUCCESS,
        payload: { name: 'Teste' },
      })
    ).toEqual({
      data: { name: 'Teste' },
      hasError: false,
      isLoading: false,
    })
  })
})
