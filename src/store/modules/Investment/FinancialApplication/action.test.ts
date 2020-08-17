import { Types } from './types'
import {
  GetFinancialApplicationDataRequest,
  GetFinancialApplicationDataSuccess,
  GetFinancialApplicationDataFailure,
  PostFinancialApplicationDataRequest,
  PostFinancialApplicationDataSuccess,
  PostFinancialApplicationDataFailure,
  UpdateAdhesionTerm,
} from './action'

describe('Investment/FinancialApplication actions', () => {
  test('if GetFinancialApplicationDataRequest returns the correct object', () => {
    const payload = {
      data: {
        data_operacao: '',
        id_fundo: '',
      },
      onSuccess: (data: {}) => {},
      onErrorToast: (toast: {}) => {},
    }
    expect(GetFinancialApplicationDataRequest(payload)).toEqual({
      payload,
      type: Types.DATA_GET_REQUEST,
    })
  })
  test('if GetFinancialApplicationDataSuccess returns the correct object', () => {
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
    expect(GetFinancialApplicationDataSuccess(payload)).toEqual({
      type: Types.DATA_GET_SUCCESS,
      payload,
    })
  })
  test('if GetFinancialApplicationDataFailure returns the correct object', () => {
    const message = {
      tipo_critica: '',
      mensagem: '',
    }
    expect(GetFinancialApplicationDataFailure({ message })).toEqual({
      message,
      type: Types.DATA_GET_FAILURE,
    })
  })

  test('if PostFinancialApplicationDataRequest returns the correct object', () => {
    const ciencia_desenquadramento: 'N' | 'S' = 'N'
    const payload = {
      data: {
        id_fundo: '',
        valor: 0,
        data: '',
        ciencia_desenquadramento,
      },
      onSuccess: () => {},
      onError: () => {},
    }
    expect(PostFinancialApplicationDataRequest(payload)).toEqual({
      payload,
      type: Types.DATA_POST_REQUEST,
    })
  })
  test('if PostFinancialApplicationDataSuccess returns the correct object', () => {
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
    expect(PostFinancialApplicationDataSuccess(payload)).toEqual({
      type: Types.DATA_POST_SUCCESS,
      payload,
    })
  })
  test('if PostFinancialApplicationDataFailure returns the correct object', () => {
    const message = {
      tipo_critica: '',
      mensagem: '',
    }
    expect(PostFinancialApplicationDataFailure({ message })).toEqual({
      message,
      type: Types.DATA_POST_FAILURE,
    })
  })
  test('if UpdateAdhesionTerm returns the correct object', () => {
    expect(UpdateAdhesionTerm(true)).toEqual({
      payload: true,
      type: Types.UPDATE_ADHESION_TERM,
    })
  })
})
