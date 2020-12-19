import React from 'react'
import { renderWithReduxAndTheme, screen } from 'testUtils'

import InsuranceSumaryTablet from '.'

describe('Success state tests', () => {
  it('exists', () => {
    expect(InsuranceSumaryTablet).toBeDefined()
  })
  it('should display the header: "Resumo"', () => {
    renderWithReduxAndTheme(<InsuranceSumaryTablet />)
    expect(screen.getByText('Resumo')).toBeInTheDocument()
  })
  it('should display the field: "Plano" and its value', () => {
    renderWithReduxAndTheme(<InsuranceSumaryTablet />)
    expect(screen.getByText(/plano/i)).toBeInTheDocument()
    expect(screen.getByText('Brasil Terra')).toBeInTheDocument()
  })
  it('should display the field: "Total com desconto" and its value', () => {
    renderWithReduxAndTheme(<InsuranceSumaryTablet />)
    expect(screen.getByText(/total com desconto/i)).toBeInTheDocument()
    expect(screen.getByText('R$ 1.259,80')).toBeInTheDocument()
  })
  it('should display the field: "Período" and its value', () => {
    renderWithReduxAndTheme(<InsuranceSumaryTablet />)
    expect(screen.getByText(/período/i)).toBeInTheDocument()
    expect(screen.getByText('23/07/2018 à 23/08/2018')).toBeInTheDocument()
  })
  it('should display the field: "Protocolo" and its value', () => {
    renderWithReduxAndTheme(<InsuranceSumaryTablet />)
    expect(screen.getByText(/protocolo/i)).toBeInTheDocument()
    expect(screen.getByText('11463846')).toBeInTheDocument()
  })
})
