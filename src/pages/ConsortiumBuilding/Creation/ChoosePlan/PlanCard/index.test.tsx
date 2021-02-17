import React from 'react'

import { renderWithReduxAndTheme, screen } from 'testUtils'

import PlanCard from '.'

describe('Plan Card tests', () => {
  it('should exists', () => {
    expect(PlanCard).toBeDefined()
  })
  it('should render correctly', () => {
    renderWithReduxAndTheme(
      <PlanCard
        creditValue={92500}
        monthlyValue={1395.79}
        numberInstallment={80}
        groupCode="A321"
        quota={42}
        reserveFund={0.5}
        administrativeFee={15.5}
        lifeInsurance={0.035}
      />
    )
    const creditValueText = screen.getByText('CRÉDITO TOTAL')
    const creditValue = screen.getByText('R$ 92.500,00')
    const groupType = screen.getByText('GRUPO EM ANDAMENTO')
    const monthlyValueText = screen.getByText('PARCELA MENSAL')
    const monthlyValue = screen.getByText('R$ 1.395,79')
    const numberInstallmentsText = screen.getByText('Nº DE PARCELAS')
    const numberInstallmentsValue = screen.getByText('80')
    const groupCodeText = screen.getByText('GRUPO')
    const groupCodeValue = screen.getByText('A321')
    const quotaText = screen.getByText('COTA')
    const quotaValue = screen.getByText('42')
    const button = screen.getByText('CONTRATAR')
    const feeResumeText = screen.getByText('RESUMO DAS TAXAS')
    const reserveFundText = screen.getByText('FUNDO DE RESERVA')
    const reserveFundValue = screen.getByText('0.5%')
    const administrativeFeeText = screen.getByText('TAXA ADMINISTRATIVA')
    const administrativeFeeValue = screen.getByText('15.5%')
    // const upfrontAdministrationFeeText = screen.getByText(
    //   'TAXA ADMINISTRATIVA ANTECIPADA'
    // )
    // const upfrontAdministrationFeeValue = screen.getByText('2%')
    const lifeInsuranceText = screen.getByText('SEGURO DE VIDA')
    const lifeInsuranceValue = screen.getByText('0.035%')
    expect(creditValueText).toBeInTheDocument()
    expect(creditValue).toBeInTheDocument()
    expect(groupType).toBeInTheDocument()
    expect(monthlyValueText).toBeInTheDocument()
    expect(monthlyValue).toBeInTheDocument()
    expect(numberInstallmentsText).toBeInTheDocument()
    expect(numberInstallmentsValue).toBeInTheDocument()
    expect(groupCodeText).toBeInTheDocument()
    expect(groupCodeValue).toBeInTheDocument()
    expect(quotaText).toBeInTheDocument()
    expect(quotaValue).toBeInTheDocument()
    expect(button).toBeInTheDocument()
    expect(feeResumeText).toBeInTheDocument()
    expect(reserveFundText).toBeInTheDocument()
    expect(reserveFundValue).toBeInTheDocument()
    expect(administrativeFeeText).toBeInTheDocument()
    expect(administrativeFeeValue).toBeInTheDocument()
    // expect(upfrontAdministrationFeeText).toBeInTheDocument()
    // expect(upfrontAdministrationFeeValue).toBeInTheDocument()
    expect(lifeInsuranceText).toBeInTheDocument()
    expect(lifeInsuranceValue).toBeInTheDocument()
  })
})
