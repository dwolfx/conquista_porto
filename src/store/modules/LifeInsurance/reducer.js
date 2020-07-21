import { Types } from './types'

const INITIAL_STATE = {
  status: '',
  data: null,
  isLoading: false,
  hasError: false,
}

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.GET_DATA_REQUEST:
      return {
        ...state,
        hasError: false,
        isLoading: true,
      }
    case Types.GET_DATA_SUCCESS:
      return {
        ...state,
        status: 'loaded',
        data: [...action.payload],
        isLoading: false,
      }
    case Types.GET_DATA_FAILURE:
      return {
        ...state,
        isLoading: false,
        hasError: true,
      }
    default:
      return state
  }
}
