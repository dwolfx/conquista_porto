import { Types } from './types'

const INITIAL_STATE = {
  data: null,
  isLoading: true,
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.ADD_REQUEST:
      return {
        ...state,
        isLoading: true,
      }
    case Types.ADD_SUCCESS:
      return {
        ...state,
        data: [...action.payload],
        isLoading: false,
      }
    case Types.ADD_FAILURE:
      return {
        ...state,
        data: [],
        isLoading: false,
      }
    default:
      return state
  }
}
