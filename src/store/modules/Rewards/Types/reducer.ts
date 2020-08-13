import { Types } from './types'

const INITIAL_STATE = {
  data: [],
  isLoading: false,
  hasError: false,
}

export default function(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case Types.GET_TYPES_REQUEST: {
      return {
        ...state,
        isLoading: true,
        hasError: false,
      }
    }
    case Types.GET_TYPES_SUCCESS: {
      return {
        ...state,
        data: [...action.payload],
        isLoading: false,
      }
    }
    case Types.GET_TYPES_FAILURE:
      return {
        ...state,
        isLoading: false,
        hasError: true,
      }
    default:
      return state
  }
}
