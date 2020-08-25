import { Types } from './types'
import {
  GetRedeemRequest,
  GetRedeemSuccess,
  GetRedeemFailure,
  RedeemLayerToggleOpen,
  RedeemLayerToggleClose,
} from './action'

describe('Investment/Redeem actions', () => {
  test('if GetRedeemRequest returns the correct object', () => {
    const payload = {
      data_operacao: '',
      id_fundo: '',
      onErrorToast: (toast: {}) => {},
    }
    expect(GetRedeemRequest(payload)).toEqual({
      payload,
      type: Types.REDEEM_DATA_GET_REQUEST,
    })
  })
  test('if GetRedeemSuccess returns the correct object', () => {
    const payload = {
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
    }
    expect(GetRedeemSuccess(payload)).toEqual({
      type: Types.REDEEM_DATA_GET_SUCCESS,
      payload,
    })
  })
  test('if GetRedeemFailure returns the correct object', () => {
    const message = {
      tipo_critica: '',
      mensagem: '',
    }
    expect(GetRedeemFailure({ message })).toEqual({
      message,
      type: Types.REDEEM_DATA_GET_FAILURE,
    })
  })
  test('if RedeemLayerToggleOpen returns the correct object', () => {
    expect(RedeemLayerToggleOpen()).toEqual({
      type: Types.REDEEM_LAYER_OPEN,
    })
  })
  test('if RedeemLayerToggleClose returns the correct object', () => {
    expect(RedeemLayerToggleClose()).toEqual({
      type: Types.REDEEM_LAYER_CLOSE,
    })
  })
})
