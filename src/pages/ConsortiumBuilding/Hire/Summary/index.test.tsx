import React from 'react'
import { screen } from '@testing-library/react'
import { renderWithReduxAndTheme } from 'testUtils'
import Summary from '.'

const createRootContainer = () => {
  let portalRoot = document.getElementById('root')
  if (!portalRoot) {
    portalRoot = document.createElement('div')
    portalRoot.setAttribute('id', 'root')
    document.body.appendChild(portalRoot)
  }
  return portalRoot
}

const texts = {
  title: 'Contratação',
  steps: {
    summary: {
      title: 'Resumo do contrato',
      subtitle: 'Revise as informações e os termos do seu contrato.',
      modalBackSimulation: {
        title: 'Deseja voltar para a simulação?',
        content:
          'As informações do contrato que você já preencheu serão perdidas.',
        button: {
          goback: 'Refazer simulação',
          continue: 'Continuar onde estou',
        },
      },
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
    renderWithReduxAndTheme(<Summary />, { container: createRootContainer() })

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

  it('Shoud detect modal title simulation remake', () => {
    renderWithReduxAndTheme(<Summary />, { container: createRootContainer() })

    const title = screen.getByText(
      texts.steps.summary.modalBackSimulation.title
    )
    expect(title).toBeInTheDocument()
  })
})
