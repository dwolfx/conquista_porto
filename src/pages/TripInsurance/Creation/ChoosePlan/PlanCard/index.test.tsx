import React from 'react'

import { renderWithReduxAndTheme, screen } from 'testUtils'

import PlanCard from '.'

const mockedFunction = jest.fn()

describe('Plan Card tests', () => {
  it('should exists', () => {
    expect(PlanCard).toBeDefined()
  })
  it('should render correctly', () => {
    renderWithReduxAndTheme(
      <PlanCard
        planName="Brasil Terra"
        recommendedPaymentPlan="3x sem juros de R$ 209,97"
        upfrontPayment="R$ 659,82 à vista"
        firstCoverageAmount="R$ 150.000,00"
        secondCoverageAmount="R$ 250.000,00"
        thridCoverageAmount="R$ 350.000,00"
        isLoading={true}
        onHireClick={mockedFunction}
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
})
