import React from 'react'
import { screen } from '@testing-library/react'
import { renderWithReduxAndTheme } from 'testUtils'
import Summary from '.'

const texts = {
  title: 'Contratação',
  steps: {
    summary: {
      title: 'Resumo do contrato',
      subtitle: 'Revise as informações e os termos do seu contrato.',
      containerFirst: {
        title: 'Dados do consórcio',
        link: 'Refazer simulação',
        creditValue: 'Valor do crédito',
        reserveFund: 'Fundo de reserva',
        lifeInsurance: 'Seguro de vida',
        administrativeFree: 'Taxa administrativa',
        earlyAdministrationFree: 'Taxa administrativa antecipada',
      },
      containerSecond: {
        title: 'Dados das Parcelas',
        monthlyInstallment: 'Parcela mensal',
        numberInstallment: 'Quantidade de parcelas',
        dateForeseenFirstInstallment: 'Data prevista para a 1ª parcela',
        dateOtherPlots: 'Data das demais parcelas',
      },
      containerThird: {
        title: 'Dados de pagamento',
        firstInstallmentPaymentMethod: 'Forma de pagamento da 1ª parcela',
        paymentRemainingInstallments: 'Forma de pagamento das demais parcelas',
        bank: 'Banco',
        agency: 'Agência',
        currentAccount: 'Conta corrente',
        earlyAdministrationFree: 'Taxa de administração antecipada',
      },
    },
  },
}

describe('Summary component test', () => {
  it('should exists', () => {
    expect(Summary).toBeDefined()
  })

  it('should render correctly', () => {
    renderWithReduxAndTheme(<Summary />)

    const title = screen.getByText(texts.title)
    const summaryTitle = screen.getByText(texts.steps.summary.title)
    const summarySubtitle = screen.getByText(texts.steps.summary.subtitle)
    const firstContainer = screen.getByText(
      texts.steps.summary.containerFirst.title
    )
    const secondContainer = screen.getByText(
      texts.steps.summary.containerFirst.title
    )
    const thirdContainer = screen.getByText(
      texts.steps.summary.containerFirst.title
    )
    expect(title).toBeInTheDocument()
    expect(firstContainer).toBeInTheDocument()
    expect(secondContainer).toBeInTheDocument()
    expect(thirdContainer).toBeInTheDocument()
    expect(summaryTitle).toBeInTheDocument()
    expect(summarySubtitle).toBeInTheDocument()
  })
})
