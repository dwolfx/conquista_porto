import { call, put, select } from 'redux-saga/effects'
import { get } from 'services/api'

import { getData } from './sagas'
import { GetInvestmentListSuccess, GetInvestmentListFailure } from './action'

const response = {
  data: {
    categorias: [
      {
        nome_categoria: 'Multimercado',
        fundos: [
          {
            apelido: 'Novus Institucional FIC FIM',
            aplicacao_cotizacao: '0',
            aplicacao_financeiro: '0',
            aplicao_liberada: true,
            aplicao_minima: 1000,
            categoria_arena: 'Multimercado',
            fundo_ativo: false,
            fundo_investidor_profissional: 'N',
            fundo_investidor_qualificado: 'N',
            hora_aplicacao: '20:59',
            id_carteira: 51380124,
            minimo_inicial: 1000,
            nome_carteira: 'NOVUS INSTITUCIONAL FC FI MULT          ',
            nome_empresa: 'Novus Capital',
            nome_gestor: 'Novus Capital',
            perfil_risco: 'medio-alto',
            perfil_risco_ordem: 4,
            rentabil_fundo_12_meses: '4.62',
            rentabil_fundo_ano: '-0.71',
            rentabil_fundo_mes: '-0.31',
            resgate_cotizacao: '0',
            resgate_financeiro: '1',
            saldo_minimo: 1000,
            taxa_administracao: 0.9,
            url_logo_gestor:
              'https://www.portoseguro.com.br/NovoInstitucional/static_files/documents/par',
          },
        ],
      },
    ],
  },
}

const normalizedResponse = [
  {
    apelido: 'Novus Institucional FIC FIM',
    aplicacao_cotizacao: '0',
    aplicacao_financeiro: '0',
    aplicao_liberada: true,
    aplicao_minima: 1000,
    categoria_arena: 'Multimercado',
    fundo_ativo: false,
    fundo_investidor_profissional: 'N',
    fundo_investidor_qualificado: 'N',
    hora_aplicacao: '20:59',
    id_carteira: 51380124,
    minimo_inicial: 1000,
    nome_carteira: 'NOVUS INSTITUCIONAL FC FI MULT          ',
    nome_empresa: 'Novus Capital',
    nome_gestor: 'Novus Capital',
    perfil_risco: 'medio-alto',
    perfil_risco_ordem: 4,
    rentabil_fundo_12_meses: '4.62',
    rentabil_fundo_ano: '-0.71',
    rentabil_fundo_mes: '-0.31',
    resgate_cotizacao: '0',
    resgate_financeiro: '1',
    saldo_minimo: 1000,
    taxa_administracao: 0.9,
    url_logo_gestor:
      'https://www.portoseguro.com.br/NovoInstitucional/static_files/documents/par',
  },
]

describe('Investment Sagas', () => {
  it('success triggers success action', () => {
    const payload = {
      onSuccess: (data: {}) => {},
      onErrorToast: (toast: {}) => {},
    }
    const generator = getData({ payload })

    expect(generator.next().value).toEqual(call(get, `/fundo/grade`))

    expect(generator.next({ ...response }).value).toEqual(normalizedResponse)

    expect(generator.next(normalizedResponse).value).toEqual(
      put(GetInvestmentListSuccess(normalizedResponse))
    )

    expect(generator.next()).toEqual({ done: true, value: undefined })
  })
  it('success triggers success action without onSuccess function', () => {
    const payload = {
      onSuccess: undefined,
      onErrorToast: (toast: {}) => {},
    }
    const generator = getData({ payload })

    expect(generator.next().value).toEqual(call(get, `/fundo/grade`))

    expect(generator.next({ ...response }).value).toEqual(normalizedResponse)

    expect(generator.next(normalizedResponse).value).toEqual(
      put(GetInvestmentListSuccess(normalizedResponse))
    )

    expect(generator.next()).toEqual({ done: true, value: undefined })
  })
  it('failure triggers failure action', () => {
    const payload = {
      onSuccess: (data: {}) => {},
      onErrorToast: (toast: {}) => {},
    }
    const generator = getData({ payload })

    expect(generator.next().value).toEqual(call(get, `/fundo/grade`))

    expect(generator.next(undefined).value).toEqual(
      put(GetInvestmentListFailure())
    )

    expect(generator.next()).toEqual({ done: true, value: undefined })
  })
  it('failure triggers failure action without onErrorToast function', () => {
    const payload = {
      onSuccess: (data: {}) => {},
      onErrorToast: undefined,
    }
    const generator = getData({ payload })

    expect(generator.next().value).toEqual(call(get, `/fundo/grade`))

    expect(generator.next(undefined).value).toEqual(
      put(GetInvestmentListFailure())
    )

    expect(generator.next()).toEqual({ done: true, value: undefined })
  })
})
