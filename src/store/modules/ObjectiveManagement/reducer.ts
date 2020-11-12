import { Types } from './types'

const INITIAL_STATE = {
  data: null,
  isLoading: true,
  isLoadingSave: false,
  isLoadingDelete: false,
  otherGoalsManagement: {},
  isLoadingOtherGoals: true,
}

export default function(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case Types.POST_REQUEST:
    case Types.GET_REQUEST:
      return {
        ...state,
        isLoading: true,
      }
    case Types.POST_SUCCESS:
    case Types.GET_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isLoading: false,
      }
    case Types.POST_FAILURE:
    case Types.GET_FAILURE:
      return {
        ...state,
        data: {},
        isLoading: false,
      }
    case Types.POST_SAVE_FUNDS_REQUEST:
      return {
        ...state,
        isLoadingSave: true,
      }
    case Types.POST_SAVE_FUNDS_SUCCESS:
      return {
        ...state,
        data: action.payload ? action.payload : state.data,
        isLoadingSave: false,
      }
    case Types.POST_SAVE_FUNDS_FAILURE:
      return {
        ...state,
        error: true,
        isLoadingSave: false,
      }

    case Types.GET_OTHER_GOALS_REQUEST:
      return {
        ...state,
        isLoadingOtherGoals: true,
      }
    case Types.GET_OTHER_GOALS_SUCCESS:
      return {
        ...state,
        otherGoalsManagement: action.payload,
        isLoadingOtherGoals: false,
      }
    case Types.GET_OTHER_GOALS_FAILURE:
      return {
        ...state,
        otherGoalsManagement: {},
        isLoadingOtherGoals: false,
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
    case Types.CLEAN_DATA:
      return {
        ...state,
        data: {},
      }
    default:
      return state
  }
}
