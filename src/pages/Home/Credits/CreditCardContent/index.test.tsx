import React from 'react'

import { renderWithReduxAndTheme, screen } from 'testUtils'
import { MemoryRouter, RouteProps, Route } from 'react-router-dom'
import userEvent from '@testing-library/user-event'

import CreditCardContent from '.'

let locationLocal: RouteProps['location']

const setup = () => {
  return renderWithReduxAndTheme(
    <MemoryRouter>
      <CreditCardContent
        flag="cardflagmaster"
        title="Cartão de Crédito"
        path="/cartao-credito/visualizar"
        valor="R$ 10.000,00"
      />
      <Route
        path="*"
        render={({ location }) => {
          locationLocal = location
          return null
        }}
      />
    </MemoryRouter>
  )
}

describe('CreditCardContent component', () => {
  it('should exists', () => {
    expect(CreditCardContent).toBeDefined()
  })
  it('should render MasterCard Flag', () => {
    setup()
    expect(screen.getByText(/card-flag-master/i)).toBeDefined()
  })
  it('should render valor', () => {
    setup()
    expect(screen.getByText(/R\$ 10\.000\,00/i)).toBeDefined()
  })
  it('should render creditcard icon', () => {
    renderWithReduxAndTheme(
      <MemoryRouter>
        <CreditCardContent
          title="Cartão de Crédito"
          path="/cartao-credito/visualizar"
          valor="R$ 10.000,00"
        />
        <Route
          path="*"
          render={({ location }) => {
            locationLocal = location
            return null
          }}
        />
      </MemoryRouter>
    )

    expect(screen.getByText(/credit-card/i)).toBeDefined()
  })
  it(`'should trigger 'GERENCIAR' button`, () => {
    setup()

    const button = screen.getByRole('button', {
      name: /gerenciar/i,
    })
    userEvent.click(button)

    expect(locationLocal!.pathname).toBe('/cartao-credito/visualizar')
  })
})
