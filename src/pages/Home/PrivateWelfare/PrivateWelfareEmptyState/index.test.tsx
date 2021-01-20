import React from 'react'

import { renderWithReduxAndTheme, screen, fireEvent } from 'testUtils'
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
      expect(screen.getByRole('button').textContent).toBe('Simular')
    })
    it('should redirect to previdencia.html', () => {
      // @ts-expect-error
      delete window.location
      window.location = {
        ...window.location,
        href: '/',
      }

      renderWithReduxAndTheme(<PrivateWalfareSection />)
      fireEvent.click(screen.getByRole('button', { name: /Simular/i }))
      expect(window.location.href).toBe(
        'https://cliente.portoseguro.com.br/react/previdencia.html#/'
      )
    })
  })
})
