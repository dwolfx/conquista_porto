import { Types } from './types'

export function GetConsortiumBuildingDataRequest(payload) {
  return {
    type: Types.GET_REQUEST,
    payload,
  }
}

export function GetConsortiumBuildingDataSuccess(payload) {
  return {
    type: Types.GET_SUCCESS,
    payload,
  }
}

export function GetConsortiumBuildingDataFailure() {
  return {
    type: Types.GET_FAILURE,
  }
}
