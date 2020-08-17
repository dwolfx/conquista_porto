import { call, put, select } from 'redux-saga/effects'
import { get } from 'services/api'

import { Types } from './types'

import { getRedeemSummaryData } from 'store/modules/Investment/Redeem/SummaryRedeem/sagas'
import { SetRedeemSummaryLoading } from 'store/modules/Investment/Redeem/SummaryRedeem/action'
import { getRedeemAlignmentTermsData } from './sagas'

import {
  GetRedeemAlignmentTermsSuccess,
  GetRedeemAlignmentTermsFailure,
} from './action'

describe('Investment/Redeem/AlignmentTerms Sagas', () => {
  describe('getRedeemAlignmentTermsData', () => {
    const payload = {
      data: {
        data_operacao: '',
        id_fundo: '',
        valor_bruto: '',
        tipo_operacao: '',
      },
      onSuccess: (data: {}) => {},
      onErrorToast: (toast: {}) => {},
    }

    const selectsData = {
      id_cotista: '888888',
      cpf: '33333333333',
      redeemSummaryData: {
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

    const response = {
      data: {
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
    }

    it('success triggers success action', () => {
      const generator = getRedeemAlignmentTermsData({
        payload,
        type: Types.REDEEM_TERMS_DATA_REQUEST,
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

      const thirdSelect = generator.next({
        ...selectsData,
      }).value
      expect(thirdSelect && thirdSelect.type).toEqual(
        select(state => state.redeemSummaryData.data).type
      )

      expect(
        generator.next({
          ...selectsData,
        }).value
      ).toEqual(
        call(
          get,
          `/cotista%E2%80%8B/enquadramento/resgate?cpf_cnpj=33333333333&id_cotista=888888&data_operacao=&tipo_operacao=2&valor_bruto=&id_fundo=&CodigoCanal=1`
        )
      )

      expect(
        generator.next({
          ...response,
          ...selectsData,
        }).value
      ).toEqual(put(GetRedeemAlignmentTermsSuccess(response.data)))

      expect(generator.next()).toEqual({ done: true, value: undefined })
    })
    it('success triggers success action without onSuccess function', () => {
      const generator = getRedeemAlignmentTermsData({
        payload: { ...payload, onSuccess: undefined },
        type: Types.REDEEM_TERMS_DATA_REQUEST,
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

      const thirdSelect = generator.next({
        ...selectsData,
      }).value
      expect(thirdSelect && thirdSelect.type).toEqual(
        select(state => state.redeemSummaryData.data).type
      )

      expect(
        generator.next({
          ...selectsData,
        }).value
      ).toEqual(
        call(
          get,
          `/cotista%E2%80%8B/enquadramento/resgate?cpf_cnpj=33333333333&id_cotista=888888&data_operacao=&tipo_operacao=2&valor_bruto=&id_fundo=&CodigoCanal=1`
        )
      )

      expect(
        generator.next({
          ...response,
          ...selectsData,
        }).value
      ).toEqual(put(GetRedeemAlignmentTermsSuccess(response.data)))

      expect(generator.next()).toEqual({ done: true, value: undefined })
    })
    it('success triggers success action without redeemSummaryData function', () => {
      const generator = getRedeemAlignmentTermsData({
        payload,
        type: Types.REDEEM_TERMS_DATA_REQUEST,
      })

      const firstSelect = generator.next().value
      expect(firstSelect && firstSelect.type).toEqual(
        select(state => state.suitabilityInfo.data).type
      )

      const selectsDataWithourRedeemSummaryData = {
        id_cotista: selectsData.id_cotista,
        cpf: selectsData.cpf,
      }
      const secondSelect = generator.next({
        ...selectsDataWithourRedeemSummaryData,
      }).value
      expect(secondSelect && secondSelect.type).toEqual(
        select(state => state.auth).type
      )

      const thirdSelect = generator.next({
        ...selectsDataWithourRedeemSummaryData,
      }).value
      expect(thirdSelect && thirdSelect.type).toEqual(
        select(state => state.redeemSummaryData.data).type
      )

      expect(generator.next().value).toEqual(put(SetRedeemSummaryLoading(true)))

      expect(generator.next().value).toEqual(
        call(getRedeemSummaryData, {
          type: 'REDEEM_SUMMARY_GET_DATA_REQUEST',
          payload: {
            data_operacao: '',
            id_fundo: '',
            valor: '',
            tipo_operacao: '',
            onErrorToast: null,
          },
        })
      )

      expect(
        generator.next({
          ...selectsDataWithourRedeemSummaryData,
        }).value
      ).toEqual(
        call(
          get,
          `/cotista%E2%80%8B/enquadramento/resgate?cpf_cnpj=33333333333&id_cotista=888888&data_operacao=&tipo_operacao=2&valor_bruto=&id_fundo=&CodigoCanal=1`
        )
      )

      expect(
        generator.next({
          ...response,
          ...selectsDataWithourRedeemSummaryData,
        }).value
      ).toEqual(put(GetRedeemAlignmentTermsSuccess(response.data)))

      expect(generator.next()).toEqual({ done: true, value: undefined })
    })
    it('failure triggers failure action', () => {
      const generator = getRedeemAlignmentTermsData({
        payload,
        type: Types.REDEEM_TERMS_DATA_REQUEST,
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

      const thirdSelect = generator.next({
        ...selectsData,
      }).value
      expect(thirdSelect && thirdSelect.type).toEqual(
        select(state => state.redeemSummaryData.data).type
      )

      expect(
        generator.next({
          ...selectsData,
        }).value
      ).toEqual(
        call(
          get,
          `/cotista%E2%80%8B/enquadramento/resgate?cpf_cnpj=33333333333&id_cotista=888888&data_operacao=&tipo_operacao=2&valor_bruto=&id_fundo=&CodigoCanal=1`
        )
      )

      expect(generator.next(undefined).value).toEqual(
        put(
          GetRedeemAlignmentTermsFailure({
            message: "Cannot read property 'data' of undefined",
          })
        )
      )

      expect(generator.next()).toEqual({ done: true, value: undefined })
    })
  })
})
