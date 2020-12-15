import { call, put } from 'redux-saga/effects'
import { get, baseURLNamespaceInvest } from 'services/api'

import { getData } from './sagas'
import { GetBankExtractFundFailure, GetBankExtractFundSuccess } from './action'

describe('BankExtractFund Sagas', () => {
  describe('getData', () => {
    it('getData: success triggers success action', () => {
      const param = {
        type: 'TESTE',
        payload: ['url_teste'],
      }
      const generator = getData(param)
      const responseAPI = {
        data: [
          {
            fundos: {
              fundo: [
                {
                  apelido: 'Absolute Hedge FIC FIM',
                  nome_carteira: 'Absolute Hedge FIC Multimercado',
                  id_carteira: '51380015',
                  is_fundo_ativo: false,
                },
                {
                  apelido: 'Alaska Black Institucional FIA',
                  nome_carteira: 'Alaska Black Institucional FI Ações',
                  id_carteira: '51380055',
                  is_fundo_ativo: false,
                },
                {
                  apelido: 'Argo Long And Short FIC FIM',
                  nome_carteira: 'Argo Long And Short FIC Multimercado',
                  id_carteira: '51380036',
                  is_fundo_ativo: false,
                },
                {
                  apelido: 'AZ Quest Multi Max FIC FIM',
                  nome_carteira: 'AZ Quest Multi Max FIC Multimercado',
                  id_carteira: '51380033',
                  is_fundo_ativo: false,
                },
              ],
            },
            operacoes: {
              operacao: {
                data_operacao: '2020-11-30T00:00:00-03:00',
                data_liquidacao: '2020-11-30T00:00:00-03:00',
                tipo_operacao: 'Aplicação',
                valor_bruto: '30000.00',
                tipo_movimentacao_operacao: '1',
                id_fundo: '51380033',
                id_operacao: '11121190',
              },
            },
          },
        ],
      }
      const responseMock = {
        data: {
          fundos: {
            fundo: [
              {
                apelido: 'Absolute Hedge FIC FIM',
                nome_carteira: 'Absolute Hedge FIC Multimercado',
                id_carteira: '51380015',
                is_fundo_ativo: false,
              },
              {
                apelido: 'Alaska Black Institucional FIA',
                nome_carteira: 'Alaska Black Institucional FI Ações',
                id_carteira: '51380055',
                is_fundo_ativo: false,
              },
              {
                apelido: 'Argo Long And Short FIC FIM',
                nome_carteira: 'Argo Long And Short FIC Multimercado',
                id_carteira: '51380036',
                is_fundo_ativo: false,
              },
              {
                apelido: 'AZ Quest Multi Max FIC FIM',
                nome_carteira: 'AZ Quest Multi Max FIC Multimercado',
                id_carteira: '51380033',
                is_fundo_ativo: false,
              },
            ],
          },
          operacoes: {
            operacao: [
              {
                data_operacao: '2020-11-30T00:00:00-03:00',
                data_liquidacao: '2020-11-30T00:00:00-03:00',
                tipo_operacao: 'Aplicação',
                valor_bruto: '30000.00',
                tipo_movimentacao_operacao: '1',
                id_fundo: '51380033',
                id_operacao: '11121190',
                data: '2020-11-30T00:00:00-03:00',
                tipo: 'APLICAÇÃO',
                tipoOperacao: 'Aplicação',
                valor: '30000.00',
              },
            ],
          },
        },
      }

      expect(generator.next(responseMock).value).toEqual(
        call(get, `${baseURLNamespaceInvest}/fundos/movimentacoes?0=url_teste`)
      )

      expect(generator.next(responseAPI).value).toEqual(
        put(GetBankExtractFundSuccess(responseMock.data))
      )

      expect(generator.next()).toEqual({ done: true, value: undefined })
    })

    it('getData: fail triggers fail action', () => {
      // Mock JSON.parse toast err.message
      JSON.parse = jest.fn().mockImplementationOnce(() => {
        return { msg: 'Cannot convert undefined or null to object' }
      })

      const param = {
        type: 'TESTE',
        payload: undefined,
      }
      const generator = getData(param)
      const response = { data: {} }

      expect(generator.next(response).value).toEqual(
        put({
          ...GetBankExtractFundFailure(),
          toast: {
            message: 'Cannot convert undefined or null to object',
            type: 'error',
          },
        })
      )

      expect(generator.next()).toEqual({ done: true, value: undefined })
    })
  })
})
