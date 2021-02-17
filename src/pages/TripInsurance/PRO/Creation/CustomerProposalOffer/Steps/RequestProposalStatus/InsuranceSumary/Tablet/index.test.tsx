import React from 'react'
import { renderWithReduxAndTheme, screen } from 'testUtils'
import { storeFactory } from 'setupTests'
import tripInsuranceQuotationMock from 'mocks/tripInsuranceQuotation.json'
import tripInsuranceProposalMock from 'mocks/tripInsuranceProposal.json'

import InsuranceSumaryTablet from '.'

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
      acompanhantes: [
        {
          nome: 'Nome Acompanhante 1',
          email: 'email@acompanhante1.com',
          dataNascimento: '31/05/1990',
          sexo: 'F',
          numeroCpf: '111111111',
          digitoCpf: '22',
          isResidePais: true,
          celularDDD: '11',
          celularNumero: '987985465',
          contato: {
            nome: 'Contato Do Passageiro Principal',
            celularDDD: '11',
            celularNumero: '932216554',
          },
          endereco: {
            tipo: 'Rua',
            logradouro: 'Rua Augusta',
            bairro: 'Penha',
            cidade: 'São Paulo',
            uf: 'SP',
            complemento: '',
            numero: '123A',
            numeroCep: '01419',
            complementoCep: '001',
          },
          id: 1,
          status: true,
          numeroCpfResponsavel: '111111111',
          digitoCpfResponsavel: '22',
          codigoPaisResidente: '28',
          pessoaExposta: {
            nome: 'Nome Pessoa Exposta',
            numeroCpf: '000000001',
            digitoCpf: '91',
            grauRelacionamento: 1,
            grauParentesco: 1,
          },
        },
      ],
      codigoCanal: 1,
      codigoOperacao: '',
      codigoPaisDestino: '',
      codigoUfOrigem: 'AC',
      dataIda: '20/12/2025',
      dataVolta: '30/12/2025',
      hasLatinAmericaCountryAndOtherCountry: false,
      hasOnlyLatinAmericaDestination: false,
      idParceiro: 123,
      idSimulacao: '123',
      isAceiteTermos: true,
      isCienteMoto: true,
      isMotocicleta: true,
      isPraticaAventura: false,
      motivoViagem: 1,
      nationalDestination: false,
      nomeDoPlano: 'Brasil Terra',
      pacoteEscolhido: '',
      paisesAdicionais: [
        {
          codigo: '10',
          descricao: 'Africa',
        },
      ],
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
        isCartaoPorto: true,
      },
      passageiroPrincipal: {
        nome: 'Nome Passageiro Principal',
        email: 'email@principal.com',
        dataNascimento: '20/12/1980',
        sexo: 'M',
        numeroCpf: '000000001',
        digitoCpf: '91',
        isResidePais: true,
        celularDDD: '11',
        celularNumero: '965543221',
        contato: {
          nome: 'Contato Do Passageiro Principal',
          celularDDD: '11',
          celularNumero: '932216554',
        },
        endereco: {
          tipo: 'Rua',
          logradouro: 'Rua Augusta',
          bairro: 'Penha',
          cidade: 'São Paulo',
          uf: 'SP',
          complemento: '',
          numero: '123A',
          numeroCep: '01419',
          complementoCep: '001',
        },
      },
      pessoaExposta: {
        nome: 'Nome Pessoa Exposta',
        numeroCpf: '000000001',
        digitoCpf: '91',
        grauRelacionamento: 1,
        grauParentesco: 4,
      },
      qtdPassagMaiorSetentaAnos: 0,
      qtdPassagMenorSetentaAnos: 1,
      susep: '',
      valorComDesconto: 1001.02,
      valorSeguro: 1100.5,
      valorSemDesconto: 1100.5,
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
  return renderWithReduxAndTheme(<InsuranceSumaryTablet />, {
    store,
  })
}

describe('Success state tests', () => {
  it('exists', () => {
    expect(InsuranceSumaryTablet).toBeDefined()
  })
  it('should display the header: "Resumo"', () => {
    setup(defaultStore)
    expect(screen.getByText('Resumo')).toBeInTheDocument()
  })
  it('should display the field: "Plano"', () => {
    setup(defaultStore)
    expect(screen.getByText(/plano/i)).toBeInTheDocument()
    expect(screen.getByText('Brasil Terra')).toBeInTheDocument()
  })
  // Liberar teste após integração do redis
  // it('should display the field: "Total"', () => {
  //   setup(defaultStore)
  //   expect(screen.getByText(/total/i)).toBeInTheDocument()
  //   expect(
  //     screen.getByRole('heading', { name: '6x de R$ 5,61' })
  //   ).toBeInTheDocument()
  // })
  it('should display the field: "Período"', () => {
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
