import { Types } from './types'
import IPosition from './iPositions'

export function GetPositionDataRequest() {
  return {
    type: Types.POSITION_GET_DATA_REQUEST,
  }
}

export function GetPositionDataSuccess(payload: IPosition) {
  return {
    type: Types.POSITION_GET_DATA_SUCCESS,
    payload,
  }
}

export function GetPositionDataFailure() {
  return {
    type: Types.POSITION_GET_DATA_FAILURE,
  }
}

export function DisplayInformation(displayInformation: boolean) {
  return {
    type: Types.DISPLAY_INFORMATION,
    displayInformation,
  }
}

export function SetIdFund(idFund: number) {
  return {
    type: Types.SET_ID_FUND,
    idFund,
  }
}
