import { Types } from './types'

export function GetPositionDataRequest(cpf) {
  return {
    type: Types.ADD_REQUEST,
    cpf,
  }
}

export function GetPositionDataSuccess(payload) {
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

export function DisplayInformation(displayInformation) {
  return {
    type: Types.DISPLAY_INFORMATION,
    displayInformation,
  }
}
