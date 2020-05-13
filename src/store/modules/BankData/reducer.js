import { Types } from './types'

const INITIAL_STATE = {
  data: null,
  status: '',
  hasError: false,
  isLoading: true,
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.BANK_DATA_GET_DATA_REQUEST:
      return {
        ...state,
        isLoading: true,
      }
    case Types.BANK_DATA_GET_DATA_SUCCESS:
      return {
        ...state,
        status: 'loaded',
        isLoading: false,
        data: action.payload,
      }
    case Types.BANK_DATA_GET_DATA_FAILURE:
      return {
        ...state,
        data: {},
        isLoading: false,
        hasError: true,
      }
    default:
      return state
  }
}
