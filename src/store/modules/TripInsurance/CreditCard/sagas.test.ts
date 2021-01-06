import { call, put } from 'redux-saga/effects'
import { get, baseURLNamespaceInvest } from 'services/api'
import tripInsuranceCreditCardMock from 'mocks/tripInsuranceCreditCard.json'

import { getCreditCards } from './sagas'
import {
  GetTripInsuranceCreditCardSuccess,
  GetTripInsuranceCreditCardFailure,
} from './action'

import { IDestinationCountry, IFilteredDestinationCountry } from './types'

describe('Trip Insurance credit card Sagas', () => {
  it('success triggers success action with credit card data', () => {
    const generator = getCreditCards()
    const response = { data: tripInsuranceCreditCardMock }

    expect(generator.next().value).toEqual(
      call(get, `${baseURLNamespaceInvest}/cartoes?codigoCanal=1&integracao=1`)
    )

    expect(generator.next(response).value).toEqual(
      put(
        GetTripInsuranceCreditCardSuccess({
          Message: {
            TipoCritica: '',
            Mensagem: '',
          },
          creditCards: response.data,
        })
      )
    )

    expect(generator.next()).toEqual({ done: true, value: undefined })
  })
  it('success triggers success action without credit card data', () => {
    const generator = getCreditCards()
    const response = {
      data: {
        Message: {
          TipoCritica: 'SUCESSO',
          Mensagem: 'SUCESSO',
        },
      },
    }

    expect(generator.next().value).toEqual(
      call(get, `${baseURLNamespaceInvest}/cartoes?codigoCanal=1&integracao=1`)
    )

    expect(generator.next(response).value).toEqual(
      put(
        GetTripInsuranceCreditCardSuccess({ ...response.data, creditCards: [] })
      )
    )

    expect(generator.next()).toEqual({ done: true, value: undefined })
  })
  it('failure triggers failure action', () => {
    const generator = getCreditCards()
    const response = undefined
    expect(generator.next().value).toEqual(
      call(get, `${baseURLNamespaceInvest}/cartoes?codigoCanal=1&integracao=1`)
    )
    expect(generator.next(response).value).toEqual(
      put(GetTripInsuranceCreditCardFailure())
    )
    expect(generator.next()).toEqual({ done: true, value: undefined })
  })
})
