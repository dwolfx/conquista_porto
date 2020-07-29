import React from 'react'
import { renderWithReduxAndTheme } from 'testUtils'
import { BrowserRouter } from 'react-router-dom'
import { storeFactory } from 'setupTests'

import BaseAccountInfo from '.'

const store = storeFactory({
  redeemData: {
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
        fechado_resgate: false,
        data_prevista_conversão: '2020-07-09T00:00:00-03:00',
      },
    },
    isLoading: false,
    hasError: false,
    isLayerOpen: true,
  },
})

describe('BaseAccountInfo', () => {
  it('Should render isLoading screen', () => {
    const { getByText } = renderWithReduxAndTheme(
      <BrowserRouter>
        <BaseAccountInfo idFundo="5112" isLoading={true} hasError={false} />
      </BrowserRouter>,
      { store }
    )
    expect(getByText('Buscando informações de saldo...')).toBeDefined()
  })
  it('Should render hasError screen', () => {
    const { getByText } = renderWithReduxAndTheme(
      <BrowserRouter>
        <BaseAccountInfo idFundo="5112" isLoading={false} hasError={true} />
      </BrowserRouter>,
      { store }
    )
    expect(
      getByText(
        'Não foi possível carregar o saldo. Por favor, tente novamente.'
      )
    ).toBeDefined()
  })
  it('Should render success screen', () => {
    const { getByText } = renderWithReduxAndTheme(
      <BrowserRouter>
        <BaseAccountInfo idFundo="5112" isLoading={false} hasError={false} />
      </BrowserRouter>,
      { store }
    )
    expect(getByText('fundo')).toBeDefined()
    expect(getByText('Saldo e rendimento bruto')).toBeDefined()
  })
  it('Should render fund account value', () => {
    const { getByText } = renderWithReduxAndTheme(
      <BrowserRouter>
        <BaseAccountInfo idFundo="5112" isLoading={false} hasError={false} />
      </BrowserRouter>,
      { store }
    )
    expect(getByText('R$ 1.430.002,20')).toBeDefined()
  })
})
