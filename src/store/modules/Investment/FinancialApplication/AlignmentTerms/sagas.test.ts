import { call, put, select } from 'redux-saga/effects'
import { get } from 'services/api'

import { Types } from '../types'

import { getAlignmentTermsData } from './sagas'
import {
  GetAlignmentTermsDataSuccess,
  GetAlignmentTermsDataFailure,
} from './action'

describe('Investment/FinancialApplication/AlignmentTerms Sagas', () => {
  it('success triggers success action - getAlignmentTermsData', () => {
    const payload = {
      data: {
        data_operacao: '2020-08-08',
        valor_bruto: 0,
        id_fundo: '123456',
      },
      onSuccess: (data: {}) => {},
      onErrorToast: (toast: {}) => {},
    }
    const generator = getAlignmentTermsData({
      payload,
      type: Types.ALIGNMENT_TERMS_DATA_GET_REQUEST,
    })

    const firstSelect = generator.next().value
    expect(firstSelect && firstSelect.type).toEqual(
      select(state => state.suitabilityInfo.data).type
    )

    const secondSelect = generator.next({
      id_cotista: '888888',
      cpf: '33333333333',
    }).value
    expect(secondSelect && secondSelect.type).toEqual(
      select(state => state.auth).type
    )

    expect(
      generator.next({ id_cotista: '888888', cpf: '33333333333' }).value
    ).toEqual(
      call(
        get,
        `/cotista/aplicacoes/enquadramento?CodigoCanal=1&id_cotista=888888&cpf_cnpj=33333333333&data_operacao=2020-08-08&tipo_operacao=1&valor_bruto=0&id_fundo=123456`
      )
    )

    const response = {
      data: {
        enquadramento_ordem_cotista: {
          status_enquadramento: 'Desenquadrado',
          nota_rating_cotista: 3.3,
          nota_rating_carteira: 4.090905499356974,
          fundos_desenquadrados: {
            fundo_desenquadrado: [
              {
                id_carteira: 5094,
                nome_fundo: 'Porto Seguro Selecta FIC FIA',
                nota_rating: 5,
              },
            ],
          },
        },
      },
    }
    expect(
      generator.next({ ...response, cpf: '88888888888', id_cotista: '888888' })
        .value
    ).toEqual(put(GetAlignmentTermsDataSuccess(response.data)))

    expect(generator.next()).toEqual({ done: true, value: undefined })
  })
  it('success triggers success action without onSuccess function - getAlignmentTermsData', () => {
    const payload = {
      data: {
        data_operacao: '2020-08-08',
        valor_bruto: 0,
        id_fundo: '123456',
      },
      onSuccess: undefined,
      onErrorToast: (toast: {}) => {},
    }
    const generator = getAlignmentTermsData({
      payload,
      type: Types.ALIGNMENT_TERMS_DATA_GET_REQUEST,
    })

    // first select (getSuitabilityInfo => id_cotista)
    generator.next()
    // second select (getAuth => cpf)
    generator.next({ id_cotista: '888888', cpf: '33333333333' })
    //call GET
    generator.next({ id_cotista: '888888', cpf: '33333333333' })

    const response = {
      data: {
        enquadramento_ordem_cotista: {
          status_enquadramento: 'Desenquadrado',
          nota_rating_cotista: 3.3,
          nota_rating_carteira: 4.090905499356974,
          fundos_desenquadrados: {
            fundo_desenquadrado: [
              {
                id_carteira: 5094,
                nome_fundo: 'Porto Seguro Selecta FIC FIA',
                nota_rating: 5,
              },
            ],
          },
        },
      },
    }
    expect(
      generator.next({ ...response, cpf: '88888888888', id_cotista: '888888' })
        .value
    ).toEqual(put(GetAlignmentTermsDataSuccess(response.data)))

    expect(generator.next()).toEqual({ done: true, value: undefined })
  })
  it('failure triggers failure action - getAlignmentTermsData', () => {
    const payload = {
      data: {
        data_operacao: '2020-08-08',
        valor_bruto: 0,
        id_fundo: '123456',
      },
      onSuccess: (data: {}) => {},
      onErrorToast: (toast: {}) => {},
    }
    const generator = getAlignmentTermsData({
      payload,
      type: Types.ALIGNMENT_TERMS_DATA_GET_REQUEST,
    })

    generator.next()
    generator.next({
      id_cotista: '888888',
      cpf: '33333333333',
    })

    expect(
      generator.next({ id_cotista: '888888', cpf: '33333333333' }).value
    ).toEqual(
      call(
        get,
        `/cotista/aplicacoes/enquadramento?CodigoCanal=1&id_cotista=888888&cpf_cnpj=33333333333&data_operacao=2020-08-08&tipo_operacao=1&valor_bruto=0&id_fundo=123456`
      )
    )
    const response = undefined
    expect(generator.next(response).value).toEqual(
      put(
        GetAlignmentTermsDataFailure({
          message: "Cannot read property 'data' of undefined",
        })
      )
    )
    expect(generator.next()).toEqual({ done: true, value: undefined })
  })
})
