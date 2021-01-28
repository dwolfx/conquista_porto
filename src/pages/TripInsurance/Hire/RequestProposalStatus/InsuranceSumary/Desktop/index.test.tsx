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
  tripInsuranceQuotation: {
    data: {}
    isLoading: boolean
    hasError: boolean
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
      acompanhantes: [
        {
          id: 1,
          nome: 'Acompanhante 1',
          status: false,
        },
      ],
      codigoCanal: 1,
      codigoPaisDestino: 28,
      codigoUfOrigem: 'SP',
      dataIda: '29/01/2021',
      dataVolta: '30/01/2021',
      hasOnlyLatinAmericaDestination: true,
      isAceiteTermos: true,
      isCienteMoto: true,
      isMotocicleta: false,
      isPraticaAventura: false,
      motivoViagem: 1,
      nationalDestination: true,
      pacoteEscolhido: '1',
      pagamento: {
        anoValidade: '2021',
        codigoBandeira: 4,
        codigoSeguranca: 123,
        isCartaoPorto: false,
        mesValidade: '12',
        nomeTitular: 'adasd',
        primeiroNumero: '4012',
        quantidadeParcelas: 6,
        quartoNumero: '1112',
        segundoNumero: '0010',
        terceiroNumero: '3714',
      },
      paisesAdicionais: [],
      passageiroPrincipal: {
        celularDDD: '11',
        celularNumero: '996229303',
        contato: {
          celularDDD: '12',
          celularNumero: '312312313',
          nome: '123123',
        },
        dataNascimento: '11/11/1981',
        digitoCpf: '07',
        email: 'ricardo.eufrasio@portoseguro.com.br',
        endereco: {
          bairro: 'PARAISO',
          cidade: 'SAO PAULO',
          complementoCep: '2',
          logradouro: 'SAMPAIO VIANA',
          numero: '123123',
          numeroCep: '04004',
          tipo: 'Rua',
          uf: 'SP',
        },
        isResidePais: true,
        nome: 'Rubao',
        numeroCpf: '362753128',
        pessoaExposta: {
          grauRelacionamento: 2,
        },
        sexo: 'M',
      },
      qtdPassagMaiorSetentaAnos: 0,
      qtdPassagMenorSetentaAnos: 1,
    },
  },
  tripInsuranceQuotation: {
    data: tripInsuranceQuotationMock,
    isLoading: false,
    hasError: false,
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
  it('should display the field: "Plano" and its value', () => {
    setup(defaultStore)
    expect(screen.getByText(/plano/i)).toBeInTheDocument()
    expect(screen.getByText('Brasil Prata')).toBeInTheDocument()
  })
  it('should display the field: "Total" and its value', () => {
    setup(defaultStore)
    expect(screen.getByText(/total/i)).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: '6x de R$ 5,61' })
    ).toBeInTheDocument()
  })
  it('should display the field: "Período" and its value', () => {
    setup(defaultStore)
    expect(screen.getByText(/período/i)).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: '29/01/2021 à 30/01/2021' })
    ).toBeInTheDocument()
  })
  it('should display the field: "Protocolo" and its value', () => {
    setup(defaultStore)
    expect(screen.getByText(/protocolo/i)).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '39747' })).toBeInTheDocument()
  })
})
