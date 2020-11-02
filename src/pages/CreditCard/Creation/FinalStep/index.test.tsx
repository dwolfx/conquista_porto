import React from 'react'
import { renderWithReduxAndTheme, screen } from 'testUtils'

import FinalStep from '.'
import { ECardFlagLabel } from 'pages/CreditCard/Creation/common/labels'

const formData = {
  bairro: 'Aldeia da Areia',
  cep: '01412111',
  cidade: 'São Paulo',
  codigoBandeira: '2',
  codigoCanal: '14',
  codigoEstadoCivil: '1',
  codigoProfissao: '3',
  complemento: 'Ap 171',
  dataEmissaoDocumento: '12/02;2010',
  dataNascimento: '10/06/1984',
  dddTelefone: '11',
  diaVencimento: '17',
  email: 'uchiha@konoha.com.jp',
  idSimulacao: '16',
  logradouro: 'Avenida Brasil',
  nacionalidade: 'Brasileira',
  nome: 'Sasuke',
  nomeMae: 'Senhora Uchiha',
  numeroDocumentoIdentificacao: '92637929',
  numeroLogradouro: '20',
  numeroTelefone: '40028922',
  orgaoExpedidor: 'SP',
  sexo: 'M',
  tipoDocumento: 'RG',
  uf: 'SP',
  valorRenda: '10000',
}

const orderResponseSuccess = {
  codigoRetorno: 0,
  mensagem: {
    mensagem: "SUCESSO",
    tipoCritica: "SUCESSO"
  },
  numeroProposta: 85398
}

const orderResponseError = {
  codigoRetorno: 9,
  mensagem: {
    mensagem: "ERRO",
    tipoCritica: "ERRO"
  },
  numeroProposta: 99999
}

describe('Credit Card - Final Step', () => {
  it('Should be defined', () => {
    expect(FinalStep).toBeDefined()
  })

  it('should render correctly', () => {
    renderWithReduxAndTheme(
      <FinalStep formData={formData} formOrderResponse={orderResponseSuccess} />
    )
    expect(screen.getByText('Sua solicitação')).toBeInTheDocument()
  })

  it('should show success message', () => {
    renderWithReduxAndTheme(
      <FinalStep formData={formData} formOrderResponse={orderResponseSuccess} />
    )
    expect(screen.getByText('A solicitação do seu cartão de crédito Porto Seguro foi enviada com sucesso!')).toBeInTheDocument()
  })

  it('should show order number', () => {
    renderWithReduxAndTheme(
      <FinalStep formData={formData} formOrderResponse={orderResponseSuccess} />
    )
    expect(screen.getByText(`${orderResponseSuccess.numeroProposta}`)).toBeInTheDocument()
  })

  it('should show card flag selected by user', () => {
    renderWithReduxAndTheme(
      <FinalStep formData={formData} formOrderResponse={orderResponseSuccess} />
    )
    expect(screen.getByText(`${ECardFlagLabel[+formData.codigoBandeira!]}`)).toBeInTheDocument()
  })

  it('should show due date selected by user', () => {
    renderWithReduxAndTheme(
      <FinalStep formData={formData} formOrderResponse={orderResponseSuccess} />
    )
    expect(screen.getByText(`${formData.diaVencimento}`)).toBeInTheDocument()
  })

  it('should show user email', () => {
    renderWithReduxAndTheme(
      <FinalStep formData={formData} formOrderResponse={orderResponseSuccess} />
    )
    expect(screen.getByText(formData.email)).toBeInTheDocument()
  })

  it('should show error message', () => {
    renderWithReduxAndTheme(
      <FinalStep formData={formData} formOrderResponse={orderResponseError} />
    )
    expect(screen.getByText('Desculpe, ocorreu uma falha e não foi possível enviar a sua solicitação.')).toBeInTheDocument()
  })
})
