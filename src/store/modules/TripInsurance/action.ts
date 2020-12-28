import { Types } from './types'

export function GetTripInsuranceDataRequest() {
  return {
    type: Types.GET_DATA_REQUEST,
  }
}

export function GetTripInsuranceDataSuccess(payload: any) {
  return {
    type: Types.GET_DATA_SUCCESS,
    payload,
  }
}

export function GetTripInsuranceDataFailure() {
  return {
    type: Types.GET_DATA_FAILURE,
  }
}
