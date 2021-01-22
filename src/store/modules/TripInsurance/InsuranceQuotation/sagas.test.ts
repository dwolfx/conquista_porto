import { call, put } from 'redux-saga/effects'
import { post, baseURLNamespaceInvestAws } from 'services/api'
import tripInsuranceQuotationMock from 'mocks/tripInsuranceQuotation.json'

import { postInsuranceQuotation } from './sagas'
import {
  PostInsuranceQuotationSuccess,
  PostInsuranceQuotationFailure,
} from './action'

import { IPayload, Types } from './types'

const requestData: IPayload = {
  type: Types.POST_INSURANCE_QUOTATION_REQUEST,
  payload: {
    dataIda: '20/02/2021',
    dataVolta: '22/02/2021',
    motivoViagem: 1,
    isPraticaAventura: false,
    isMotocicleta: false,
    qtdPassagMenorSetentaAnos: 1,
    qtdPassagMaiorSetentaAnos: 0,
    codigoUfOrigem: 'SP',
    codigoPaisDestino: '111',
    paisesAdicionais: [
      {
        codigo: '28',
        descricao: 'Brasil',
      },
    ],
    passageiroPrincipal: {
      numeroCpf: '321654618',
      digitoCpf: '88',
    },
    codigoCanal: 1,
  },
  onSuccess: () => {},
  onErrorToast: () => {},
}

describe('Trip Insurance quotation Sagas', () => {
  it('success triggers success action', () => {
    const onSuccessMock = jest.fn()

    const generator = postInsuranceQuotation({
      ...requestData,
      onSuccess: onSuccessMock,
    })
    const response = {
      ...tripInsuranceQuotationMock,
      ViagemPacote: {
        pacotes: [tripInsuranceQuotationMock.ViagemPacote.pacotes].flatMap(
          pacote => pacote
        ),
      },
    }

    expect(generator.next().value).toEqual(
      call(
        post,
        `${baseURLNamespaceInvestAws}/viagem/cotacao/seguro`,
        requestData.payload
      )
    )

    expect(generator.next({ data: response }).value).toEqual(
      put(PostInsuranceQuotationSuccess(response))
    )

    expect(generator.next()).toEqual({ done: true, value: undefined })
    expect(onSuccessMock).toHaveBeenCalled()
  })
  it('success triggers success action without onSuccess function', () => {
    const generator = postInsuranceQuotation({
      ...requestData,
      onSuccess: null,
    })
    const response = {
      ...tripInsuranceQuotationMock,
      ViagemPacote: {
        pacotes: [tripInsuranceQuotationMock.ViagemPacote.pacotes].flatMap(
          pacote => pacote
        ),
      },
    }

    expect(generator.next().value).toEqual(
      call(
        post,
        `${baseURLNamespaceInvestAws}/viagem/cotacao/seguro`,
        requestData.payload
      )
    )

    expect(generator.next({ data: response }).value).toEqual(
      put(PostInsuranceQuotationSuccess(response))
    )

    expect(generator.next()).toEqual({ done: true, value: undefined })
  })
  it('failure triggers failure action', () => {
    const generator = postInsuranceQuotation(requestData)

    expect(generator.next().value).toEqual(
      call(
        post,
        `${baseURLNamespaceInvestAws}/viagem/cotacao/seguro`,
        requestData.payload
      )
    )
    expect(generator.next(undefined).value).toEqual(
      put(PostInsuranceQuotationFailure())
    )
    expect(generator.next()).toEqual({ done: true, value: undefined })
  })
})
