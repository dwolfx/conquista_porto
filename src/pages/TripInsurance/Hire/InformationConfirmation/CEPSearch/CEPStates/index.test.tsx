import React from 'react'

import { renderWithReduxAndTheme, screen } from 'testUtils'

import CEPStates from '.'

describe('CEP states tests', () => {
  it('should exists', () => {
    expect(CEPStates).toBeDefined()
  })
  it('should render correctly loading state', () => {
    renderWithReduxAndTheme(
      <CEPStates
        isLoading
        isFound={false}
        isPartiallyFound={false}
        isNotFound={false}
      />
    )
    const loading = screen.getByText('Aguarde')
    const dontKnowTheZIPCode = screen.getByText('Não sabe o CEP?')
    expect(loading).toBeInTheDocument()
    expect(dontKnowTheZIPCode).toBeInTheDocument()
  })
  it('should render correctly zip code found state', () => {
    renderWithReduxAndTheme(
      <CEPStates
        isLoading={false}
        isFound
        isPartiallyFound={false}
        isNotFound={false}
      />
    )
    const address1 = screen.getByText('Av. Paulista - Cerqueira César')
    const address2 = screen.getByText('São Paulo - SP')
    const dontKnowTheZIPCode = screen.getByText('Não sabe o CEP?')
    const numero = screen.getByTestId('número')
    const complemento = screen.getByTestId('complemento')
    expect(address1).toBeInTheDocument()
    expect(address2).toBeInTheDocument()
    expect(dontKnowTheZIPCode).toBeInTheDocument()
    expect(numero).toBeInTheDocument()
    expect(complemento).toBeInTheDocument()
  })
  it('should render correctly address partially found state', () => {
    renderWithReduxAndTheme(
      <CEPStates
        isLoading={false}
        isFound={false}
        isPartiallyFound
        isNotFound={false}
      />
    )
    const address = screen.getByText('Águas de São Pedro / SP')
    const dontKnowTheZIPCode = screen.getByText('Não sabe o CEP?')
    const numero = screen.getByTestId('número')
    const complemento = screen.getByTestId('complemento')
    const bairro = screen.getByTestId('bairro')
    expect(address).toBeInTheDocument()
    expect(dontKnowTheZIPCode).toBeInTheDocument()
    expect(numero).toBeInTheDocument()
    expect(complemento).toBeInTheDocument()
    expect(bairro).toBeInTheDocument()
  })
  it('should render correctly zip code not found state', () => {
    renderWithReduxAndTheme(
      <CEPStates
        isLoading={false}
        isFound={false}
        isPartiallyFound={false}
        isNotFound
      />
    )
    const notFound = screen.getByText(
      'CEP não localizado. Por favor, verifique e tente novamente.'
    )
    const dontKnowTheZIPCode = screen.getByText('Não sabe o CEP?')
    const issuesInFindingZIPCode = screen.getByText(
      'Problemas para encontrar seu CEP?'
    )
    const fillAddressManually = screen.getByText(
      'preencha o endereço manualmente'
    )
    const fillAddressManually2 = screen.getByText(
      'Preenchimento manual de endereço'
    )
    const cancel = screen.getByText('cancelar')
    const numero = screen.getByTestId('número')
    const complemento = screen.getByTestId('complemento')
    const bairro = screen.getByTestId('bairro')
    const cidade = screen.getByTestId('cidade')
    const estado = screen.getByPlaceholderText('Selecione')
    const address = screen.getByTestId('endereço (rua/avenida)')

    expect(notFound).toBeInTheDocument()
    expect(dontKnowTheZIPCode).toBeInTheDocument()
    expect(issuesInFindingZIPCode).toBeInTheDocument()
    expect(fillAddressManually).toBeInTheDocument()
    expect(fillAddressManually2).toBeInTheDocument()
    expect(cancel).toBeInTheDocument()
    expect(numero).toBeInTheDocument()
    expect(complemento).toBeInTheDocument()
    expect(bairro).toBeInTheDocument()
    expect(cidade).toBeInTheDocument()
    expect(estado).toBeInTheDocument()
    expect(address).toBeInTheDocument()
  })
})
