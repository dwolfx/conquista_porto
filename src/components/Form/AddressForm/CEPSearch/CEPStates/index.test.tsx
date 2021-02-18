import React from 'react'

import { renderWithReduxAndTheme, screen } from 'testUtils'
import { fireEvent } from '@testing-library/dom'

import CEPStates from '.'
import { ECEPStates } from './types'

const fn = jest.fn()

describe('CEP states tests', () => {
  it('should exists', () => {
    expect(CEPStates).toBeDefined()
  })
  it('should render correctly loading state', () => {
    renderWithReduxAndTheme(
      <CEPStates CEPState={ECEPStates.loading} setCEPState={fn} />
    )
    const loading = screen.getByText('Aguarde')
    const dontKnowTheZIPCode = screen.getByText('Não sabe o CEP?')
    expect(loading).toBeInTheDocument()
    expect(dontKnowTheZIPCode).toBeInTheDocument()
  })
  it('should render correctly zip code found state', () => {
    renderWithReduxAndTheme(
      <CEPStates CEPState={ECEPStates.found} setCEPState={fn} />
    )
    const address1 = screen.getByText('Av. Paulista - Cerqueira César')
    const address2 = screen.getByText('São Paulo - SP')
    const dontKnowTheZIPCode = screen.getByText('Não sabe o CEP?')
    const numero = screen.getByText('Número')
    const complemento = screen.getByText('Complemento (opcional)')
    expect(address1).toBeInTheDocument()
    expect(address2).toBeInTheDocument()
    expect(dontKnowTheZIPCode).toBeInTheDocument()
    expect(numero).toBeInTheDocument()
    expect(complemento).toBeInTheDocument()
  })
  it('should render correctly address partially found state', () => {
    renderWithReduxAndTheme(
      <CEPStates CEPState={ECEPStates.partiallyFound} setCEPState={fn} />
    )
    const address = screen.getByText('Águas de São Pedro / SP')
    const dontKnowTheZIPCode = screen.getByText('Não sabe o CEP?')
    const numero = screen.getByText('Número')
    const complemento = screen.getByText('Complemento (opcional)')
    const bairro = screen.getByText('Bairro')
    expect(address).toBeInTheDocument()
    expect(dontKnowTheZIPCode).toBeInTheDocument()
    expect(numero).toBeInTheDocument()
    expect(complemento).toBeInTheDocument()
    expect(bairro).toBeInTheDocument()
  })
  it('should render correctly zip code not found state and showing the card', () => {
    renderWithReduxAndTheme(
      <CEPStates CEPState={ECEPStates.notFound} setCEPState={fn} />
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

    expect(notFound).toBeInTheDocument()
    expect(dontKnowTheZIPCode).toBeInTheDocument()
    expect(issuesInFindingZIPCode).toBeInTheDocument()
    expect(fillAddressManually).toBeInTheDocument()
  })
  it('should render correctly zip code not found state and filling the data manually', () => {
    renderWithReduxAndTheme(
      <CEPStates CEPState={ECEPStates.notFound} setCEPState={fn} />
    )
    const fillAddressManually = screen.getByText(
      'preencha o endereço manualmente'
    )

    fireEvent.click(fillAddressManually)

    const fillAddressManually2 = screen.getByText(
      'Preenchimento manual de endereço'
    )
    const cancel = screen.getByText('cancelar')
    const numero = screen.getByText('Número')
    const complemento = screen.getByText('Complemento (opcional)')
    const bairro = screen.getByText('Bairro')
    const cidade = screen.getByText('Cidade')
    const estado = screen.getByPlaceholderText('Selecione')
    const address = screen.getByText('Endereço (Rua/Avenida)')

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
