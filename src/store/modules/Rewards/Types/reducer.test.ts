import reducer from './reducer'
import { Types } from './types'

describe('Rewards - Types reducer', () => {
  it('should return INITIAL_STATE', () => {
    expect(reducer(undefined, {})).toEqual({
      data: [],
      isLoading: false,
      hasError: false,
    })
  })
  it('should handle GET_TYPES_REQUEST', () => {
    expect(
      reducer(
        {
          data: [],
          hasError: false,
          isLoading: false,
        },
        { type: Types.GET_TYPES_REQUEST }
      )
    ).toEqual({
      data: [],
      isLoading: true,
      hasError: false,
    })
  })
  it('should handle GET_TYPES_SUCCESS', () => {
    expect(
      reducer(
        {
          data: [],
          isLoading: false,
          hasError: false,
        },
        {
          type: Types.GET_TYPES_SUCCESS,
          payload: [
            {
              id: 1,
              name: 'CADASTRO',
              quantity: 500,
            },
            {
              id: 4,
              name: 'PRIMEIRO OBJETIVO',
              quantity: 100,
            },
          ],
        }
      )
    ).toEqual({
      data: [
        {
          id: 1,
          name: 'CADASTRO',
          quantity: 500,
        },
        {
          id: 4,
          name: 'PRIMEIRO OBJETIVO',
          quantity: 100,
        },
      ],
      isLoading: false,
      hasError: false,
    })
  })
  it('should handle GET_TYPES_FAILURE', () => {
    expect(
      reducer(
        {
          data: [],
          hasError: false,
          isLoading: false,
        },
        {
          type: Types.GET_TYPES_FAILURE,
        }
      )
    ).toEqual({
      data: [],
      isLoading: false,
      hasError: true,
    })
  })
})
