import reducer from './reducer'
import { Types } from './types'
import mock from './mock.json'

describe('PrivateWelfare reducer tests', () => {
  it('should return INITIAL_STATE', () => {
    expect(reducer(undefined, {})).toEqual({
      data: null,
      hasError: false,
      isLoading: false,
      isEmpty: false,
    })
  })
  it('should handle PRIVATE_WELFARE_REQUEST', () => {
    expect(
      reducer(
        {
          data: null,
          hasError: false,
          isLoading: false,
          isEmpty: false,
        },
        {
          type: Types.PRIVATE_WELFARE_REQUEST,
        }
      )
    ).toEqual({
      data: null,
      hasError: false,
      isLoading: true,
      isEmpty: false,
    })
  })
  it('should handle PRIVATE_WELFARE_SUCCESS', () => {
    expect(
      reducer(
        {
          data: null,
          hasError: false,
          isLoading: false,
          isEmpty: false,
        },
        {
          type: Types.PRIVATE_WELFARE_SUCCESS,
          payload: mock,
        }
      )
    ).toEqual({
      hasError: false,
      isLoading: false,
      data: mock,
      isEmpty: false,
    })
  })
  it('should handle PRIVATE_WELFARE_FAILURE', () => {
    expect(
      reducer(
        {
          data: null,
          hasError: false,
          isLoading: false,
          isEmpty: false,
        },
        {
          type: Types.PRIVATE_WELFARE_FAILURE,
        }
      )
    ).toEqual({
      data: null,
      hasError: true,
      isLoading: false,
      isEmpty: false,
    })
  })
  it('should handle PRIVATE_WELFARE_EMPTY', () => {
    expect(
      reducer(
        {
          data: null,
          hasError: false,
          isLoading: false,
          isEmpty: false,
        },
        {
          type: Types.PRIVATE_WELFARE_EMPTY,
        }
      )
    ).toEqual({
      data: null,
      hasError: false,
      isLoading: false,
      isEmpty: true,
    })
  })
})
