import React from 'react'

import { renderWithReduxAndTheme, screen } from 'testUtils'

import ComparativeTable from './index'

import tripInsuranceQuotationMock from 'mocks/tripInsuranceQuotation.json'

import { IPlan } from 'store/modules/TripInsurance/InsuranceQuotation/types'

const travelPlans: IPlan[] = tripInsuranceQuotationMock.ViagemPacote.pacotes

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
    renderWithReduxAndTheme(<ComparativeTable travelPlans={travelPlans} />, {
      container: createRootContainer(),
    })

    expect(screen.getAllByText(/R\$ 10\.000,00/i)).toBeDefined()
    expect(screen.getAllByText(/não/i)).toBeDefined()
    expect(screen.getAllByText(/R\$ 1\.500,00/i)).toBeDefined()
    expect(screen.getAllByText(/R\$100,00\/dia limite 5 dias/i)).toBeDefined()
  })
  it('should not be able to render table', () => {
    const plan = []

    renderWithReduxAndTheme(<ComparativeTable travelPlans={plan} />)

    expect(screen.queryByText(/cobertura/i)).toBeNull()
  })
})
