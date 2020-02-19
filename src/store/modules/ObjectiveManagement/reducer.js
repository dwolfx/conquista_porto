import { Types } from './types'

const INITIAL_STATE = {
  data: null,
  isLoading: false,
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.POST_REQUEST:
      return {
        ...state,
        isLoading: true,
      }
    case Types.POST_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isLoading: false,
      }
    case Types.POST_FAILURE:
      return {
        ...state,
        data: {},
        isLoading: false,
      }
    default:
      return state
  }
}
