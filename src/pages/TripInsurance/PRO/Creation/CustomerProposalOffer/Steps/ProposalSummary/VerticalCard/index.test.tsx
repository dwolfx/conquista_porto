import React from 'react'

import { renderWithReduxAndTheme, screen } from 'testUtils'

import VerticalCard from '.'
import * as t from '../types'

const plano: t.IPlan = {
  planName: 'Brasil Terra',
  installmentsAmount: '3x sem juros de R$ 209,97',
  upfrontAmount: 'R$ 659,82 à vista',
  firstCoverageAmount: 'R$ 150.000,00',
  secondCoverageAmount: 'R$ 250.000,00',
  thridCoverageAmount: 'R$ 350.000,00',
  preSelected: true,
}

const setup = () =>
  renderWithReduxAndTheme(
    <VerticalCard
      planInformation={plano}
      selectedCard="Brasil Terra"
      setSelectedCard={jest.fn()}
    />
  )

describe('VerticalCard component tests', () => {
  it('should exists', () => {
    expect(VerticalCard).toBeDefined()
  })
  it('should render the selected card correctly', () => {
    setup()
    const textsToBeDefined = [
      'Pré-selecionado pelo seu parceiro',
      'Brasil Terra',
      '3x sem juros de R$ 209,97',
      'R$ 659,82 à vista',
      'R$ 150.000,00',
      'R$ 250.000,00',
      'R$ 350.000,00',
    ]

    const suiteTests = textsToBeDefined.map(word => ({
      execution: screen.getByText(word),
    }))

    suiteTests.forEach(({ execution }) => expect(execution).toBeInTheDocument())

    const radioOption = screen.getByRole('radio')

    expect(radioOption).toBeChecked()
  })
  it('should render the unselected card correctly', () => {
    plano.preSelected = false
    renderWithReduxAndTheme(
      <VerticalCard
        planInformation={plano}
        selectedCard="Brasil Prata"
        setSelectedCard={jest.fn()}
      />
    )

    const textsToBeDefined = [
      'Brasil Terra',
      '3x sem juros de R$ 209,97',
      'R$ 659,82 à vista',
      'R$ 150.000,00',
      'R$ 250.000,00',
      'R$ 350.000,00',
    ]

    const suiteTests = textsToBeDefined.map(word => ({
      execution: screen.getByText(word),
    }))

    const radioOption = screen.getByRole('radio')

    suiteTests.forEach(({ execution }) => expect(execution).toBeInTheDocument())

    expect(radioOption).not.toBeChecked()
  })
})
