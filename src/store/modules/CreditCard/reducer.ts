import { ICreditCardState, Types } from './types'

const INITIAL_STATE: ICreditCardState = {
  data: null,
  hasError: false,
  isLoading: false,
  isCreationLayerOpen: false,
  clientData: null,
  isClientDataLoading: false,
  hasClientDataError: false,
}

export default function(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case Types.GET_REQUEST:
      return {
        ...state,
        isLoading: true,
        hasError: false,
      }
    case Types.GET_SUCCESS:
      return {
        ...state,
        data: [...action.payload],
        isLoading: false,
      }
    case Types.GET_FAILURE:
      return {
        ...state,
        isLoading: false,
        hasError: true,
      }
    case Types.OPEN_CREDIT_CARD_CREATION:
      return {
        ...state,
        isCreationLayerOpen: true,
      }
    case Types.CLOSE_CREDIT_CARD_CREATION:
      return {
        ...state,
        isCreationLayerOpen: false,
      }
    case Types.GET_CLIENT_DATA_REQUEST:
      return {
        ...state,
        isClientDataLoading: true,
        hasClientDataError: false,
      }
    case Types.GET_CLIENT_DATA_SUCCESS:
      return {
        ...state,
        clientData: action.payload,
        isClientDataLoading: false,
      }
    case Types.GET_CLIENT_DATA_FAILURE:
      return {
        ...state,
        isClientDataLoading: false,
        hasClientDataError: true,
      }
    default:
      return state
  }
}
