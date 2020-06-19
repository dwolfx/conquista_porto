import { Types } from './types'

const INITIAL_STATE = {
  data: null,
  displayInformation: false,
  idFund: null,
  hasError: false,
  isLoading: false,
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.ADD_REQUEST:
      return {
        ...state,
        isLoading: true,
      }
    case Types.ADD_SUCCESS:
      return {
        ...state,
        data: [...action.payload],
        isLoading: false,
      }
    case Types.ADD_FAILURE:
      return {
        ...state,
        isLoading: false,
        hasError: true,
      }
    case Types.DISPLAY_INFORMATION:
      return {
        ...state,
        displayInformation: action.displayInformation,
      }
    case Types.SET_ID_FUND:
      return {
        ...state,
        idFund: action.idFund,
      }
    default:
      return state
  }
}
