import { ZipCodeType, ZipCodeState, ActionTypes } from './types'

const INITIAL_STATE: ZipCodeState = {
  data: null,
  isLoading: false,
  hasError: false,
}

export default function(state = INITIAL_STATE, action: ActionTypes) {
  switch (action.type) {
    case ZipCodeType.GET_DATA_REQUEST:
      return {
        ...state,
        isLoading: true,
        hasError: false,
      }
    case ZipCodeType.GET_DATA_SUCCESS:
      return {
        ...state,
        hasError: false,
        data: action.payload,
        isLoading: false,
      }
    case ZipCodeType.GET_DATA_FAILURE:
      return {
        ...state,
        isLoading: false,
        hasError: true,
      }
    case ZipCodeType.GET_DATA_CLEAN:
      return {
        ...state,
        data: null,
        isLoading: false,
        hasError: false,
      }
    default:
      return state
  }
}
