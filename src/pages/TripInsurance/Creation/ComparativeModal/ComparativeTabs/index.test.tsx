import React from 'react'

import { renderWithReduxAndTheme, screen } from 'testUtils'
import userEvent from '@testing-library/user-event'

import ComparativeTabs from './index'

import * as t from '../types'

const travelCoverage: t.ITravelCoverage[] = [
  {
    descricao: 'Despesas Médicas, Hospitalares e/ou Odontológicas - DMHO',
    valor: 'R$ 1.000.000.000,00',
  },
  {
    descricao: 'Cancelamento de Viagem',
    valor: 'Não',
  },
  {
    descricao: 'Extravio de bagagem',
    valor: 'R$ 1.500,00',
  },
  {
    descricao: 'Hospedagem após Alta Hospitalar',
    valor: 'R$ 100,00/Dia - Limite 5 Dias',
  },
]

const travelPlans: t.ITravelPlans[] = [
  {
    nomePlano: 'Brasil Terra',
    viagemCobertura: travelCoverage,
  },
  {
    nomePlano: 'Brasil Prata',
    viagemCobertura: travelCoverage,
  },
  {
    nomePlano: 'Brasil Ouro',
    viagemCobertura: travelCoverage,
  },
]

const createRootContainer = () => {
  let container = document.getElementById('root')
  if (!container) {
    container = document.createElement('div')
    container.setAttribute('id', 'root')
    document.body.appendChild(container)
  }
  return container
}

const setup = () =>
  renderWithReduxAndTheme(<ComparativeTabs travelPlans={travelPlans} />, {
    container: createRootContainer(),
  })

describe('EditingCardData component', () => {
  it('should exists', () => {
    expect(ComparativeTabs).toBeDefined()
  })
  it('should render tabs', () => {
    setup()

    expect(screen.getByText(/terra/i)).toBeDefined()
    expect(screen.getByText(/prata/i)).toBeDefined()
    expect(screen.getByText(/ouro/i)).toBeDefined()
  })
  it('should render first tab selected', () => {
    setup()

    const firstTab = screen.getByText(/terra/i)
    const secondTab = screen.getByText(/prata/i)
    const thirdTab = screen.getByText(/ouro/i)

    expect(firstTab.getAttribute('aria-selected')).toBe('true')
    expect(secondTab.getAttribute('aria-selected')).toBe('false')
    expect(thirdTab.getAttribute('aria-selected')).toBe('false')
  })
  it('should be able to select second tab', () => {
    setup()

    const firstTab = screen.getByText(/terra/i)
    const secondTab = screen.getByText(/prata/i)
    const thirdTab = screen.getByText(/ouro/i)

    userEvent.click(secondTab)

    expect(firstTab.getAttribute('aria-selected')).toBe('false')
    expect(secondTab.getAttribute('aria-selected')).toBe('true')
    expect(thirdTab.getAttribute('aria-selected')).toBe('false')
  })
  it('should be able to select third tab', () => {
    setup()

    const firstTab = screen.getByText(/terra/i)
    const secondTab = screen.getByText(/prata/i)
    const thirdTab = screen.getByText(/ouro/i)

    userEvent.click(thirdTab)

    expect(firstTab.getAttribute('aria-selected')).toBe('false')
    expect(secondTab.getAttribute('aria-selected')).toBe('false')
    expect(thirdTab.getAttribute('aria-selected')).toBe('true')
  })
  it('should be able to render tab content', () => {
    setup()

    expect(
      screen.getByText(
        /despesas médicas, hospitalares e\/ou odontológicas - dmho/i
      )
    ).toBeTruthy()
    expect(screen.getByText(/R\$ 1\.000\.000\.000,00/i)).toBeDefined()
  })
  it('should not be able to render tabs component', () => {
    const plan = []

    renderWithReduxAndTheme(<ComparativeTabs travelPlans={plan} />)

    expect(screen.queryByText(/cobertura/i)).toBeNull()
  })
})
