import React from 'react'
import { HashRouter } from 'react-router-dom'
import { screen } from '@testing-library/react'
import { renderWithReduxAndTheme } from 'testUtils'

import ObjectiveTracking, { IObjectiveTracking } from '.'

const objective: IObjectiveTracking = {
  targetValue: 40000,
  totalBalance: 2000,
}

describe('ObjectiveTracking Component', () => {
  it('should render ObjectiveTracking title', async () => {
    let portalRoot = document.getElementById('root')
    if (!portalRoot) {
      portalRoot = document.createElement('div')
      portalRoot.setAttribute('id', 'root')
      document.body.appendChild(portalRoot)
    }

    const container = portalRoot
    renderWithReduxAndTheme(
      <HashRouter>
        <ObjectiveTracking
          targetValue={objective.targetValue}
          totalBalance={objective.totalBalance}
        />
      </HashRouter>,
      { container }
    )

    const menuElement = screen.getByText('Acompanhamento do objetivo')

    expect(menuElement).toHaveTextContent('Acompanhamento do objetivo')
  })

  it('should render ObjectiveTracking 5% percentage', async () => {
    let portalRoot = document.getElementById('root')
    if (!portalRoot) {
      portalRoot = document.createElement('div')
      portalRoot.setAttribute('id', 'root')
      document.body.appendChild(portalRoot)
    }

    const container = portalRoot
    renderWithReduxAndTheme(
      <HashRouter>
        <ObjectiveTracking
          targetValue={objective.targetValue}
          totalBalance={objective.totalBalance}
        />
      </HashRouter>,
      { container }
    )

    const menuElement = screen.getByText('5%')

    expect(menuElement).toHaveTextContent('5%')
  })
})
