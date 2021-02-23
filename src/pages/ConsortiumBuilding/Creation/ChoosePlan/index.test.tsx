import React from 'react'
import { storeFactory } from 'setupTests'

import { renderWithReduxAndTheme, screen } from 'testUtils'

import responseMock from 'mocks/consortiumBuildingProposalSimulations.json'

import userEvent from '@testing-library/user-event'
import ChoosePlan from '.'

let portalRoot = document.getElementById('root')

if (!portalRoot) {
  portalRoot = document.createElement('div')
  portalRoot.setAttribute('id', 'root')
  document.body.appendChild(portalRoot)
}

const defaulState = {
  consortiumBuildingProposalSimulations: {
    data: responseMock,
    isLoading: false,
    hasError: false,
  },
}

const setup = (initialState: any) => {
  let store = storeFactory(initialState)
  store = { ...store, dispatch: jest.fn() }
  return renderWithReduxAndTheme(<ChoosePlan />, { store })
}

describe('Choose Plan tests', () => {
  it('should exists', () => {
    expect(ChoosePlan).toBeDefined()
  })
  it('should render one card correctly', () => {
    setup(defaulState)

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
    const editData = screen.getByText('alterar dados')
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
    expect(editData).toBeInTheDocument()
  })
  it('should render loading state', () => {
    setup({
      consortiumBuildingProposalSimulations: {
        data: responseMock,
        isLoading: true,
        hasError: false,
      },
    })

    const title = screen.getAllByRole('heading', {
      name: 'Aguarde, estamos buscando as melhores opções para você...',
    })

    expect(title[0]).toBeInTheDocument()
  })
  it('should render error state', () => {
    setup({
      consortiumBuildingProposalSimulations: {
        data: responseMock,
        isLoading: false,
        hasError: true,
      },
    })

    const title = screen.getByText(
      /Desculpe, não foi possível carregar suas informações. Aguarde alguns instantes e tente novamente./i
    )
    const tryAgainButton = screen.getByText(/tentar novamente/i)
    userEvent.click(tryAgainButton)

    expect(title).toBeInTheDocument()
    expect(tryAgainButton).toBeInTheDocument()
  })

  it('should render not content state', () => {
    setup({
      consortiumBuildingProposalSimulations: {
        data: {
          simulacoes: [],
        },
        isLoading: false,
        hasError: true,
      },
    })

    const title = screen.getByText(
      /Desculpe, no momento não temos um plano adequado para suas necessidades./i
    )
    const simulateAgainButton = screen.getByText(/simular novamente/i)
    userEvent.click(simulateAgainButton)

    expect(title).toBeInTheDocument()
    expect(simulateAgainButton).toBeInTheDocument()
  })
})
