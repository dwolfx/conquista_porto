import { Types } from './types'

const INITIAL_STATE = {
  data: null,
  hasError: false,
  isLoading: false,
  isEmpty: false,
}

export default function(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case Types.PRIVATE_WELFARE_REQUEST:
      return {
        ...state,
        isLoading: true,
        hasError: false,
        isEmpty: false,
      }
    case Types.PRIVATE_WELFARE_SUCCESS:
      return {
        ...state,
        data: [...action.payload],
        isLoading: false,
        isEmpty: false,
      }
    case Types.PRIVATE_WELFARE_FAILURE:
      return {
        ...state,
        isLoading: false,
        hasError: true,
        isEmpty: false,
      }
    case Types.PRIVATE_WELFARE_EMPTY:
      return {
        ...state,
        isEmpty: true,
        isLoading: false,
        hasError: false,
      }
    default:
      return state
  }
}
