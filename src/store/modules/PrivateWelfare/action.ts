import { Types, IPrivateWelfare, IPrivateWelfareWithStatusPRE } from './types'

export function GetPrivateWelfareRequest() {
  return {
    type: Types.PRIVATE_WELFARE_REQUEST,
  }
}
export function GetPrivateWelfareSuccess(payload: IPrivateWelfare[]) {
  return {
    type: Types.PRIVATE_WELFARE_SUCCESS,
    payload,
  }
}
export function GetPrivateWelfareFailure() {
  return {
    type: Types.PRIVATE_WELFARE_FAILURE,
  }
}
export function GetPrivateWelfareEmpty() {
  return {
    type: Types.PRIVATE_WELFARE_EMPTY,
  }
}
export function GetPrivateWelfareWithStatusPRERequest() {
  return {
    type: Types.PRIVATE_WELFARE_WITH_STATUS_PRE_REQUEST,
  }
}
export function GetPrivateWelfareWithStatusPRESuccess(
  payload: IPrivateWelfareWithStatusPRE
) {
  return {
    type: Types.PRIVATE_WELFARE_WITH_STATUS_PRE_SUCCESS,
    payload,
  }
}
export function GetPrivateWelfareWithStatusPREFailure() {
  return {
    type: Types.PRIVATE_WELFARE_WITH_STATUS_PRE_FAILURE,
  }
}
