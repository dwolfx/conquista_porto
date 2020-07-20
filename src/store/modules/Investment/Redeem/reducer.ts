import { Types } from './types'

const INITIAL_STATE = {
  data: null,
  isLoading: false,
  hasError: false,
}

export const financialApplicationGetData = function(
  state = INITIAL_STATE,
  action: any
) {
  switch (action.type) {
    case Types.DATA_GET_REQUEST:
      return {
        ...state,
        isLoading: true,
        hasError: false,
      }
    case Types.DATA_GET_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isLoading: false,
      }
    case Types.DATA_GET_FAILURE:
      return {
        ...state,
        isLoading: false,
        hasError: true,
      }
    default:
      return state
  }
}