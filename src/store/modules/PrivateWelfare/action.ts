import { Types, IPrivateWelfare } from './types'

export function GetPrivateWelfareRequest(cpf: string) {
  return {
    type: Types.PRIVATE_WELFARE_REQUEST,
    cpf
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
