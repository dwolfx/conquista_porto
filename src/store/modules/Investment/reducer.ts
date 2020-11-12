import { Types } from './types'

const INITIAL_STATE = {
  data: [],
  isLoading: false,
  isError: false,
}

export default function(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case Types.INVESTMENT_LIST_ADD_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
      }
    case Types.INVESTMENT_LIST_ADD_SUCCESS:
      return {
        ...state,
        data: [...action.payload],
        isLoading: false,
      }
    case Types.INVESTMENT_LIST_ADD_FAILURE:
      return { ...state, isLoading: false, isError: true }
    default:
      return state
  }
}
