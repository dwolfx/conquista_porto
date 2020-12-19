import React from 'react'
import { renderWithReduxAndTheme, screen } from 'testUtils'

import ErrorState from '.'

describe('Success state tests', () => {
  it('exists', () => {
    expect(ErrorState).toBeDefined()
  })
  it('should display the correct texts: REQUEST FAILED', () => {
    renderWithReduxAndTheme(<ErrorState />)
    expect(
      screen.getByRole('img', { name: 'closerounded' })
    ).toBeInTheDocument()
    expect(
      screen.getByText('Não foi possível confirmar sua solitação.')
    ).toBeInTheDocument()
    expect(
      screen.getByText('Tente novamente mais tarde, por favor.')
    ).toBeInTheDocument()
  })
  it('should display the correct texts: PAYMENT ERROR', () => {
    renderWithReduxAndTheme(<ErrorState type="errorPayment" />)
    expect(
      screen.getByRole('img', { name: 'closerounded' })
    ).toBeInTheDocument()
    expect(
      screen.getByText('Seu pagamento pelo cartão de crédito foi declinado.')
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        'Pedimos que entre em contato com nossa central. Foi enviado para o e-mail cadastrado com mais informações, junto com a opção de pagamento por boleto.'
      )
    ).toBeInTheDocument()
  })
})
