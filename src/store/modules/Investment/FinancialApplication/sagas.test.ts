import { call, put, select } from 'redux-saga/effects'
import { get, post } from 'services/api'

import { getAuth, getSuitabilityInfo } from './selectors'

import { Types } from './types'

import {
  getFinancialApplicationData,
  postFinancialApplicationData,
} from './sagas'
import {
  GetFinancialApplicationDataSuccess,
  GetFinancialApplicationDataFailure,
  PostFinancialApplicationDataSuccess,
  PostFinancialApplicationDataFailure,
} from './action'

describe('Investment/FinancialApplication Sagas', () => {
  describe('getFinancialApplicationData', () => {
    it('success triggers success action', () => {
      const payload = {
        data: {
          data_operacao: '2020-08-08',
          id_fundo: '123456',
        },
        onSuccess: (data: {}) => {},
        onErrorToast: (toast: {}) => {},
      }
      const generator = getFinancialApplicationData({
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
          `/cotista/aplicacoes?id_fundo=123456&id_cotista=888888&cpf_cnpj=33333333333&data_operacao=2020-08-08`
        )
      )

      const response = {
        data: {
          Message: {
            TipoCritica: 'SUCESSO',
            Mensagem: 'SUCESSO',
          },
          dados_para_aplicacao: {
            fundo: {
              id_carteira: 5112,
              apelido: 'Porto Seguro Alocação FIC FIM',
              nome_carteira: 'Porto Seguro Alocação FIC FIM',
              perfil_risco: 'medio-alto',
              data_inicio: '2013-03-28T00:00:00-03:00',
              minimo_inicial: 1000,
              aplicacao_minima: 1000,
              resgate_minimo: 1000,
              saldo_minimo: 1000,
              hora_aplicacao: '15:00',
              hora_resgate: '23:59',
              aplicacao_cotizacao: 'D+0',
              aplicacao_financeiro: 'D+0',
              resgate_cotizacao: 'D+32 (Corridos)',
              resgate_financeiro: 'D+2 (Úteis)',
              categoria_arena: '03-Multimercado',
              taxa_administracao: 0.5,
              taxa_performance: 0,
              classificacao: 'medio-alto',
              link_termo_adesao:
                'https://www.portoseguro.com.br/NovoInstitucional/static_files/documents/para-mim/investimentos/multimercado/TCR_PS_Alocacao.pdf',
              tipo_cota: 'Fechamento',
              aviso_data_fundo: true,
              aplicacao_liberada: true,
              resgate_liberado: false,
            },
            posicao_cotista_fundo: {
              saldo_atual: 31905.05,
              data_historico: '2020-03-23T00:00:00',
            },
            id_cotista: 2000143425,
            saldo_conta: 1987123.99,
            aderente_fundo: false,
            fechado_aplicacao: false,
            data_prevista_cotizacao: '2020-07-09T00:00:00-03:00',
            data_prevista_liquidacao: '2020-07-09T00:00:00-03:00',
            data_operacao: '2020-07-20T00:00:00-03:00',
          },
        },
      }

      expect(
        generator.next({
          ...response,
          cpf: '88888888888',
          id_cotista: '888888',
        }).value
      ).toEqual(put(GetFinancialApplicationDataSuccess(response.data)))

      expect(generator.next()).toEqual({ done: true, value: undefined })
    })
    it('success triggers success action without onSuccess function', () => {
      const payload = {
        data: {
          data_operacao: '2020-08-08',
          id_fundo: '123456',
        },
        onSuccess: undefined,
        onErrorToast: (toast: {}) => {},
      }
      const generator = getFinancialApplicationData({
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
          `/cotista/aplicacoes?id_fundo=123456&id_cotista=888888&cpf_cnpj=33333333333&data_operacao=2020-08-08`
        )
      )

      const response = {
        data: {
          Message: {
            TipoCritica: 'SUCESSO',
            Mensagem: 'SUCESSO',
          },
          dados_para_aplicacao: {
            fundo: {
              id_carteira: 5112,
              apelido: 'Porto Seguro Alocação FIC FIM',
              nome_carteira: 'Porto Seguro Alocação FIC FIM',
              perfil_risco: 'medio-alto',
              data_inicio: '2013-03-28T00:00:00-03:00',
              minimo_inicial: 1000,
              aplicacao_minima: 1000,
              resgate_minimo: 1000,
              saldo_minimo: 1000,
              hora_aplicacao: '15:00',
              hora_resgate: '23:59',
              aplicacao_cotizacao: 'D+0',
              aplicacao_financeiro: 'D+0',
              resgate_cotizacao: 'D+32 (Corridos)',
              resgate_financeiro: 'D+2 (Úteis)',
              categoria_arena: '03-Multimercado',
              taxa_administracao: 0.5,
              taxa_performance: 0,
              classificacao: 'medio-alto',
              link_termo_adesao:
                'https://www.portoseguro.com.br/NovoInstitucional/static_files/documents/para-mim/investimentos/multimercado/TCR_PS_Alocacao.pdf',
              tipo_cota: 'Fechamento',
              aviso_data_fundo: true,
              aplicacao_liberada: true,
              resgate_liberado: false,
            },
            posicao_cotista_fundo: {
              saldo_atual: 31905.05,
              data_historico: '2020-03-23T00:00:00',
            },
            id_cotista: 2000143425,
            saldo_conta: 1987123.99,
            aderente_fundo: false,
            fechado_aplicacao: false,
            data_prevista_cotizacao: '2020-07-09T00:00:00-03:00',
            data_prevista_liquidacao: '2020-07-09T00:00:00-03:00',
            data_operacao: '2020-07-20T00:00:00-03:00',
          },
        },
      }

      expect(
        generator.next({
          ...response,
          cpf: '88888888888',
          id_cotista: '888888',
        }).value
      ).toEqual(put(GetFinancialApplicationDataSuccess(response.data)))

      expect(generator.next()).toEqual({ done: true, value: undefined })
    })
    it('failure triggers failure action', () => {
      const payload = {
        data: {
          data_operacao: '2020-08-08',
          id_fundo: '123456',
        },
        onSuccess: (data: {}) => {},
        onErrorToast: (toast: {}) => {},
      }
      const generator = getFinancialApplicationData({
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
          `/cotista/aplicacoes?id_fundo=123456&id_cotista=888888&cpf_cnpj=33333333333&data_operacao=2020-08-08`
        )
      )
      const response = undefined
      expect(generator.next(response).value).toEqual(
        put(
          GetFinancialApplicationDataFailure({
            message: "Cannot read property 'data' of undefined",
          })
        )
      )
      expect(generator.next()).toEqual({ done: true, value: undefined })
    })
  })
  describe('postFinancialApplicationData', () => {
    it('success triggers success action', () => {
      const ciencia_desenquadramento: 'N' | 'S' = 'S'
      const payload = {
        data: {
          data: '2020-08-08',
          valor: 1000,
          id_fundo: '123456',
          ciencia_desenquadramento,
        },
        onSuccess: () => {},
        onError: () => {},
      }
      const generator = postFinancialApplicationData({
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
        call(post, `/cotista/aplicacoes`, {
          ...payload.data,
          cpf_cnpj: '33333333333',
          id_cotista: '888888',
          ciencia_desenquadramento: 'S',
        })
      )

      const response = {
        data: {
          Message: {
            TipoCritica: '',
            Mensagem: '',
          },
          status_operacao: true,
          mesagem: '',
          id_cotista: 0,
          cpf_cnpj: '',
          valor: 0,
          data: '',
          id_fundo: 0,
        },
      }

      expect(
        generator.next({
          ...response,
          cpf: '88888888888',
          id_cotista: '888888',
        }).value
      ).toEqual(put(PostFinancialApplicationDataSuccess(response.data)))

      expect(generator.next()).toEqual({ done: true, value: undefined })
    })
    it('success triggers success action without onSuccess function', () => {
      const ciencia_desenquadramento: 'N' | 'S' = 'S'
      const payload = {
        data: {
          data: '2020-08-08',
          valor: 1000,
          id_fundo: '123456',
          ciencia_desenquadramento,
        },
        onSuccess: undefined,
        onError: () => {},
      }
      const generator = postFinancialApplicationData({
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
        call(post, `/cotista/aplicacoes`, {
          ...payload.data,
          cpf_cnpj: '33333333333',
          id_cotista: '888888',
          ciencia_desenquadramento: 'S',
        })
      )

      const response = {
        data: {
          Message: {
            TipoCritica: '',
            Mensagem: '',
          },
          status_operacao: true,
          mesagem: '',
          id_cotista: 0,
          cpf_cnpj: '',
          valor: 0,
          data: '',
          id_fundo: 0,
        },
      }

      expect(
        generator.next({
          ...response,
          cpf: '88888888888',
          id_cotista: '888888',
        }).value
      ).toEqual(put(PostFinancialApplicationDataSuccess(response.data)))

      expect(generator.next()).toEqual({ done: true, value: undefined })
    })
    it('failure triggers failure action', () => {
      const ciencia_desenquadramento: 'N' | 'S' = 'S'
      const payload = {
        data: {
          data: '2020-08-08',
          valor: 1000,
          id_fundo: '123456',
          ciencia_desenquadramento,
        },
        onSuccess: () => {},
        onError: () => {},
      }
      const generator = postFinancialApplicationData({
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
        call(post, `/cotista/aplicacoes`, {
          ...payload.data,
          cpf_cnpj: '33333333333',
          id_cotista: '888888',
          ciencia_desenquadramento: 'S',
        })
      )

      const response = undefined

      expect(generator.next(response).value).toEqual(
        put(
          PostFinancialApplicationDataFailure({
            message: "Cannot read property 'data' of undefined",
          })
        )
      )

      expect(generator.next()).toEqual({ done: true, value: undefined })
    })
    it('failure triggers failure action without onError function', () => {
      const ciencia_desenquadramento: 'N' | 'S' = 'S'
      const payload = {
        data: {
          data: '2020-08-08',
          valor: 1000,
          id_fundo: '123456',
          ciencia_desenquadramento,
        },
        onSuccess: () => {},
        onError: undefined,
      }
      const generator = postFinancialApplicationData({
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
        call(post, `/cotista/aplicacoes`, {
          ...payload.data,
          cpf_cnpj: '33333333333',
          id_cotista: '888888',
          ciencia_desenquadramento: 'S',
        })
      )

      const response = undefined

      expect(generator.next(response).value).toEqual(
        put(
          PostFinancialApplicationDataFailure({
            message: "Cannot read property 'data' of undefined",
          })
        )
      )

      expect(generator.next()).toEqual({ done: true, value: undefined })
    })
  })
})
