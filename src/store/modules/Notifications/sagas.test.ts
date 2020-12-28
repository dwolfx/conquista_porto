import { call, put } from 'redux-saga/effects'
import axios from 'axios'

import { getData, sendNoticationRead } from './sagas'
import {
  GetDataSuccess,
  GetDataFailure,
  SendNotificationReadSuccess,
} from './action'

describe('Notifications Sagas', () => {
  it('generator success triggers success action', () => {
    const generator = getData()
    const response = { data: {} }

    expect(generator.next().value).toEqual(
      call(
        axios.get,
        `http://otclienthomm.portoseguro.brasil/NotificacoesWS/notificacao/buscar/36275312807`
      )
    )

    expect(generator.next(response).value).toEqual(
      put(GetDataSuccess(response.data))
    )

    expect(generator.next()).toEqual({ done: true, value: undefined })
  })

  it('generator failure triggers failure action', () => {
    const generator = getData()
    const response = undefined
    expect(generator.next().value).toEqual(
      call(
        axios.get,
        `http://otclienthomm.portoseguro.brasil/NotificacoesWS/notificacao/buscar/36275312807`
      )
    )
    expect(generator.next(response).value).toEqual(put(GetDataFailure()))
    expect(generator.next()).toEqual({ done: true, value: undefined })
  })

  it('sendNoticationRead success triggers success action', () => {
    const param = { payload: { notificationId: 1, cpfCnpj: '1111111111' } }
    const generator = sendNoticationRead(param)
    const response = { data: {} }

    expect(generator.next().value).toEqual(
      call(
        axios.get,
        `http://otclienthomm.portoseguro.brasil/NotificacoesWS/notificacao/lida/${param.payload.notificationId}/${param.payload.cpfCnpj}`
      )
    )

    expect(generator.next(response).value).toEqual(
      put(SendNotificationReadSuccess(response.data))
    )

    expect(generator.next()).toEqual({ done: true, value: undefined })
  })
})
