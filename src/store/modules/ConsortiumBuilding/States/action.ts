import { Types, IPayload } from './types'

export function GetStatesRequest() {
  return {
    type: Types.GET_STATES_REQUEST,
  }
}

export function GetStatesSuccess(payload: IPayload) {
  return {
    type: Types.GET_STATES_SUCCESS,
    payload,
  }
}

export function GetStatesFailure() {
  return {
    type: Types.GET_STATES_FAILURE,
  }
}
