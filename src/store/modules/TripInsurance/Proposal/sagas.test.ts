import { call, put } from 'redux-saga/effects'
import { post, baseURLNamespaceInvestAws } from 'services/api'
import tripInsuranceProposalMock from 'mocks/tripInsuranceProposal.json'

import { postTripInsuranceProposal } from './sagas'
import {
  PostTripInsuranceProposalSuccess,
  PostTripInsuranceProposalFailure,
} from './action'

import { IPayload, Types } from './types'

const Step = jest.fn()

const requestData: IPayload = {
  type: Types.POST_TRIP_INSURANCE_PROPOSAL_REQUEST,
  payload: {
    dataIda: '11/05/2021',
    dataVolta: '18/06/2021',
    motivoViagem: 1,
    isPraticaAventura: false,
    isMotocicleta: false,
    qtdPassagMenorSetentaAnos: 1,
    qtdPassagMaiorSetentaAnos: 0,
    codigoUfOrigem: 'SP',
    codigoPaisDestino: '28',
    pacoteEscolhido: '2',
    valorSeguro: 21.212,
    passageiroPrincipal: {
      nome: 'Joao Silva',
      email: 'joao@uol.com.br',
      dataNascimento: '01/02/1990',
      sexo: 'F',
      numeroCpf: '984392661',
      digitoCpf: '70',
      isResidePais: true,
      celularDDD: '11',
      celularNumero: '987787877',
      contato: {
        nome: 'Joao',
        celularDDD: '11',
        celularNumero: '989818198',
      },
      endereco: {
        tipo: 'Rua',
        logradouro: 'Rua Aimbere',
        bairro: 'Sumare',
        cidade: 'Sao Paulo',
        uf: 'SP',
        complemento: '321',
        numero: '123',
        numeroCep: '01258',
        complementoCep: '020',
      },
    },
    acompanhantes: [
      {
        nome: 'André Ramos',
        email: 'andre.ramos@mail.com',
        dataNascimento: '28/09/1995',
        sexo: 'M',
        numeroCpf: '984392661',
        digitoCpf: '70',
        numeroCpfResponsavel: '885463725',
        digitoCpfResponsavel: '44',
        isResidePais: true,
        codigoPaisResidente: '',
        celularDDD: '13',
        celularNumero: '982343190',
        contato: {
          nome: 'André Ramos',
          celularDDD: '13',
          celularNumero: '283628564',
        },
        pessoaExposta: {
          grauRelacionamento: 1,
          nome: 'Carlos Almeida',
          numeroCpf: '635517266',
          digitoCpf: '99',
          grauParentesco: 1,
        },
        endereco: {
          tipo: 'Rua',
          cidade: 'Sao Paulo',
          bairro: 'Sumare',
          numero: '123',
          complemento: '321',
          numeroCep: '01258',
          complementoCep: '020',
          logradouro: 'Rua Aimbere',
          uf: 'SP',
        },
      },
    ],
    pagamento: {
      codigoBandeira: 5,
      primeiroNumero: '4222',
      segundoNumero: '0000',
      terceiroNumero: '1318',
      quartoNumero: '5198',
      codigoSeguranca: 123,
      mesValidade: '07',
      anoValidade: '2022',
      nomeTitular: 'Eduardo',
      quantidadeParcelas: 1,
      isCartaoPorto: false,
    },
    isAceiteTermos: true,
    isCienteMoto: true,
    idSimulacao: 2789,
  },
  onSuccess: () => {},
  onErrorToast: () => {},
  Step,
  setRetries: () => {},
}

describe('Trip Insurance quotation Sagas', () => {
  it('success triggers success action', () => {
    const onSuccessMock = jest.fn()

    const generator = postTripInsuranceProposal({
      ...requestData,
      onSuccess: onSuccessMock,
    })
    const response = tripInsuranceProposalMock

    expect(generator.next().value).toEqual(
      call(
        post,
        `${baseURLNamespaceInvestAws}/viagem/proposta`,
        requestData.payload
      )
    )

    expect(generator.next({ data: response }).value).toEqual(
      put(PostTripInsuranceProposalSuccess(response))
    )

    expect(generator.next()).toEqual({ done: true, value: undefined })
    expect(onSuccessMock).toHaveBeenCalled()
  })
  it('success triggers success action without onSuccess function', () => {
    const generator = postTripInsuranceProposal({
      ...requestData,
      onSuccess: null,
    })
    const response = tripInsuranceProposalMock

    expect(generator.next().value).toEqual(
      call(
        post,
        `${baseURLNamespaceInvestAws}/viagem/proposta`,
        requestData.payload
      )
    )

    expect(generator.next({ data: response }).value).toEqual(
      put(PostTripInsuranceProposalSuccess(response))
    )

    expect(generator.next()).toEqual({ done: true, value: undefined })
  })
  it('failure triggers failure action', () => {
    const generator = postTripInsuranceProposal(requestData)

    expect(generator.next().value).toEqual(
      call(
        post,
        `${baseURLNamespaceInvestAws}/viagem/proposta`,
        requestData.payload
      )
    )
    expect(generator.next(undefined).value).toEqual(
      put(PostTripInsuranceProposalFailure())
    )
    expect(generator.next()).toEqual({ done: true, value: undefined })
  })
  it(`should trigger failure action if 'TipoCritica' = 'CRITICA_NEGOCIO'`, () => {
    const generator = postTripInsuranceProposal({
      ...requestData,
    })
    const response = {
      Message: {
        Mensagem: 'Erro ao validar os campos',
        TipoCritica: 'CRITICA_NEGOCIO',
      },
    }

    expect(generator.next().value).toEqual(
      call(
        post,
        `${baseURLNamespaceInvestAws}/viagem/proposta`,
        requestData.payload
      )
    )

    expect(generator.next({ data: response }).value).toEqual(
      put(PostTripInsuranceProposalFailure())
    )

    expect(generator.next()).toEqual({ done: true, value: undefined })
  })
})
