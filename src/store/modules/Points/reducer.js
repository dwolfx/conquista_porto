import { Types } from './types'

const INITIAL_STATE = {
  data: null,
  isLoadingExtract: false,
  hasErrorExtract: false,
  balanceData: {},
  isLoadingBalance: false,
  hasErrorBalance: false,
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.GET_EXTRACT_REQUEST:
      return {
        ...state,
        isLoadingExtract: true,
        hasErrorExtract: false,
      }
    case Types.GET_EXTRACT_SUCCESS:
      return {
        ...state,
        data: { ...action.payload },
        isLoadingExtract: false,
      }
    case Types.GET_EXTRACT_FAILURE:
      return {
        ...state,
        isLoadingExtract: false,
        hasErrorExtract: true,
      }
    case Types.GET_BALANCE_REQUEST:
      return {
        ...state,
        isLoadingBalance: true,
        hasErrorBalance: false,
      }
    case Types.GET_BALANCE_SUCCESS:
      return {
        ...state,
        balanceData: { ...action.payload },
        isLoadingBalance: false,
      }
    case Types.GET_BALANCE_FAILURE:
      return {
        ...state,
        isLoadingBalance: false,
        hasErrorBalance: true,
      }
    default:
      return state
  }
}
