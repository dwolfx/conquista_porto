import { Types, ISuccess } from './types'

export function GetContemplatedIntervalDataRequest() {
  return {
    type: Types.GET_REQUEST,
  }
}

export function GetContemplatedIntervalDataSuccess(payload: ISuccess) {
  return {
    type: Types.GET_SUCCESS,
    payload,
  }
}

export function GetContemplatedIntervalDataFailure() {
  return {
    type: Types.GET_FAILURE,
  }
}
