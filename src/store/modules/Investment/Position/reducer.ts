import { Types } from './types'
import IPosition from './iPositions'

const INITIAL_STATE = {
  data: null,
  displayInformation: false,
  idFund: null,
  hasError: false,
  isLoading: false,
}

interface IAction {
  type: keyof typeof Types
  payload?: IPosition
  displayInformation?: boolean
  idFund: number
}

export default function(state = INITIAL_STATE, action: IAction) {
  switch (action.type) {
    case Types.POSITION_GET_DATA_REQUEST:
      return {
        ...state,
        isLoading: true,
      }
    case Types.POSITION_GET_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isLoading: false,
      }
    case Types.POSITION_GET_DATA_FAILURE:
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
