import { ICreditCardCreationPayload } from 'pages/CreditCard/Creation/types'
import React from 'react'
import { storeFactory } from 'setupTests'

import { renderWithReduxAndTheme, screen, fireEvent } from 'testUtils'
import SummaryProposal from '.'

import Creation from '.'

// DADOS MOCKADOS -- TIRAR ASSIM QUE A INTEGRAÇÃO ESTIVER FEITA
const mockedProposalData = {
  personalData: {
    email: 'email@email.com',
    taxId: '12345678901',
    dateOfBirth: '1987-11-25T00:00:00-03:00',
    mobileNumber: '925425896',
    state: 'São Paulo',
    document: {
      type: 'RG',
      number: '1234567-X',
      issueDate: '25/11/2019',
      issuingBody: 'SSPSP',
    },
    civilStatusCode: '1',
    gender: 'M',
    professionCode: '3',
    motherName: 'Etelvina',
  },
  creditCardData: {
    flagCode: '1',
    dueDate: '20',
  },
  deliveryData: {
    zipCode: '02356230',
    address: 'Rua lá de cima, 789',
    addressComplement: '12-A',
    neighborhood: 'Vila do Chaves',
    city: 'São Paulo',
    state: 'Acapulco',
  },
}

// DADOS MOCKADOS -- TIRAR ASSIM QUE A INTEGRAÇÃO ESTIVER FEITA
const defaultStore = {
  bairro: mockedProposalData.deliveryData.neighborhood,
  cep: mockedProposalData.deliveryData.zipCode,
  cidade: mockedProposalData.deliveryData.city,
  codigoBandeira: mockedProposalData.creditCardData.flagCode,
  codigoCanal: '1',
  codigoEstadoCivil: mockedProposalData.personalData.civilStatusCode,
  codigoProfissao: mockedProposalData.personalData.professionCode,
  complemento: mockedProposalData.deliveryData.addressComplement,
  dataEmissaoDocumento: mockedProposalData.personalData.document.issueDate,
  dataNascimento: mockedProposalData.personalData.dateOfBirth,
  dddTelefone: '11',
  diaVencimento: mockedProposalData.creditCardData.dueDate,
  email: mockedProposalData.personalData.email,
  idSimulacao: '1',
  logradouro: mockedProposalData.deliveryData.address,
  nacionalidade: 'Brazolias',
  nome: 'Huhu',
  nomeMae: mockedProposalData.personalData.motherName,
  numeroDocumentoIdentificacao: mockedProposalData.personalData.document.number,
  numeroLogradouro: '123',
  numeroTelefone: mockedProposalData.personalData.mobileNumber,
  orgaoExpedidor: mockedProposalData.personalData.document.issuingBody,
  sexo: mockedProposalData.personalData.gender,
  tipoDocumento: mockedProposalData.personalData.document.type,
  uf: mockedProposalData.deliveryData.state,
  valorRenda: '10000',
  cpf: '12345678912',
  estado: 'São Paulo',
}

const createRootContainer = () => {
  let container = document.getElementById('root')
  if (!container) {
    container = document.createElement('div')
    container.setAttribute('id', 'root')
    document.body.appendChild(container)
  }
  return container
}

const setup = (initialState: ICreditCardCreationPayload) => {
  const store = storeFactory(initialState)
  return renderWithReduxAndTheme(<SummaryProposal />, {
    store,
    container: createRootContainer(),
  })
}

describe('SummaryProposal rendering tests', () => {
  it('should exist', () => {
    expect(SummaryProposal).toBeDefined()
  })
  it('should render correctly', () => {
    setup(defaultStore)

    expect(screen.getByText('Proposta')).toBeInTheDocument()
    expect(
      screen.getByText('Proposta de cartão especial para você!')
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        'Se precisar tirar dúvidas fale com o seu parceiro ou através de nossos canais de atendimento.'
      )
    ).toBeInTheDocument()
    expect(screen.getByText('DADOS PESSOAIS')).toBeInTheDocument()
    expect(screen.getByText('DADOS DO CARTÃO')).toBeInTheDocument()
    expect(screen.getByText('DADOS DE ENTREGA')).toBeInTheDocument()
    expect(
      screen.getByText(
        'Concordo com a solicitação do Cartão de Crédito Porto Seguro e com as condições do contrato, que será enviado com o cartão.'
      )
    ).toBeInTheDocument()
  })
})

describe('SummaryProposal behaviors tests', () => {
  it('should enable "Concluir Contratação" button when all data is valid and the checkbox is checked', () => {
    setup(defaultStore)

    const checkbox = screen.getByTestId('credit-card-check')
    fireEvent.click(checkbox)

    const acceptButton = screen.getByTestId('proposal-summary-accept-button')
    expect(acceptButton).not.toBeDisabled()
  })

  it('should disable "Concluir Contratação" button when any data is invalid', () => {
    const defaultStore = {}
    setup(defaultStore)

    const acceptButton = screen.getByTestId('proposal-summary-accept-button')
    expect(acceptButton).toBeDisabled()
  })

  it('should disable "Concluir Contratação" button when all data is valid and the checkbox is not checked', () => {
    setup(defaultStore)

    const acceptButton = screen.getByTestId('proposal-summary-accept-button')
    expect(acceptButton).toBeDisabled()
  })

  it('should shows the tooltip when the button "Concluir Contratação" is disabled', () => {
    setup(defaultStore)

    const acceptButton = screen.getByTestId('proposal-summary-accept-button')
    fireEvent.mouseEnter(acceptButton)
    expect(
      screen.getByText(
        'Há campos vazios ou com erros. Por favor, verifique e tente novamente.'
      )
    ).toBeInTheDocument()
  })
})
