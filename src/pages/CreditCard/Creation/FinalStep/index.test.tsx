import React from 'react'
import { renderWithReduxAndTheme, screen } from 'testUtils'

import FinalStep from '.'

describe('Credit Card - Final Step', () => {
  it('Should be defined', () => {
    expect(FinalStep).toBeDefined()
  })

  it('should render correctly', () => {
    renderWithReduxAndTheme(
      <FinalStep hasError={false} isPending={false} />
    )
    expect(screen.getByText('Sua solicitação')).toBeInTheDocument()
  })

  it('should show success message', () => {
    renderWithReduxAndTheme(
      <FinalStep hasError={false} isPending={false} />
    )
    expect(screen.getByText('A solicitação do seu cartão de crédito Porto Seguro foi enviada com sucesso!')).toBeInTheDocument()
  })

  it('should show error message', () => {
    renderWithReduxAndTheme(
      <FinalStep hasError={true} isPending={false} />
    )
    expect(screen.getByText('Desculpe, ocorreu uma falha e não foi possível enviar a sua solicitação.')).toBeInTheDocument()
  })

  it('should show pending message', () => {
    renderWithReduxAndTheme(
      <FinalStep hasError={false} isPending={true} />
    )
    expect(screen.getByText('Proposta de Cartão de Crédito Porto Seguro em análise.')).toBeInTheDocument()
  })


})
