import { call, put } from 'redux-saga/effects'
import { get, baseURLNamespaceInvest } from 'services/api'
import tripInsuranceCreditCardMock from 'mocks/tripInsuranceCreditCard.json'
import { Steps } from 'pages/TripInsurance/Creation/types'

import { getCreditCards } from './sagas'
import {
  GetTripInsuranceCreditCardSuccess,
  GetTripInsuranceCreditCardFailure,
} from './action'

describe('Trip Insurance credit card Sagas', () => {
  it('success triggers success action with credit card data and success function', () => {
    const onSuccessFunction = jest.fn()
    const generator = getCreditCards({
      type: 'GET_TRIP_INSURANCE_CREDIT_CARD_REQUEST',
      onSuccess: onSuccessFunction,
      Step: Steps.paymentStep,
      onErrorToast: () => {},
    })
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

    expect(onSuccessFunction).toHaveBeenCalled()
  })
  it('success triggers success action with credit card data and without success function', () => {
    const onSuccessFunction = jest.fn()
    const generator = getCreditCards({
      type: 'GET_TRIP_INSURANCE_CREDIT_CARD_REQUEST',
      onSuccess: undefined,
      Step: undefined,
      onErrorToast: () => {},
    })
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
    const generator = getCreditCards({
      type: 'GET_TRIP_INSURANCE_CREDIT_CARD_REQUEST',
      onSuccess: () => {},
      Step: Steps.paymentStep,
      onErrorToast: () => {},
    })
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
    const addToast = jest.fn()
    const generator = getCreditCards({
      type: 'GET_TRIP_INSURANCE_CREDIT_CARD_REQUEST',
      onSuccess: () => {},
      Step: Steps.paymentStep,
      onErrorToast: addToast,
    })
    const response = undefined
    expect(generator.next().value).toEqual(
      call(get, `${baseURLNamespaceInvest}/cartoes?codigoCanal=1&integracao=1`)
    )
    expect(generator.next(response).value).toEqual(
      put(GetTripInsuranceCreditCardFailure())
    )
    expect(generator.next()).toEqual({ done: true, value: undefined })
    expect(addToast).toHaveBeenCalled()
  })
})
