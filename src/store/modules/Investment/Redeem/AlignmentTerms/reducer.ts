import { Types, IGetRedeemAlignmentTermsAction } from './types'

const INITAL_STATE = {
  data: null,
  isLoading: false,
  hasError: false
}

export default function (state = INITAL_STATE, action: IGetRedeemAlignmentTermsAction) {
  switch(action.type) {
    case Types.DATA_TERMS_REQUEST:
      return {
        ...state,
        isLoading: true,
        hasError: false
      }
    case Types.DATA_TERMS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isLoading: false
      }
    case Types.DATA_TERMS_FAILURE:
      return {
        ...state,
        isLoading: false,
        hasError: true
      }
    default:
      return state
  }
}