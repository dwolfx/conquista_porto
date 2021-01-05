import React from 'react'

import { renderWithReduxAndTheme, screen } from 'testUtils'
import userEvent from '@testing-library/user-event'

import ComparativeTabs from './index'

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
  renderWithReduxAndTheme(<ComparativeTabs travelPlans={travelPlans} />, {
    container: createRootContainer(),
  })

describe('ComparativeTabs component', () => {
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

    const firstTab = screen.getByText(/prata/i)
    const secondTab = screen.getByText(/terra/i)
    const thirdTab = screen.getByText(/ouro/i)

    expect(firstTab.getAttribute('aria-selected')).toBe('true')
    expect(secondTab.getAttribute('aria-selected')).toBe('false')
    expect(thirdTab.getAttribute('aria-selected')).toBe('false')
  })
  it('should be able to select second tab', () => {
    setup()

    const secondTab = screen.getByText(/terra/i)

    userEvent.click(secondTab)

    expect(screen.getByText(/prata/i).getAttribute('aria-selected')).toBe(
      'false'
    )
    expect(screen.getByText(/terra/i).getAttribute('aria-selected')).toBe(
      'true'
    )
    expect(screen.getByText(/ouro/i).getAttribute('aria-selected')).toBe(
      'false'
    )
  })
  it('should be able to select third tab', () => {
    setup()

    const thirdTab = screen.getByText(/ouro/i)

    userEvent.click(thirdTab)

    expect(screen.getByText(/prata/i).getAttribute('aria-selected')).toBe(
      'false'
    )
    expect(screen.getByText(/terra/i).getAttribute('aria-selected')).toBe(
      'false'
    )
    expect(screen.getByText(/ouro/i).getAttribute('aria-selected')).toBe('true')
  })
  it('should be able to render tab content', () => {
    setup()

    expect(
      screen.getByText(
        /despesas médicas, hospitalares e\/ou odontológicas - dmho/i
      )
    ).toBeTruthy()
    expect(screen.getByText(/R\$ 10\.000,00/i)).toBeDefined()
  })
  it('should not be able to render tabs component', () => {
    const plan = []

    renderWithReduxAndTheme(<ComparativeTabs travelPlans={plan} />)

    expect(screen.queryByText(/cobertura/i)).toBeNull()
  })
})
