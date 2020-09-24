import { Types } from './types'
import { IConsolidatedPositionOld } from './iConsolidatedPosition'

export function GetConsolidatedPositionDataRequest() {
  return {
    type: Types.GET_REQUEST,
  }
}

export function GetConsolidatedPositionDataSuccess(
  payload: IConsolidatedPositionOld
) {
  return {
    type: Types.GET_SUCCESS,
    payload,
  }
}

export function GetConsolidatedPositionDataFailure() {
  return {
    type: Types.GET_FAILURE,
  }
}
