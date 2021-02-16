import { Types, IAction, ICivilStatusConsortiumBuildingState } from './types'

const INITIAL_STATE: ICivilStatusConsortiumBuildingState = {
  data: null,
  isLoading: false,
  hasError: false,
}

export default function(state = INITIAL_STATE, action: IAction) {
  switch (action.type) {
    case Types.GET_CIVIL_STATUS_REQUEST:
      return {
        ...state,
        isLoading: true,
        hasError: false,
      }
    case Types.GET_CIVIL_STATUS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isLoading: false,
      }
    case Types.GET_CIVIL_STATUS_FAILURE:
      return {
        ...state,
        isLoading: false,
        hasError: true,
      }
    default:
      return state
  }
}
