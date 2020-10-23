import React from 'react'
import {
  renderWithReduxAndTheme,
  createRootContainer,
  screen,
  fireEvent,
} from 'testUtils'

import ProductBanner from './index'

describe('Recommendation ProductBanner component', () => {
  it('should render null when all additionals are false', () => {
    const additionalMock = {
      travel_security: false,
      life_security: false,
      credit_card: false,
    }

    renderWithReduxAndTheme(<ProductBanner additional={additionalMock} />, {
      container: createRootContainer(),
    })

    expect(screen.queryByText('Seguro Viagem')).toBeNull()
    expect(screen.queryByText('Seguro de Vida')).toBeNull()
    expect(screen.queryByText('Cartão de Crédito')).toBeNull()
  })

  it('should render Credit Card Banner', () => {
    const additionalMock = {
      travel_security: false,
      life_security: false,
      credit_card: true,
    }

    renderWithReduxAndTheme(<ProductBanner additional={additionalMock} />, {
      container: createRootContainer(),
    })

    expect(screen.queryByText('Seguro Viagem')).toBeNull()
    expect(screen.queryByText('Seguro de Vida')).toBeNull()
    expect(screen.queryByText('Cartão de Crédito')).toBeDefined()
    expect(
      screen.queryByText(
        'Tudo o que um cartão tem, mais as vantagens Porto Seguro para sua casa, carro e compras.'
      )
    ).toBeDefined()
  })

  it('should show modal when "Saiba mais" button is clicked', () => {
    const additionalMock = {
      travel_security: false,
      life_security: false,
      credit_card: true,
    }

    renderWithReduxAndTheme(<ProductBanner additional={additionalMock} />, {
      container: createRootContainer(),
    })

    expect(screen.queryByText('Seguro Viagem')).toBeNull()
    expect(screen.queryByText('Seguro de Vida')).toBeNull()
    expect(screen.queryByText('Cartão de Crédito')).toBeDefined()
    expect(
      screen.queryByText(
        'Tudo o que um cartão tem, mais as vantagens Porto Seguro para sua casa, carro e compras.'
      )
    ).toBeDefined()
    expect(screen.queryByText('Cartão de Crédito Porto Seguro')).toBeNull()
    fireEvent.click(screen.getByRole('button', { name: 'Saiba mais' }))
    expect(screen.queryByText('Cartão de Crédito Porto Seguro')).toBeDefined()
    fireEvent.click(screen.getByText(/close.svg/g))
    expect(screen.queryByText('Cartão de Crédito Porto Seguro')).toBeNull()
  })
})
