import { Types } from './types'

const INITIAL_STATE = {
  status: '',
  data: null,
  isLoading: false,
  hasError: false,
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.GET_REQUEST:
      return {
        ...state,
        isLoading: true,
        hasError: false,
      }
    case Types.GET_SUCCESS:
      return {
        ...state,
        status: 'loaded',
        data: [...action.payload],
        isLoading: false,
      }
    case Types.GET_FAILURE:
      return {
        ...state,
        data: [],
        isLoading: false,
        hasError: true,
      }
    default:
      return state
  }
}
