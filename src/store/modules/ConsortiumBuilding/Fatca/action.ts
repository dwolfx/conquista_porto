import { Types, IFatcaConsortiumBuilding } from './types'

export function GetFatcaRequest() {
  return {
    type: Types.GET_FATCA_REQUEST,
  }
}

export function GetFatcaSuccess(payload: IFatcaConsortiumBuilding) {
  return {
    type: Types.GET_FATCA_SUCCESS,
    payload,
  }
}

export function GetFatcaFailure() {
  return {
    type: Types.GET_FATCA_FAILURE,
  }
}
