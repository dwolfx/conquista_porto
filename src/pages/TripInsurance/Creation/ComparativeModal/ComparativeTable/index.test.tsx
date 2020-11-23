import React from 'react'

import { renderWithReduxAndTheme, screen } from 'testUtils'

import ComparativeTable from './index'

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
  renderWithReduxAndTheme(<ComparativeTable travelPlans={travelPlans} />, {
    container: createRootContainer(),
  })

describe('EditingCardData component', () => {
  it('should exists', () => {
    expect(ComparativeTable).toBeDefined()
  })
  it('should render table header', () => {
    setup()

    expect(screen.getByText(/cobertura/i)).toBeDefined()
    expect(screen.getByText(/brasil terra/i)).toBeDefined()
    expect(screen.getByText(/brasil prata/i)).toBeDefined()
    expect(screen.getByText(/brasil ouro/i)).toBeDefined()
  })
  it('should render first column items', () => {
    setup()

    expect(
      screen.getByText(
        /despesas médicas, hospitalares e\/ou odontológicas - dmho/i
      )
    ).toBeDefined()
    expect(screen.getByText(/cancelamento de viagem/i)).toBeDefined()
    expect(screen.getByText(/extravio de bagagem/i)).toBeDefined()
    expect(screen.getByText(/Hospedagem após alta hospitalar/i)).toBeDefined()
  })
  it('should render second column items', () => {
    const plan = [
      {
        nomePlano: 'Brasil Terra',
        viagemCobertura: travelCoverage,
      },
    ]

    renderWithReduxAndTheme(<ComparativeTable travelPlans={plan} />, {
      container: createRootContainer(),
    })

    expect(screen.getByText(/R\$ 1\.000\.000\.000,00/i)).toBeDefined()
    expect(screen.getByText(/não/i)).toBeDefined()
    expect(screen.getByText(/R\$ 1\.500,00/i)).toBeDefined()
    expect(screen.getByText(/R\$ 100,00\/dia - limite 5 dias/i)).toBeDefined()
  })
  it('should not be able to render table', () => {
    const plan = []

    renderWithReduxAndTheme(<ComparativeTable travelPlans={plan} />)

    expect(screen.queryByText(/cobertura/i)).toBeNull()
  })
})
