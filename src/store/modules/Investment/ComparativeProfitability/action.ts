import { Types } from './types'
import IComparativeProfitability from './iComparativeProfitability'

export function GetComparativeProfitabilityDataRequest(fundId: string) {
  return {
    type: Types.COMPARATIVE_PROFITABILITY_GET_DATA_REQUEST,
    fundId,
  }
}

export function GetComparativeProfitabilityDataSuccess(
  payload: IComparativeProfitability
) {
  return {
    type: Types.COMPARATIVE_PROFITABILITY_GET_DATA_SUCCESS,
    payload,
  }
}

export function GetComparativeProfitabilityDataFailure() {
  return {
    type: Types.COMPARATIVE_PROFITABILITY_GET_DATA_FAILURE,
  }
}
