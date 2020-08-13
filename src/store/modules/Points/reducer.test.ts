import reducer from './reducer'
import { Types } from './types'

describe('Points reducer', () => {
  it('should return INITIAL_STATE', () => {
    expect(reducer(undefined, {})).toEqual({
      data: null,
      isLoadingExtract: false,
      hasErrorExtract: false,
      balanceData: {},
      isLoadingBalance: false,
      hasErrorBalance: false,
    })
  })
  it('should handle GET_EXTRACT_REQUEST', () => {
    expect(
      reducer(
        {
          data: null,
          isLoadingExtract: true,
          hasErrorExtract: false,
          balanceData: {},
          isLoadingBalance: false,
          hasErrorBalance: false,
        },
        {
          type: Types.GET_EXTRACT_REQUEST,
        }
      )
    ).toEqual({
      data: null,
      isLoadingExtract: true,
      hasErrorExtract: false,
      balanceData: {},
      isLoadingBalance: false,
      hasErrorBalance: false,
    })
  })
  it('should handle GET_EXTRACT_SUCCESS', () => {
    expect(
      reducer(
        {
          data: null,
          isLoadingExtract: false,
          hasErrorExtract: false,
          balanceData: {},
          isLoadingBalance: false,
          hasErrorBalance: false,
        },
        {
          type: Types.GET_EXTRACT_SUCCESS,
          payload: {
            Message: {
              TipoCritica: 'SUCESSO',
              Mensagem: 'SUCESSO',
            },
            cadastroPessoaProgramaType: {
              segmento: 'BASICO',
              codigoFidelidade: '39812241833',
              nome: 'Vitor Carmo Vannuchi',
              dataInicioVigencia: '30/09/2019',
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
          },
        }
      )
    ).toEqual({
      data: {
        Message: {
          TipoCritica: 'SUCESSO',
          Mensagem: 'SUCESSO',
        },
        cadastroPessoaProgramaType: {
          segmento: 'BASICO',
          codigoFidelidade: '39812241833',
          nome: 'Vitor Carmo Vannuchi',
          dataInicioVigencia: '30/09/2019',
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
      },
      isLoadingExtract: false,
      hasErrorExtract: false,
      balanceData: {},
      isLoadingBalance: false,
      hasErrorBalance: false,
    })
  })
  it('should handle GET_EXTRACT_FAILURE', () => {
    expect(
      reducer(
        {
          data: null,
          isLoadingExtract: false,
          hasErrorExtract: false,
          balanceData: {},
          isLoadingBalance: false,
          hasErrorBalance: false,
        },
        {
          type: Types.GET_EXTRACT_FAILURE,
        }
      )
    ).toEqual({
      data: null,
      isLoadingExtract: false,
      hasErrorExtract: true,
      balanceData: {},
      isLoadingBalance: false,
      hasErrorBalance: false,
    })
  })
  it('should handle GET_BALANCE_REQUEST', () => {
    expect(
      reducer(
        {
          data: null,
          isLoadingExtract: false,
          hasErrorExtract: false,
          balanceData: {},
          isLoadingBalance: false,
          hasErrorBalance: false,
        },
        {
          type: Types.GET_BALANCE_REQUEST,
        }
      )
    ).toEqual({
      data: null,
      isLoadingExtract: false,
      hasErrorExtract: false,
      balanceData: {},
      isLoadingBalance: true,
      hasErrorBalance: false,
    })
  })
  it('should handle GET_BALANCE_SUCCESS', () => {
    expect(
      reducer(
        {
          data: null,
          isLoadingExtract: false,
          hasErrorExtract: false,
          balanceData: {},
          isLoadingBalance: false,
          hasErrorBalance: false,
        },
        {
          type: Types.GET_BALANCE_SUCCESS,
          payload: {
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
          },
        }
      )
    ).toEqual({
      balanceData: {
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
      },
      data: null,
      isLoadingExtract: false,
      hasErrorExtract: false,
      isLoadingBalance: false,
      hasErrorBalance: false,
    })
  })
  it('should handle GET_BALANCE_FAILURE', () => {
    expect(
      reducer(
        {
          data: null,
          isLoadingExtract: false,
          hasErrorExtract: false,
          balanceData: {},
          isLoadingBalance: false,
          hasErrorBalance: false,
        },
        {
          type: Types.GET_BALANCE_FAILURE,
        }
      )
    ).toEqual({
      data: null,
      isLoadingExtract: false,
      hasErrorExtract: false,
      balanceData: {},
      isLoadingBalance: false,
      hasErrorBalance: true,
    })
  })
})
