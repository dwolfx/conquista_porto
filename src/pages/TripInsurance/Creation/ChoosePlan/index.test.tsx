import React from 'react'

import { renderWithReduxAndTheme, screen, fireEvent } from 'testUtils'

import ChoosePlan from '.'

describe('Choose Plan tests', () => {
  it('should exists', () => {
    expect(ChoosePlan).toBeDefined()
  })
  it('should render one card correctly', () => {
    renderWithReduxAndTheme(<ChoosePlan />)
    const title = screen.getByText('Escolha um plano disponível')
    const switchText = screen.getByText(
      'simular em até 12x sem juros com 5% de desconto no Cartão Porto Seguro'
    )
    const planName = screen.getByText('Brasil Terra')
    const installmentsAmount = screen.getByText('3x sem juros de R$ 209,97')
    const upfrontAmount = screen.getByText('R$ 659,82 à vista')
    const firstCoverageAmount = screen.getByText('R$ 150.000,00')
    const secondCoverageAmount = screen.getByText('R$ 250.000,00')
    const thridCoverageAmount = screen.getByText('R$ 350.000,00')
    const openModal = screen.getByText('comparativo de coberturas')
    const editData = screen.getByText('alterar dados')
    expect(title).toBeInTheDocument()
    expect(switchText).toBeInTheDocument()
    expect(planName).toBeInTheDocument()
    expect(installmentsAmount).toBeInTheDocument()
    expect(upfrontAmount).toBeInTheDocument()
    expect(firstCoverageAmount).toBeInTheDocument()
    expect(secondCoverageAmount).toBeInTheDocument()
    expect(thridCoverageAmount).toBeInTheDocument()
    expect(openModal).toBeInTheDocument()
    expect(editData).toBeInTheDocument()
  })
})
