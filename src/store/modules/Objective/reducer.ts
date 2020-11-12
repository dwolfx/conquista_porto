import { Types } from './types'

const INITIAL_STATE = {
  data: null,
  relculateFundsData: null,
  objectives: null,
  isLoading: false,
  hasError: false,
  isLoadingList: true,
  isLoadingBySimulate: false,
  isLoadingRelculateFundsData: false,
  hasErrorRelculateFundsData: false,
  isLoadingPutRecommendation: false,
  hasErrorPutRecommendation: false,
}

export default function(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case Types.GET_REQUEST:
      return {
        ...state,
        isLoadingList: true,
        hasError: false,
      }
    case Types.GET_SUCCESS:
      return {
        ...state,
        objectives: action.payload,
        isLoadingList: false,
      }
    case Types.GET_FAILURE:
      return {
        ...state,
        isLoadingList: false,
        hasError: true,
      }
    case Types.POST_REQUEST:
      return {
        ...state,
        isLoading: true,
        hasError: false,
      }
    case Types.POST_REQUEST_BY_SIMULATE:
      return {
        ...state,
        isLoadingBySimulate: true,
      }
    case Types.POST_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isLoadingBySimulate: false,
        isLoading: false,
      }
    case Types.POST_FAILURE:
      return {
        ...state,
        isLoadingBySimulate: false,
        isLoading: false,
        hasError: true,
      }
    case Types.PUT_RECOMMENDATION_REQUEST:
      return {
        ...state,
        isLoadingPutRecommendation: true,
        hasErrorPutRecommendation: false,
      }
    case Types.PUT_RECOMMENDATION_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isLoadingPutRecommendation: false,
        hasErrorPutRecommendation: false,
      }
    case Types.PUT_RECOMMENDATION_FAILURE:
      return {
        ...state,
        isLoadingPutRecommendation: false,
        hasErrorPutRecommendation: true,
      }
    case Types.POST_RECALCULATE_FUNDS_REQUEST:
      return {
        ...state,
        isLoadingRelculateFundsData: true,
        hasErrorRelculateFundsData: false,
      }
    case Types.POST_RECALCULATE_FUNDS_SUCCESS:
      return {
        ...state,
        relculateFundsData: action.payload,
        isLoadingRelculateFundsData: false,
        hasErrorRelculateFundsData: false,
      }
    case Types.POST_RECALCULATE_FUNDS_FAILURE:
      return {
        ...state,
        isLoadingRelculateFundsData: false,
        hasErrorRelculateFundsData: true,
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
