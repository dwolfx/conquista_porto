import { Types } from './types'
import {
  GetDataRequest,
  GetDataSuccess,
  GetDataFailure,
  SendNotificationReadRequest,
  SendNotificationReadSuccess,
} from './action'

describe('Notifications Actions', () => {
  test('if GetDataRequest returns the correct object', () => {
    expect(GetDataRequest()).toEqual({
      type: Types.GET_DATA_REQUEST,
    })
  })

  test('if GetDataSuccess returns the correct object', () => {
    const payload = {}

    expect(GetDataSuccess(payload)).toEqual({
      type: Types.GET_DATA_SUCCESS,
      payload,
    })
  })

  test('if GetDataFailure returns the correct object', () => {
    expect(GetDataFailure()).toEqual({
      type: Types.GET_DATA_FAILURE,
    })
  })

  test('if SendNotificationReadRequest returns the correct object', () => {
    const notificationId = 1;
    const cpfCnpj = "11111111111";
    const payload = {
      notificationId,
      cpfCnpj
    }
    expect(SendNotificationReadRequest(notificationId, cpfCnpj)).toEqual({
      type: Types.SEND_NOTIFICATION_READ_REQUEST,
      payload
    })
  })

  test('if SendNotificationReadSuccess returns the correct object', () => {
    const notificationId = 1;
    const payload = notificationId
    
    expect(SendNotificationReadSuccess(notificationId)).toEqual({
      type: Types.SEND_NOTIFICATION_READ_SUCCESS,
      payload
    })
  })
})
