import { Types, IAction, ITripInsuranceQuotation } from './types'

const INITIAL_STATE: ITripInsuranceQuotation = {
  data: null,
  isLoading: false,
  hasError: false,
}

export default function(state = INITIAL_STATE, action: IAction) {
  switch (action.type) {
    case Types.POST_INSURANCE_QUOTATION_REQUEST:
      return {
        ...state,
        isLoading: true,
        hasError: false,
      }
    case Types.POST_INSURANCE_QUOTATION_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isLoading: false,
      }
    case Types.POST_INSURANCE_QUOTATION_FAILURE:
      return {
        ...state,
        isLoading: false,
        hasError: true,
      }
    default:
      return state
  }
}
