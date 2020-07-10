import {
  Types,
  IGetFinantialApplicationAction,
  IPostFinantialApplicationAction,
} from './types'

const INITIAL_STATE = {
  data: null,
  isLoading: false,
  hasError: false,
}

export const finantialApplicationGetData = function(
  state = INITIAL_STATE,
  action: IGetFinantialApplicationAction
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
    default:
      return state
  }
}

export const finantialApplicationPostData = function(
  state = INITIAL_STATE,
  action: IPostFinantialApplicationAction
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
