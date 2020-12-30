import React from 'react'
import { storeFactory } from 'setupTests'
import { renderWithReduxAndTheme, screen } from 'testUtils'

import DistribuitedValue from './index'

const recommendationMock = require('mocks/recommendation.json')

describe('Recommendation Edit Wallet DistribuitedValue component', () => {
  it('should render component', () => {
    const store = storeFactory({
      objective: {
        data: recommendationMock,
      },
    })

    renderWithReduxAndTheme(
      <DistribuitedValue
        initialDistribuition={1000}
        monthlyDistribuition={100}
      />,
      {
        store,
      }
    )

    expect(screen.queryByText('Investimento Inicial')).toBeNull()
    expect(screen.queryByText('Investimento Mensal')).toBeNull()
    expect(screen.queryByText('Total Distribuído')).toBeDefined()
    expect(screen.queryByText('Planejado')).toBeDefined()
    expect(screen.queryByText('A distribuir')).toBeDefined()
    expect(screen.queryAllByText('R$ 1.000,00')).toBeDefined()
    expect(screen.queryAllByText('R$ 100,00')).toBeDefined()
    expect(screen.queryAllByText('+')[0]).toHaveStyle('color: #E72176;')
  })

  it('should render component on mobile', () => {
    const store = storeFactory({
      objective: {
        data: recommendationMock,
      },
    })

    renderWithReduxAndTheme(
      <DistribuitedValue
        initialDistribuition={1000}
        monthlyDistribuition={100}
        isMobile
      />,
      {
        store,
      }
    )

    expect(screen.queryByText('Investimento Inicial')).toBeDefined()
    expect(screen.queryByText('Investimento Mensal')).toBeDefined()
    expect(screen.queryByText('Total Distribuído')).toBeNull()
    expect(screen.queryByText('A distribuir')).toBeDefined()
    expect(screen.queryAllByText('R$ 1.000,00')).toBeDefined()
    expect(screen.queryAllByText('R$ 100,00')).toBeDefined()
    expect(screen.queryAllByText('+')[0]).toHaveStyle('color: #E72176;')
  })
})
