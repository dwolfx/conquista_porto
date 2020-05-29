import { Types } from './types'

const INITIAL_STATE = {
  data: null,
  isLoading: false,
  hasError: false,
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.GET_RECOMMENDATIONS_REQUEST: {
      return {
        ...state,
        isLoading: true,
        hasError: false,
      }
    }
    case Types.GET_RECOMMENDATIONS_SUCCESS: {
      return {
        ...state,
        data: [...action.payload],
        isLoading: false,
      }
    }
    case Types.GET_RECOMMENDATIONS_FAILURE:
      return {
        ...state,
        isLoading: false,
        hasError: true,
      }
    default:
      return state
  }
}
