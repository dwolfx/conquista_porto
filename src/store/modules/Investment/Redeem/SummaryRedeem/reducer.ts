import { Types } from './types'

const INITIAL_STATE = {
  data: null,
  isLoading: false,
  hasError: false,
}

export default function (state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case Types.REDEEM_SUMMARY_GET_DATA_REQUEST:
      return {
        ...state,
        isLoading: true,
        hasError: false
      }
    case Types.REDEEM_SUMMARY_GET_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isLoading: false
      }
    case Types.REDEEM_SUMMARY_GET_DATA_FAILURE:
      return {
        ...state,
        isLoading: false,
        hasError: true
      }
    case Types.REDDEM_SUMMARY_CLEAR_DATA:
      return INITIAL_STATE
    default:
      return state
  }

}