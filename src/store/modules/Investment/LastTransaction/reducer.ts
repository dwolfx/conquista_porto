import { Types } from './types'

const INITIAL_STATE = {
  data: null,
  hasError: false,
  isLoading: false,
}

interface IAction {
  type: keyof typeof Types
  payload: any
}

export default function(state = INITIAL_STATE, action: IAction) {
  switch (action.type) {
    case Types.LAST_TRANSACTION_GET_DATA_REQUEST:
      return {
        ...state,
        isLoading: true,
      }
    case Types.LAST_TRANSACTION_GET_DATA_SUCCESS:
      return {
        data: action.payload,
        hasError: false,
        isLoading: false,
      }
    case Types.LAST_TRANSACTION_GET_DATA_FAILURE:
      return {
        ...state,
        hasError: true,
        isLoading: false,
      }
    default:
      return state
  }
}
