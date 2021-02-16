import { Types, ICivilStatusConsortiumBuilding } from './types'

export function GetCivilStatusRequest() {
  return {
    type: Types.GET_CIVIL_STATUS_REQUEST,
  }
}

export function GetCivilStatusSuccess(payload: ICivilStatusConsortiumBuilding) {
  return {
    type: Types.GET_CIVIL_STATUS_SUCCESS,
    payload,
  }
}

export function GetCivilStatusFailure() {
  return {
    type: Types.GET_CIVIL_STATUS_FAILURE,
  }
}
