import {
  Types,
  IGetFinancialApplicationAction,
  IPostFinancialApplicationAction,
  IGetFinancialApplicationDataResponse,
} from './types'

const INITIAL_STATE: {
  data: IGetFinancialApplicationDataResponse | null
  isLoading: boolean
  hasError: boolean
} = {
  data: null,
  isLoading: false,
  hasError: false,
}

export const financialApplicationGetData = function(
  state = INITIAL_STATE,
  action: IGetFinancialApplicationAction
) {
  switch (action.type) {
    case Types.DATA_GET_REQUEST:
      return {
        ...state,
        isLoading: true,
        hasError: false,
      }
    case Types.DATA_GET_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isLoading: false,
      }
    case Types.DATA_GET_FAILURE:
      return {
        ...state,
        isLoading: false,
        hasError: true,
      }
    case Types.UPDATE_ADHESION_TERM:
      const applicationData = state?.data?.dados_para_aplicacao
      const newState = {
        ...state,
        data: {
          ...state.data,
          dados_para_aplicacao: {
            ...applicationData,
            aderente_fundo: action.payload,
          },
        },
      }

      return {
        ...newState,
      }
    default:
      return state
  }
}

export const financialApplicationPostData = function(
  state = INITIAL_STATE,
  action: IPostFinancialApplicationAction
) {
  switch (action.type) {
    case Types.DATA_POST_REQUEST:
      return {
        ...state,
        isLoading: true,
        hasError: false,
      }
    case Types.DATA_POST_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isLoading: false,
      }
    case Types.DATA_POST_FAILURE:
      return {
        ...state,
        isLoading: false,
        hasError: true,
      }
    default:
      return state
  }
}
