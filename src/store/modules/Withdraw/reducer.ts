import { Types } from './types'

interface IState {
  hasErrorDetails: boolean
  isLoadingDetails: boolean
  detailsData: any
  hasErrorSummary: boolean
  isLoadingSummary: boolean
  summaryData: any
}

const INITIAL_STATE: IState = {
  hasErrorDetails: false,
  isLoadingDetails: true,
  detailsData: {},
  hasErrorSummary: false,
  isLoadingSummary: false,
  summaryData: {},
}

export default function(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case Types.GET_WITHDRAW_DETAILS_REQUEST:
      return {
        ...state,
        hasErrorDetails: false,
        isLoadingDetails: true,
      }
    case Types.GET_WITHDRAW_DETAILS_SUCCESS:
      return {
        ...state,
        isLoadingDetails: false,
        detailsData: { ...action.payload },
      }
    case Types.GET_WITHDRAW_DETAILS_FAILURE:
      return {
        ...state,
        hasErrorDetails: true,
        isLoadingDetails: false,
      }
    case Types.GET_WITHDRAW_SUMMARY_REQUEST:
      return {
        ...state,
        hasErrorSummary: false,
        isLoadingSummary: true,
      }
    case Types.GET_WITHDRAW_SUMMARY_SUCCESS:
      return {
        ...state,
        isLoadingSummary: false,
        summaryData: { ...action.payload },
      }
    case Types.GET_WITHDRAW_SUMMARY_FAILURE:
      return {
        ...state,
        hasErrorSummary: true,
        isLoadingSummary: false,
      }
    default:
      return state
  }
}
