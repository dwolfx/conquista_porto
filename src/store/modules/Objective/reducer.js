import { Types } from './types'

const INITIAL_STATE = {
  data: null,
  objectives: null,
  isLoading: false,
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.GET_REQUEST:
      return {
        ...state,
        isLoading: true,
      }
    case Types.GET_SUCCESS:
      return {
        ...state,
        objectives: action.payload,
        isLoading: false,
      }
    case Types.GET_FAILURE:
      return {
        ...state,
        isLoading: false,
      }
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
    case Types.CLEAN_DATA:
      return {
        ...state,
        data: {},
      }
    default:
      return state
  }
}
