import React from 'react'
import { renderWithReduxAndTheme } from 'testUtils'
import { screen } from '@testing-library/react'

import InvestmentLoadingStateCard from 'pages/Home/InvestmentCard/InvestmentLoadingStateCard'

describe('InvestmentLoadingStateCard', () => {
  it('should render loading state data', () => {
    renderWithReduxAndTheme(<InvestmentLoadingStateCard />)

    expect(
      screen.getByText('Aguarde, estamos buscando suas informações...')
    ).toBeDefined()
  })
})
