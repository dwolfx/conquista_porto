import { call, put, select } from 'redux-saga/effects'
import { get } from 'services/api'

import { Types } from './types'

import { getRedeemData } from './sagas'

import {
  GetRedeemSuccess,
  GetRedeemFailure,
  RedeemLayerToggleOpen,
} from './action'

describe('Investment/Redeem Sagas', () => {
  describe('getRedeemData', () => {
    const payload = {
      id_fundo: '',
      data_operacao: '',
      onErrorToast: () => {},
    }

    const selectsData = {
      id_cotista: '888888',
      cpf: '33333333333',
    }

    const response = {
      data: {
        Message: {
          TipoCritica: 'SUCESSO',
          Mensagem: 'SUCESSO',
        },
        dados_para_resgate: {
          data_operacao: '2020-07-09T00:00:00-03:00',
          hora_limite: '23:59',
          posicao_cotista_fundo: {
            data_historico: '2020-05-08T00:00:00',
            saldo_atual: '1430002.20',
          },
          data_prevista_liquidacao: '2020-07-09T00:00:00-03:00',
          fundo: {
            data_inicio: '2014-02-28T00:00:00-03:00',
            taxa_performance: '0.00',
            apelido: 'Porto Seguro FI RF Ref. DI CP',
            nome_carteira: 'Porto Seguro FI Referenciado DI Credito Privado',
            minimo_inicial: '1000.00',
            perfil_risco: 'medio-baixo',
            hora_resgate: '23:59',
            resgate_cotizacao: 'D+0 (Úteis)',
            aplicacao_liberada: true,
            aplicacao_minima: '100.00',
            tipo_cota: 'Abertura',
            hora_aplicacao: '23:59',
            resgate_financeiro: 'D+0 (Úteis)',
            aviso_data_fundo: true,
            link_termo_adesao:
              'https://www.portoseguro.com.br/NovoInstitucional/static_files/documents/para-mim/investimentos/DI/TCR%20-%20Porto%20Seguro%20DI%20Credito%20Privado.pdf',
            resgate_minimo: '100.00',
            saldo_minimo: '1000.00',
            categoria_arena: '01-Renda Fixa',
            resgate_liberado: true,
            taxa_administracao: '0.40',
            aplicacao_cotizacao: 'D+0',
            id_carteira: '5105',
            classificacao: 'medio-baixo',
            aplicacao_financeiro: 'D+0',
          },
          fechado_resgate: true,
          data_prevista_conversão: '2020-07-09T00:00:00-03:00',
        },
      },
    }

    it('success triggers success action', () => {
      const generator = getRedeemData({
        payload,
        type: Types.REDEEM_DATA_GET_REQUEST,
      })

      const firstSelect = generator.next().value
      expect(firstSelect && firstSelect.type).toEqual(
        select(state => state.suitabilityInfo.data).type
      )

      const secondSelect = generator.next({
        ...selectsData,
      }).value
      expect(secondSelect && secondSelect.type).toEqual(
        select(state => state.auth).type
      )

      expect(
        generator.next({
          ...selectsData,
        }).value
      ).toEqual(
        call(
          get,
          `/cotista/resgates?cpf_cnpj=33333333333&id_cotista=888888&data_operacao=&id_fundo=`
        )
      )

      expect(
        generator.next({
          ...response,
          ...selectsData,
        }).value
      ).toEqual(put(RedeemLayerToggleOpen()))

      expect(
        generator.next({
          ...response,
          ...selectsData,
        }).value
      ).toEqual(put(GetRedeemSuccess(response.data)))

      expect(generator.next()).toEqual({ done: true, value: undefined })
    })
    it('failure triggers failure action', () => {
      const generator = getRedeemData({
        payload,
        type: Types.REDEEM_DATA_GET_REQUEST,
      })

      const firstSelect = generator.next().value
      expect(firstSelect && firstSelect.type).toEqual(
        select(state => state.suitabilityInfo.data).type
      )

      const secondSelect = generator.next({
        ...selectsData,
      }).value
      expect(secondSelect && secondSelect.type).toEqual(
        select(state => state.auth).type
      )

      expect(
        generator.next({
          ...selectsData,
        }).value
      ).toEqual(
        call(
          get,
          `/cotista/resgates?cpf_cnpj=33333333333&id_cotista=888888&data_operacao=&id_fundo=`
        )
      )

      expect(generator.next().value).toEqual(put(RedeemLayerToggleOpen()))

      expect(generator.next().value).toEqual(
        put(
          GetRedeemFailure({
            message: "Cannot read property 'data' of undefined",
          })
        )
      )

      expect(generator.next()).toEqual({ done: true, value: undefined })
    })
  })
})
