import React from 'react'

import { renderWithReduxAndTheme, screen, fireEvent } from 'testUtils'

import PlanCard from '.'

describe('Plan Card tests', () => {
  it('should exists', () => {
    expect(PlanCard).toBeDefined()
  })
  it('should render correctly', () => {
    renderWithReduxAndTheme(
      <PlanCard
        planName="Brasil Terra"
        rating="3"
        installmentsAmount="3x sem juros de R$ 209,97"
        upfrontAmount="R$ 659,82 à vista"
        firstCoverageAmount="R$ 150.000,00"
        secondCoverageAmount="R$ 250.000,00"
        thridCoverageAmount="R$ 350.000,00"
        isLoading={true}
      />
    )
    const planName = screen.getByText('Brasil Terra')
    const installmentsAmount = screen.getByText('3x sem juros de R$ 209,97')
    const upfrontAmount = screen.getByText('R$ 659,82 à vista')
    const firstCoverageAmount = screen.getByText('R$ 150.000,00')
    const secondCoverageAmount = screen.getByText('R$ 250.000,00')
    const thridCoverageAmount = screen.getByText('R$ 350.000,00')
    const contractButton = screen.getByRole('button')
    expect(planName).toBeInTheDocument()
    expect(installmentsAmount).toBeInTheDocument()
    expect(upfrontAmount).toBeInTheDocument()
    expect(firstCoverageAmount).toBeInTheDocument()
    expect(secondCoverageAmount).toBeInTheDocument()
    expect(thridCoverageAmount).toBeInTheDocument()
    expect(contractButton).toBeInTheDocument()
  })
  it('should have the button disabled', () => {
    renderWithReduxAndTheme(
      <PlanCard
        planName="Brasil Terra"
        rating="3"
        installmentsAmount="3x sem juros de R$ 209,97"
        upfrontAmount="R$ 659,82 à vista"
        firstCoverageAmount="R$ 150.000,00"
        secondCoverageAmount="R$ 250.000,00"
        thridCoverageAmount="R$ 350.000,00"
        isLoading={true}
      />
    )
    const simulateButton = screen.getByRole('button')
    expect(simulateButton).toBeDisabled()
  })
  it('should have the button enabled', () => {
    renderWithReduxAndTheme(
      <PlanCard
        planName="Brasil Terra"
        rating="3"
        installmentsAmount="3x sem juros de R$ 209,97"
        upfrontAmount="R$ 659,82 à vista"
        firstCoverageAmount="R$ 150.000,00"
        secondCoverageAmount="R$ 250.000,00"
        thridCoverageAmount="R$ 350.000,00"
        isLoading={false}
      />
    )
    const simulateButton = screen.getByRole('button')
    expect(simulateButton).not.toBeDisabled()
  })
})
