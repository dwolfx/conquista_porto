import { Types } from './types'

export function PostVirtualKeyboardDataRequest() {
  return {
    type: Types.POST_REQUEST,
  }
}

export function PostVirtualKeyboardDataSuccess(payload: any) {
  return {
    type: Types.POST_SUCCESS,
    payload,
  }
}

export function PostVirtualKeyboardDataFailure() {
  return {
    type: Types.POST_FAILURE,
  }
}

export function PutVirtualKeyboardDataRequest(payload: string) {
  return {
    type: Types.PUT_REQUEST,
    payload,
  }
}

export function PutVirtualKeyboardDataSuccess() {
  return {
    type: Types.PUT_SUCCESS,
  }
}

export function PutVirtualKeyboardDataFailure() {
  return {
    type: Types.PUT_FAILURE,
  }
}
