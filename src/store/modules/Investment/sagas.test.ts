import { call, put, select } from 'redux-saga/effects'
import { get } from 'services/api'

import { getData } from './sagas'
import { GetInvestmentListSuccess, GetInvestmentListFailure } from './action'

const response = {
  data: [
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
      ],
    },
  ],
}

const normalizedResponse = [
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
]

describe('Investment Sagas', () => {
  it('success triggers success action', () => {
    const payload = {
      onSuccess: (data: {}) => {},
      onErrorToast: (toast: {}) => {},
    }
    const generator = getData({ payload })

    expect(generator.next().value).toEqual(call(get, `/fundos`))

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

    expect(generator.next().value).toEqual(call(get, `/fundos`))

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

    expect(generator.next().value).toEqual(call(get, `/fundos`))

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

    expect(generator.next().value).toEqual(call(get, `/fundos`))

    expect(generator.next(undefined).value).toEqual(
      put(GetInvestmentListFailure())
    )

    expect(generator.next()).toEqual({ done: true, value: undefined })
  })
})
