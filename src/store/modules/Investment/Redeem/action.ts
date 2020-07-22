import { Types, IGetRedeemRequest, IError } from './types'

export function GetRedeemRequest(payload: IGetRedeemRequest) {
  return {
    type: Types.REDEEM_DATA_GET_REQUEST,
    payload
  }
}

export function GetRedeemSuccess(payload: any) {
  return {
    type: Types.REDEEM_DATA_GET_SUCCESS,
    payload
  }
}

export function GetRedeemFailure({ message }: IError) {
  return {
    type: Types.REDEEM_DATA_GET_FAILURE,
    message
  }
}

export function RedeemLayerToggle() {
  return {
    type: Types.REDEEM_LAYER_TOGGLE
  }
}