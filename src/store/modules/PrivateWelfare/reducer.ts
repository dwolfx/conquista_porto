import { Types } from './types'

const INITIAL_STATE = {
  data: null,
  hasError: false,
  isLoading: false,
  isEmpty: false,
  dataStatusPRE: null,
  hasErrorStatusPRE: false,
  isLoadingStatusPRE: false,
}

export default function(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case Types.PRIVATE_WELFARE_REQUEST:
      return {
        ...state,
        isLoading: true,
        hasError: false,
        isEmpty: false,
      }
    case Types.PRIVATE_WELFARE_SUCCESS:
      return {
        ...state,
        data: [...action.payload],
        isLoading: false,
        isEmpty: false,
      }
    case Types.PRIVATE_WELFARE_FAILURE:
      return {
        ...state,
        isLoading: false,
        hasError: true,
        isEmpty: false,
      }
    case Types.PRIVATE_WELFARE_EMPTY:
      return {
        ...state,
        isEmpty: true,
        isLoading: false,
        hasError: false,
      }
    case Types.PRIVATE_WELFARE_WITH_STATUS_PRE_REQUEST:
      return {
        ...state,
        hasErrorStatusPRE: false,
        isLoadingStatusPRE: true,
      }
    case Types.PRIVATE_WELFARE_WITH_STATUS_PRE_SUCCESS:
      return {
        ...state,
        dataStatusPRE: action.payload,
        isLoadingStatusPRE: false,
      }
    case Types.PRIVATE_WELFARE_WITH_STATUS_PRE_FAILURE:
      return {
        ...state,
        isLoadingStatusPRE: false,
        hasErrorStatusPRE: true,
      }
    default:
      return state
  }
}
