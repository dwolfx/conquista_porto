import { Types } from './types'

const INITIAL_STATE = {
  data: null,
  isLoading: false,
  isLoadingNewSignature: false,
  hasError: false,
}

export default function(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case Types.POST_REQUEST:
      return {
        ...state,
        isLoading: true,
        hasError: false,
      }
    case Types.POST_SUCCESS:
      return {
        ...state,
        data: [...action.payload],
        isLoading: false,
      }
    case Types.POST_FAILURE:
      return {
        ...state,
        isLoading: false,
        hasError: true,
      }
    case Types.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      }
    case Types.POST_NEW_SIGNATURE:
      return {
        ...state,
        isLoadingNewSignature: true,
      }
    case Types.SET_LOADING_NEW_SIGNATURE:
      return {
        ...state,
        isLoadingNewSignature: action.payload,
      }
    default:
      return state
  }
}
