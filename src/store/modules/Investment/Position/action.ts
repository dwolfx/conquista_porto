import { Types } from './types'

export function GetPositionDataRequest() {
  return {
    type: Types.ADD_REQUEST,
  }
}

export function GetPositionDataSuccess(payload: any) {
  return {
    type: Types.ADD_SUCCESS,
    payload,
  }
}

export function GetPositionDataFailure() {
  return {
    type: Types.ADD_FAILURE,
  }
}

export function DisplayInformation(displayInformation: boolean) {
  return {
    type: Types.DISPLAY_INFORMATION,
    displayInformation,
  }
}

export function SetIdFund(idFund: string | number) {
  return {
    type: Types.SET_ID_FUND,
    idFund,
  }
}
