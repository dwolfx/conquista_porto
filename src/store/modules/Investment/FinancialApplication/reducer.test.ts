import {
  financialApplicationGetData,
  financialApplicationPostData,
} from './reducer'
import { Types } from './types'

describe('Investment/FinancialApplication', () => {
  describe('financialApplicationGetData', () => {
    it('should return INITIAL_STATE', () => {
      // @ts-expect-error
      expect(financialApplicationGetData(undefined, {})).toEqual({
        data: null,
        isLoading: false,
        hasError: false,
      })
    })
    it('should handle DATA_GET_REQUEST', () => {
      expect(
        financialApplicationGetData(
          {
            data: null,
            isLoading: false,
            hasError: false,
          },
          {
            type: Types.DATA_GET_REQUEST,
          }
        )
      ).toEqual({
        data: null,
        isLoading: true,
        hasError: false,
      })
    })
    it('should handle DATA_GET_SUCCESS', () => {
      const payload = {
        Message: {
          TipoCritica: '',
          Mensagem: '',
        },
        dados_para_aplicacao: {
          fundo: {
            id_carteira: 0,
            apelido: '',
            nome_carteira: '',
            perfil_risco: '',
            data_inicio: '',
            minimo_inicial: 0,
            aplicacao_minima: 0,
            resgate_minimo: 0,
            saldo_minimo: 0,
            hora_aplicacao: '',
            hora_resgate: '',
            aplicacao_cotizacao: '',
            aplicacao_financeiro: '',
            resgate_cotizacao: '',
            resgate_financeiro: '',
            categoria_arena: '',
            taxa_administracao: 0,
            taxa_performance: 0,
            classificacao: '',
            link_termo_adesao: '',
            tipo_cota: '',
            aviso_data_fundo: true,
            aplicacao_liberada: true,
            resgate_liberado: false,
          },
          posicao_cotista_fundo: {
            saldo_atual: 0,
            data_historico: '',
          },
          id_cotista: 0,
          saldo_conta: 0,
          aderente_fundo: true,
          fechado_aplicacao: false,
          data_prevista_cotizacao: '',
          data_prevista_liquidacao: '',
          data_operacao: '',
        },
      }

      expect(
        financialApplicationGetData(
          {
            data: null,
            isLoading: false,
            hasError: false,
          },
          {
            type: Types.DATA_GET_SUCCESS,
            payload,
          }
        )
      ).toEqual({
        data: payload,
        hasError: false,
        isLoading: false,
      })
    })
    it('should handle DATA_GET_FAILURE', () => {
      expect(
        financialApplicationGetData(
          {
            data: null,
            isLoading: false,
            hasError: false,
          },
          {
            type: Types.DATA_GET_FAILURE,
          }
        )
      ).toEqual({
        data: null,
        hasError: true,
        isLoading: false,
      })
    })
    it('should handle UPDATE_ADHESION_TERM', () => {
      const payload = {
        Message: {
          TipoCritica: '',
          Mensagem: '',
        },
        dados_para_aplicacao: {
          fundo: {
            id_carteira: 0,
            apelido: '',
            nome_carteira: '',
            perfil_risco: '',
            data_inicio: '',
            minimo_inicial: 0,
            aplicacao_minima: 0,
            resgate_minimo: 0,
            saldo_minimo: 0,
            hora_aplicacao: '',
            hora_resgate: '',
            aplicacao_cotizacao: '',
            aplicacao_financeiro: '',
            resgate_cotizacao: '',
            resgate_financeiro: '',
            categoria_arena: '',
            taxa_administracao: 0,
            taxa_performance: 0,
            classificacao: '',
            link_termo_adesao: '',
            tipo_cota: '',
            aviso_data_fundo: true,
            aplicacao_liberada: true,
            resgate_liberado: false,
          },
          posicao_cotista_fundo: {
            saldo_atual: 0,
            data_historico: '',
          },
          id_cotista: 0,
          saldo_conta: 0,
          aderente_fundo: true,
          fechado_aplicacao: false,
          data_prevista_cotizacao: '',
          data_prevista_liquidacao: '',
          data_operacao: '',
        },
      }

      expect(
        financialApplicationGetData(
          {
            data: null,
            isLoading: false,
            hasError: false,
          },
          {
            type: Types.UPDATE_ADHESION_TERM,
            payload,
          }
        )
      ).toEqual({
        data: {
          dados_para_aplicacao: {
            aderente_fundo: {
              Message: { TipoCritica: '', Mensagem: '' },
              dados_para_aplicacao: {
                fundo: {
                  id_carteira: 0,
                  apelido: '',
                  nome_carteira: '',
                  perfil_risco: '',
                  data_inicio: '',
                  minimo_inicial: 0,
                  aplicacao_minima: 0,
                  resgate_minimo: 0,
                  saldo_minimo: 0,
                  hora_aplicacao: '',
                  hora_resgate: '',
                  aplicacao_cotizacao: '',
                  aplicacao_financeiro: '',
                  resgate_cotizacao: '',
                  resgate_financeiro: '',
                  categoria_arena: '',
                  taxa_administracao: 0,
                  taxa_performance: 0,
                  classificacao: '',
                  link_termo_adesao: '',
                  tipo_cota: '',
                  aviso_data_fundo: true,
                  aplicacao_liberada: true,
                  resgate_liberado: false,
                },
                posicao_cotista_fundo: {
                  saldo_atual: 0,
                  data_historico: '',
                },
                id_cotista: 0,
                saldo_conta: 0,
                aderente_fundo: true,
                fechado_aplicacao: false,
                data_prevista_cotizacao: '',
                data_prevista_liquidacao: '',
                data_operacao: '',
              },
            },
          },
        },
        hasError: false,
        isLoading: false,
      })
    })
  })

  describe('financialApplicationPostData', () => {
    it('should return INITIAL_STATE', () => {
      expect(financialApplicationPostData(undefined, {})).toEqual({
        data: null,
        isLoading: false,
        hasError: false,
      })
    })
    it('should handle DATA_POST_REQUEST', () => {
      expect(
        financialApplicationPostData(
          {
            data: null,
            isLoading: false,
            hasError: false,
          },
          {
            type: Types.DATA_POST_REQUEST,
          }
        )
      ).toEqual({
        data: null,
        isLoading: true,
        hasError: false,
      })
    })
    it('should handle DATA_POST_SUCCESS', () => {
      const payload = {
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
      }

      expect(
        financialApplicationPostData(
          {
            data: null,
            isLoading: false,
            hasError: false,
          },
          {
            type: Types.DATA_POST_SUCCESS,
            payload,
          }
        )
      ).toEqual({
        data: payload,
        hasError: false,
        isLoading: false,
      })
    })
    it('should handle DATA_POST_FAILURE', () => {
      expect(
        financialApplicationPostData(
          {
            data: null,
            isLoading: false,
            hasError: false,
          },
          {
            type: Types.DATA_POST_FAILURE,
          }
        )
      ).toEqual({
        data: null,
        hasError: true,
        isLoading: false,
      })
    })
  })
})
