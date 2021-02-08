import React from 'react'

import { renderWithReduxAndTheme, screen } from 'testUtils'

import VerticalCard from '.'

import tripInsuranceQuotationMock from 'mocks/tripInsuranceQuotation.json'

import { IPlan } from 'store/modules/TripInsurance/InsuranceQuotation/types'

const plano: IPlan = tripInsuranceQuotationMock.ViagemPacote.pacotes[0]

const setup = () =>
  renderWithReduxAndTheme(
    <VerticalCard comparativeModalSetState={() => {}} planInformation={plano} />
  )

describe('VerticalCard component tests', () => {
  it('should exists', () => {
    expect(VerticalCard).toBeDefined()
  })
  it('should render the selected card correctly', () => {
    setup()
    const textsToBeDefined = [
      'Pré-selecionado pelo seu parceiro',
      'Brasil Prata',
      '6x SEM JUROS DE R$ 5,32',
      'R$ 31,94 à vista',
      'R$ 10.000,00',
    ]

    const suiteTests = textsToBeDefined.map(word => ({
      execution: screen.getByText(word),
    }))

    suiteTests.forEach(({ execution }) => expect(execution).toBeInTheDocument())
  })
})
