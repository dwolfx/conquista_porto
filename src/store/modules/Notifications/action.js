import { Types } from './types'

export function GetDataRequest() {
  return {
    type: Types.GET_DATA_REQUEST,
  }
}

export function GetDataSuccess(payload) {
  return {
    type: Types.GET_DATA_SUCCESS,
    payload,
  }
}

export function GetDataFailure() {
  return {
    type: Types.GET_DATA_FAILURE,
  }
}

export function SendNotificationReadRequest(notificationId, cpfCnpj) {
  return {
    type: Types.SEND_NOTIFICATION_READ_REQUEST,
    payload: { notificationId, cpfCnpj },
  }
}

export function SendNotificationReadSuccess(notificationId) {
  return {
    type: Types.SEND_NOTIFICATION_READ_SUCCESS,
    payload: notificationId,
  }
}
