import React from 'react'
import { renderWithReduxAndTheme, screen } from 'testUtils'
import { storeFactory } from 'setupTests'
import tripInsuranceQuotationMock from 'mocks/tripInsuranceQuotation.json'
import tripInsuranceProposalMock from 'mocks/tripInsuranceProposal.json'

import InsuranceSumaryDesktop from '.'

interface IDefaultStore {
  fluxManagement: {
    stack: []
    form: {}
  }
  tripInsuranceProposal: {
    data: {}
    isLoading: boolean
    hasError: boolean
  }
}

const defaultStore: IDefaultStore = {
  fluxManagement: {
    stack: [],
    form: {
      dataIda: '20/12/2025',
      dataVolta: '30/12/2025',
      nomeDoPlano: 'Brasil Terra',
      pagamento: {
        codigoBandeira: 7,
        primeiroNumero: '5555',
        segundoNumero: '6666',
        terceiroNumero: '7777',
        quartoNumero: '8884',
        codigoSeguranca: 123,
        mesValidade: '12',
        anoValidade: '25',
        nomeTitular: 'Nome No Cartão',
        quantidadeParcelas: 2,
        isCartaoPorto: false,
      },
      valorComDesconto: 1001.02,
      valorSemDesconto: 1100.5,
      formasPagamento: {
        listaParcelamentoCartao: [
          {
            valor: '33.63',
            id: '1',
            descricao: 'À vista',
          },
          {
            valor: '16.82',
            id: '2',
            descricao: '2x',
          },
          {
            valor: '11.21',
            id: '3',
            descricao: '3x',
          },
          {
            valor: '8.41',
            id: '4',
            descricao: '4x',
          },
          {
            valor: '6.73',
            id: '5',
            descricao: '5x',
          },
          {
            valor: '5.61',
            id: '6',
            descricao: '6x',
          },
          {
            valor: '4.8',
            id: '7',
            descricao: '7x',
          },
          {
            valor: '4.2',
            id: '8',
            descricao: '8x',
          },
          {
            valor: '3.74',
            id: '9',
            descricao: '9x',
          },
          {
            valor: '3.36',
            id: '10',
            descricao: '10x',
          },
          {
            valor: '3.06',
            id: '11',
            descricao: '11x',
          },
          {
            valor: '2.8',
            id: '12',
            descricao: '12x',
          },
        ],
        listaParcelamentoCartaoPorto: [
          {
            valor: '31.94',
            id: '1',
            descricao: 'À vista',
          },
          {
            valor: '15.97',
            id: '2',
            descricao: '2x',
          },
          {
            valor: '10.65',
            id: '3',
            descricao: '3x',
          },
          {
            valor: '7.99',
            id: '4',
            descricao: '4x',
          },
          {
            valor: '6.39',
            id: '5',
            descricao: '5x',
          },
          {
            valor: '5.32',
            id: '6',
            descricao: '6x',
          },
          {
            valor: '4.56',
            id: '7',
            descricao: '7x',
          },
          {
            valor: '3.99',
            id: '8',
            descricao: '8x',
          },
          {
            valor: '3.55',
            id: '9',
            descricao: '9x',
          },
          {
            valor: '3.19',
            id: '10',
            descricao: '10x',
          },
          {
            valor: '2.9',
            id: '11',
            descricao: '11x',
          },
          {
            valor: '2.66',
            id: '12',
            descricao: '12x',
          },
        ],
      },
    },
  },
  tripInsuranceProposal: {
    data: tripInsuranceProposalMock,
    isLoading: false,
    hasError: false,
  },
}

const setup = (initialState: IDefaultStore) => {
  const store = storeFactory(initialState)
  return renderWithReduxAndTheme(<InsuranceSumaryDesktop />, {
    store,
  })
}

describe('Success state tests', () => {
  it('exists', () => {
    expect(InsuranceSumaryDesktop).toBeDefined()
  })
  it('should display the header: "Resumo"', () => {
    setup(defaultStore)
    expect(screen.getByText('Resumo')).toBeInTheDocument()
  })
  it(`should display the field: "Plano"`, () => {
    setup(defaultStore)
    expect(screen.getByText(/plano/i)).toBeInTheDocument()
    expect(screen.getByText('Brasil Terra')).toBeInTheDocument()
  })
  it(`should display the field: "Total"`, () => {
    setup(defaultStore)
    expect(screen.getByText(/total/i)).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: '2x de R$ 16,82' })
    ).toBeInTheDocument()
  })
  it(`should display the field: "Período"`, () => {
    setup(defaultStore)
    expect(screen.getByText(/período/i)).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: '20/12/2025 à 30/12/2025' })
    ).toBeInTheDocument()
  })
  it('should display the field: "Protocolo" and its value', () => {
    setup(defaultStore)
    expect(screen.getByText(/protocolo/i)).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '39747' })).toBeInTheDocument()
  })
})
