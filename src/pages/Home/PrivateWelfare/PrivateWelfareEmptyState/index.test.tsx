import React from 'react'

import { renderWithReduxAndTheme, screen } from 'testUtils'
import { MemoryRouter } from 'react-router-dom'
import { storeFactory } from 'setupTests'

import PrivateWalfareSection from '.'

const store = storeFactory({})

describe('Private Welfare Section - Home', () => {
  describe('User has no private pension', () => {
    test('if the giving text was displayed when it should be', () => {
      renderWithReduxAndTheme(
        <MemoryRouter>
          <PrivateWalfareSection />
        </MemoryRouter>,
        { store }
      )
      expect(screen.getByText('PGBL ou VGBL')).toBeInTheDocument()
    })
    test('if the button has the correct text', () => {
      renderWithReduxAndTheme(
        <MemoryRouter>
          <PrivateWalfareSection />
        </MemoryRouter>,
        { store }
      )
      expect(screen.getByRole('button').textContent).toBe('Em Breve')
    })
    // Descomentar após integração com a Previdência Privada
    // it('should redirect to more info', () => {
    //   let locationLocal: RouteProps['location']
    //   renderWithReduxAndTheme(
    //     <MemoryRouter initialEntries={['/']}>
    //       <PrivateWalfareSection />
    //       <Route
    //         path="*"
    //         render={({ location }) => {
    //           locationLocal = location
    //           return null
    //         }}
    //       />
    //     </MemoryRouter>,
    //   )
    //   fireEvent.click(screen.getByRole('button', { name: /Em Breve/i }))
    //   expect(locationLocal!.pathname).toBe('/previdencia-privada')
    // })
  })
})
