import React from 'react'
import { storeFactory } from 'setupTests'

import { renderWithReduxAndTheme, screen } from 'testUtils'

import responseMock from 'mocks/tripInsuranceQuotation.json'

import ChoosePlan from '.'

let portalRoot = document.getElementById('root')

if (!portalRoot) {
  portalRoot = document.createElement('div')
  portalRoot.setAttribute('id', 'root')
  document.body.appendChild(portalRoot)
}

const defaulState = {
  tripInsuranceQuotation: {
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

    const title = screen.getByText('Escolha um plano disponível')
    const switchText = screen.getByText(
      'simular em até 12x sem juros com 5% de desconto no Cartão Porto Seguro'
    )
    const planName = screen.getAllByText(/BRASIL TERRA/i)
    const installmentsAmount = screen.getByText('6X SEM JUROS DE R$ 5,31')
    const upfrontAmount = screen.getByText('R$ 31,83 à vista')
    const firstCoverageAmount = screen.getAllByText('R$ 10.000,00')
    const secondCoverageAmount = screen.getAllByText('R$ 80.000,00')
    const openModal = screen.getByText('comparativo de coberturas')
    const editData = screen.getByText('alterar dados')
    expect(title).toBeInTheDocument()
    expect(switchText).toBeInTheDocument()
    expect(planName[0]).toBeInTheDocument()
    expect(installmentsAmount).toBeInTheDocument()
    expect(upfrontAmount).toBeInTheDocument()
    expect(firstCoverageAmount[0]).toBeInTheDocument()
    expect(secondCoverageAmount[0]).toBeInTheDocument()
    expect(openModal).toBeInTheDocument()
    expect(editData).toBeInTheDocument()
  })
})
