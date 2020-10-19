import { Types } from './types'

const INITIAL_STATE = {
  data: null,
  isLoading: true,
  isLoadingObjectiveList: true,
  isLoadingDelete: false,
  isLoadingUpdate: false,
  isLoadingFundsMovement: false,
  hasErrorFundsMovement: false,
  isLoadingTransfer: false,
  isLoadingExtractFund: false,
  dataExtract: [],
}

export default function(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case Types.GET_REQUEST:
    case Types.POST_REQUEST:
    case Types.GET_REQUEST:
      return {
        ...state,
        isLoading: true,
      }
    case Types.GET_SUCCESS:
    case Types.POST_SUCCESS:
    case Types.GET_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isLoading: false,
      }
    case Types.GET_FAILURE:
    case Types.POST_FAILURE:
    case Types.GET_FAILURE:
      return {
        ...state,
        data: {},
        isLoading: false,
      }
    case Types.DELETE_REQUEST:
      return {
        ...state,
        isLoadingDelete: true,
      }
    case Types.DELETE_SUCCESS:
      return {
        ...state,
        isLoadingDelete: false,
        data: {},
      }
    case Types.DELETE_FAILURE:
      return {
        ...state,
        isLoadingDelete: false,
      }
    case Types.PUT_FUNDS_MOVEMENT_REQUEST:
      return {
        ...state,
        isLoadingFundsMovement: true,
        hasErrorFundsMovement: false,
      }
    case Types.PUT_FUNDS_MOVEMENT_SUCCESS:
      return {
        ...state,
        isLoadingFundsMovement: false,
        data: { ...action.payload },
      }
    case Types.PUT_FUNDS_MOVEMENT_FAILURE:
      return {
        ...state,
        isLoadingFundsMovement: false,
        hasErrorFundsMovement: true,
      }
    case Types.CLEAN_DATA:
      return {
        ...state,
        data: {},
      }
    case Types.UPDATE_OBJECTIVE_NICKNAME_REQUEST:
      return {
        ...state,
        isLoadingUpdate: true,
      }
    case Types.UPDATE_OBJECTIVE_NICKNAME_SUCCESS:
      return {
        ...state,
        isLoadingUpdate: false,
        data: {
          ...(state.data || {}),
          nickname: action.payload,
        },
      }
    case Types.UPDATE_OBJECTIVE_NICKNAME_FAILURE:
      return {
        ...state,
        isLoadingUpdate: false,
      }
    case Types.TRANSFER_BETWEEN_OBJECTIVES_REQUEST:
      return {
        ...state,
        isLoadingTransfer: true,
      }
    case Types.TRANSFER_BETWEEN_OBJECTIVES_SUCCESS:
      return {
        ...state,
        isLoadingTransfer: false,
        data: action.payload,
      }
    case Types.TRANSFER_BETWEEN_OBJECTIVES_FAILURE:
      return {
        ...state,
        isLoadingTransfer: false,
      }
    case Types.GET_OBJECTIVE_FUNDS_EXTRACT_REQUEST:
      return {
        ...state,
        isLoadingExtractFund: true,
      }
    case Types.GET_OBJECTIVE_FUNDS_EXTRACT_SUCCESS:
      return {
        ...state,
        isLoadingExtractFund: false,
        dataExtract: [...action.payload],
      }
    case Types.GET_OBJECTIVE_FUNDS_EXTRACT_FAILURE:
      return {
        ...state,
        isLoadingExtractFund: false,
        hasErrorFundsExtract: true,
      }
    default:
      return state
  }
}
