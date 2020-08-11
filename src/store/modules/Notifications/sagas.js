import { all, takeLatest, call, put } from 'redux-saga/effects'

import axios from 'axios'

import { Types } from './types'
import {
  GetDataSuccess,
  GetDataFailure,
  SendNotificationReadSuccess,
} from './action'

export function* getData() {
  try {
    const response = yield call(
      axios.get,
      'http://otclienthomm.portoseguro.brasil/NotificacoesWS/notificacao/buscar/36275312807'
    )
    yield put(GetDataSuccess(response.data))
  } catch (err) {
    yield put(GetDataFailure())
  }
}

export function* sendNoticationRead({ payload }) {
  const { notificationId, cpfCnpj } = payload
  try {
    const response = yield call(
      axios.get,
      `http://otclienthomm.portoseguro.brasil/NotificacoesWS/notificacao/lida/${notificationId}/${cpfCnpj}`
    )
    yield put(SendNotificationReadSuccess(response.data))
  } catch (err) {
    // supress error
    // yield put(SendNotificationReadFailure())
  }
}

export default all([
  takeLatest(Types.GET_DATA_REQUEST, getData),
  takeLatest(Types.SEND_NOTIFICATION_READ_REQUEST, sendNoticationRead),
])
