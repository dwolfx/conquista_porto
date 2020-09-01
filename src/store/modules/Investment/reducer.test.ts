import reducer from './reducer'
import { Types } from './types'

describe('Investment Reducer', () => {
  it('should return INITIAL_STATE', () => {
    expect(reducer(undefined, {})).toEqual({
      data: [],
      isLoading: false,
      isError: false,
    })
  })
  it('should handle INVESTMENT_LIST_ADD_REQUEST', () => {
    expect(
      reducer(
        {
          data: [],
          isLoading: false,
          isError: false,
        },
        {
          type: Types.INVESTMENT_LIST_ADD_REQUEST,
        }
      )
    ).toEqual({
      data: [],
      isLoading: true,
      isError: false,
    })
  })
  it('should handle INVESTMENT_LIST_ADD_SUCCESS', () => {
    const payload = [
      [
        {
          nome_categoria: 'Cambial',
          fundos: [
            {
              apelido: 'Occam FI Cambial',
              rentabil_fundo_ano: '9.36',
              fundo_investidor_qualificado: 'N',
              nome_carteira: 'OCCAM FI CAMBIAL',
              minimo_inicial: '5000.0',
              perfil_risco: 'alto',
              resgate_cotizacao: 'D+0 (Úteis)',
              nome_empresa: 'OCCAM BRASIL GESTÃO DE RECURSOS LTDA.',
              rentabil_fundo_mes: '1.08',
              is_fundo_ativo: true,
              aplicao_liberada: true,
              hora_aplicacao: '23:53',
              resgate_financeiro: 'D+1 (Úteis)',
              perfil_risco_ordem: '5',
              url_logo_gestor:
                'https://www.portoseguro.com.br/NovoInstitucional/static_files/documents/para-mim/investimentos/fundos-de-terceiros/Logos/LOGO_OCCAM.png',
              rentabil_fundo_12_meses: '5.81',
              categoria_arena: 'Cambial',
              taxa_administracao: '0.75',
              id_fundo: '51380063',
              fundo_investidor_profissional: 'N',
            },
            {
              apelido: 'BTG Pactual Dólar FI Cambial',
              rentabil_fundo_ano: '9.42',
              fundo_investidor_qualificado: 'N',
              nome_carteira: 'BTG PACTUAL DOLAR FI CAMBIAL',
              minimo_inicial: '1000.0',
              perfil_risco: 'alto',
              resgate_cotizacao: 'D+0 (Úteis)',
              nome_empresa: 'BTG PACTUAL',
              rentabil_fundo_mes: '1.10',
              is_fundo_ativo: true,
              aplicao_liberada: true,
              hora_aplicacao: '23:53',
              resgate_financeiro: 'D+1 (Úteis)',
              perfil_risco_ordem: '5',
              url_logo_gestor:
                'https://www.portoseguro.com.br/NovoInstitucional/static_files/documents/para-mim/investimentos/fundos-de-terceiros/Logos/LOGO_BTG.png',
              rentabil_fundo_12_meses: '5.89',
              categoria_arena: 'Cambial',
              taxa_administracao: '1.00',
              id_fundo: '51380059',
              fundo_investidor_profissional: 'N',
            },
          ],
        },
      ],
    ]

    expect(
      reducer(
        {
          data: [],
          isLoading: false,
          isError: false,
        },
        {
          type: Types.INVESTMENT_LIST_ADD_SUCCESS,
          payload,
        }
      )
    ).toEqual({
      data: [...payload],
      isError: false,
      isLoading: false,
    })
  })
  it('should handle INVESTMENT_LIST_ADD_FAILURE', () => {
    expect(
      reducer(
        {
          data: [],
          isLoading: false,
          isError: false,
        },
        {
          type: Types.INVESTMENT_LIST_ADD_FAILURE,
        }
      )
    ).toEqual({
      data: [],
      isError: true,
      isLoading: false,
    })
  })
})
