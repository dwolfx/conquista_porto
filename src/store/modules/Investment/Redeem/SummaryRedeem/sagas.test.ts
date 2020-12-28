import { call, put, select } from 'redux-saga/effects'
import { get } from 'services/api'

import { Types } from './types'

import { getRedeemSummaryData } from './sagas'
import { GetRedeemSummarySuccess, GetRedeemSummaryFailure } from './action'

describe('Investment/Redeem/SummaryRedeem Sagas', () => {
  it('success triggers success action', () => {
    const payload = {
      id_fundo: '123456',
      data_operacao: '2020-08-08',
      valor: '1000',
      tipo_operacao: '30',
      onErrorToast: () => {},
    }

    const generator = getRedeemSummaryData({
      payload,
      type: Types.REDEEM_SUMMARY_GET_DATA_SUCCESS,
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
        `/cotista%E2%80%8B/resumo/resgate?tipo_resgate=30&valor=1000&cpf_cnpj=33333333333&id_cotista=888888&data_operacao=2020-08-08&id_fundo=123456&CodigoCanal=1`
      )
    )

    const response = {
      data: {
        Message: {
          TipoCritica: 'SUCESSO',
          Mensagem: 'SUCESSO',
        },
        dados_para_aplicacao: {
          conta_grafica: {
            id_conta: '245236',
            codigo_banco: '306',
            nome_banco: 'Banco Porto Seguro',
            agencia: '0001',
            conta: '1965',
            digito_conta: '8',
            titular: 'Rafael Soares Claus',
            saldo_disponivel: '2976506.11',
            encargos_acumulados: '0',
            cheque_especial: {
              limite: '0',
              data_vencimento: '0001-01-03T00:00:00-03:00',
            },
            valores_bloqueados: {
              em_24horas: '0',
              em_48horas: '0',
              indeterminado: '0',
              judicial: '0',
            },
            saldo_liquidar: '0',
          },
          valor_iof: '0.67',
          valor_ir: '0.02',
          valor_bruto: '1000.00',
          valor_liquido: '999.32',
        },
      },
    }
    expect(
      generator.next({ ...response, cpf: '88888888888', id_cotista: '888888' })
        .value
    ).toEqual(put(GetRedeemSummarySuccess(response.data)))

    expect(generator.next()).toEqual({ done: true, value: undefined })
  })
  it('failure triggers failure action', () => {
    const payload = {
      id_fundo: '123456',
      data_operacao: '2020-08-08',
      valor: '1000',
      tipo_operacao: '30',
      onErrorToast: () => {},
    }

    const generator = getRedeemSummaryData({
      payload,
      type: Types.REDEEM_SUMMARY_GET_DATA_SUCCESS,
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
      generator.next({
        id_cotista: '888888',
        cpf: '33333333333',
      }).value
    ).toEqual(
      call(
        get,
        `/cotista%E2%80%8B/resumo/resgate?tipo_resgate=30&valor=1000&cpf_cnpj=33333333333&id_cotista=888888&data_operacao=2020-08-08&id_fundo=123456&CodigoCanal=1`
      )
    )

    const response = undefined
    expect(generator.next(response).value).toEqual(
      put(
        GetRedeemSummaryFailure({
          message: "Cannot read property 'data' of undefined",
        })
      )
    )

    expect(() => generator.next().value).toThrow(
      "Cannot read property 'data' of undefined"
    )

    expect(generator.next()).toEqual({ done: true, value: undefined })
  })
  it('failure triggers failure action without onErrorToast function', () => {
    const payload = {
      id_fundo: '123456',
      data_operacao: '2020-08-08',
      valor: '1000',
      tipo_operacao: '30',
      onErrorToast: undefined,
    }

    const generator = getRedeemSummaryData({
      payload,
      type: Types.REDEEM_SUMMARY_GET_DATA_SUCCESS,
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
      generator.next({
        id_cotista: '888888',
        cpf: '33333333333',
      }).value
    ).toEqual(
      call(
        get,
        `/cotista%E2%80%8B/resumo/resgate?tipo_resgate=30&valor=1000&cpf_cnpj=33333333333&id_cotista=888888&data_operacao=2020-08-08&id_fundo=123456&CodigoCanal=1`
      )
    )

    const response = undefined
    expect(generator.next(response).value).toEqual(
      put(
        GetRedeemSummaryFailure({
          message: "Cannot read property 'data' of undefined",
        })
      )
    )

    expect(() => generator.next().value).toThrow(
      "Cannot read property 'data' of undefined"
    )

    expect(generator.next()).toEqual({ done: true, value: undefined })
  })
})
