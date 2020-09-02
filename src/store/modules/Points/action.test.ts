import { Types } from './types'
import {
  GetPointsExtractRequest,
  GetPointsExtractSuccess,
  GetPointsExtractFailure,
  GetPointsBalanceRequest,
  GetPointsBalanceSuccess,
  GetPointsBalanceFailure,
  PostRecuePointsRequest,
} from './action'

describe('Points actions', () => {
  test('if GetPointsExtractRequest returns the correct object', () => {
    expect(GetPointsExtractRequest('3333333333')).toEqual({
      type: Types.GET_EXTRACT_REQUEST,
      cpf: '3333333333',
    })
  })
  test('if GetPointsExtractSuccess returns the correct object', () => {
    const payload = {
      Message: {
        TipoCritica: 'SUCESSO',
        Mensagem: 'SUCESSO',
      },
      detalheExtratoOptemaisTypes: [
        {
          pontoGanho: '200',
          descricaoTipo: 'PONTUAÇÃO',
          nomeTransacao: 'CONQUISTA',
          valorCompra: '0,00',
          taxaCon: '0,00',
          tipoDebitoCredito: 'C',
          dataCompra: '10/2019',
        },
      ],
    }
    expect(GetPointsExtractSuccess(payload)).toEqual({
      type: Types.GET_EXTRACT_SUCCESS,
      payload,
    })
  })
  test('if GetPointsExtractFailure returns the correct object', () => {
    expect(GetPointsExtractFailure()).toEqual({
      type: Types.GET_EXTRACT_FAILURE,
    })
  })
  test('if GetPointsBalanceRequest returns the correct object', () => {
    expect(GetPointsBalanceRequest('3333333333')).toEqual({
      type: Types.GET_BALANCE_REQUEST,
      cpf: '3333333333',
    })
  })
  test('if GetPointsBalanceSuccess returns the correct object', () => {
    const payload = {
      consultaPontosResponseType: {
        pontoasAvencer: '0',
        saldoAtual: '550',
        dataPontosAacumular: '',
        pontosAacumular: '0',
        dataPontosAvencer: '',
      },
      extratoOptemaisType: {
        saldoCliente: '550',
        saldoConsolidado: '550',
      },
      Message: {
        TipoCritica: 'SUCESSO',
        Mensagem: 'SUCESSO',
      },
    }
    expect(GetPointsBalanceSuccess(payload)).toEqual({
      type: Types.GET_BALANCE_SUCCESS,
      payload,
    })
  })
  test('if GetPointsBalanceFailure returns the correct object', () => {
    expect(GetPointsBalanceFailure()).toEqual({
      type: Types.GET_BALANCE_FAILURE,
    })
  })
  test('if PostRecuePointsRequest returns the correct object', () => {
    const payload = {
      onSuccess: () => {},
      onErrorToast: () => {},
    }
    expect(PostRecuePointsRequest(payload)).toEqual({
      type: Types.POST_RESCUE_POINTS_REQUEST,
      payload,
    })
  })
})
