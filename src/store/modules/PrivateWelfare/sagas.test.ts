import { call, put } from 'redux-saga/effects'
import { post } from 'services/api'

import { Types } from './types'
import {
  GetPrivateWelfareRequest,
  GetPrivateWelfareFailure,
  GetPrivateWelfareSuccess, GetPrivateWelfareEmpty
} from './action'
import mock from './mock.json'

import { getData } from './sagas'
import BadRequestException from 'services/exceptions/BadRequestException'

describe('PrivateWelfare sagas test', () => {
  it('must have generator function', () => {
    const generator = getData({ cpf: '39049924816', type: Types.PRIVATE_WELFARE_REQUEST as keyof typeof Types })
    expect(generator).toBeDefined()
  })
  it('should call api', () => {
    const generator = getData({ cpf: '39049924816', type: Types.PRIVATE_WELFARE_REQUEST as keyof typeof Types})
    const postPayload = {
      filter: {
        companyId: "",
        productId: "",
        cpf: '39049924816',
        cnpj: "",
        sponsorAccountId: "",
        certificateId: "",
        clientName: "",
        certificateStatus: "",
        paymentStatus: "",
        status: "",
        affiliationId: "",
        planId: "",
        benefitId: "",
        clientId: "",
        withdrawalId: ""
      }
    }
    expect(generator.next().value).toEqual(
      call(post, '/conquista/arenasimcontratprodutosprevidenciaService/api/consulta/adesao', postPayload)
    )
  })
  it('should get data', () => {
    const generator = getData({ cpf: '39049924816', type: Types.PRIVATE_WELFARE_REQUEST as keyof typeof Types })
    const response = {
      data: mock
    }
    const filteredResponse = response.data.filter(pv => pv.status !== 'ERR')

    generator.next() // já testado
    expect(generator.next(response).value).toEqual(
      put(GetPrivateWelfareSuccess(filteredResponse))
    )
    expect(generator.next()).toEqual({ done: true, value: undefined })
  })
  it('should triggers failure action when getData throws error', () => {
    const generator = getData({ cpf: '39049924816', type: Types.PRIVATE_WELFARE_REQUEST as keyof typeof Types })
    const response = undefined
    generator.next()
    expect(generator.throw(response).value).toEqual(put(GetPrivateWelfareFailure()))
    expect(generator.next()).toEqual({ done: true, value: undefined })
  })
  it('success: should be able to dispatch empty action when data length is 0', () => {
    const generator = getData({ cpf: '39049924816', type: Types.PRIVATE_WELFARE_REQUEST as keyof typeof Types })
    const response = {
      data: []
    }
    generator.next()
    expect(generator.next(response).value).toEqual(
      put(GetPrivateWelfareEmpty())
    )
    expect(generator.next()).toEqual({ done: true, value: undefined })
  })
  it('sucess: should be able to dispatch empty action when data length is 0 ', () => {
    const generator = getData({ cpf: '39049924816', type: Types.PRIVATE_WELFARE_REQUEST as keyof typeof Types })
    const response = {
      data: []
    }
    generator.next()
    expect(generator.next(response).value).toEqual(
      put(GetPrivateWelfareEmpty())
    )
    expect(generator.next()).toEqual({ done: true, value: undefined })
  })
  it('should be able to dispatch empty action when BadRequest error is throw', () => {
    const generator = getData({ cpf: '39049924816', type: Types.PRIVATE_WELFARE_REQUEST as keyof typeof Types })
    generator.next()
    expect(generator.throw(new BadRequestException('Nenhuma proposta encontrada para esse cpf informado.')).value).toEqual(
      put(GetPrivateWelfareEmpty())
    )
    expect(generator.next()).toEqual({ done: true, value: undefined })
  })
})
