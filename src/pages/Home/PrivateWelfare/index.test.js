import React from 'react'

import { renderWithReduxAndTheme } from 'testUtils'
import { storeFactory } from 'setupTests'
import { MemoryRouter } from 'react-router-dom'

import '@testing-library/jest-dom'
import PrivateWalfareSection from '.'

const setup = store => {
  let portalRoot = document.getElementById('root')
  if (!portalRoot) {
    portalRoot = document.createElement('div')
    portalRoot.setAttribute('id', 'root')
    document.body.appendChild(portalRoot)
  }

  const container = portalRoot
  return renderWithReduxAndTheme(
    <MemoryRouter>
      <PrivateWalfareSection />
    </MemoryRouter>,
    { store, container }
  )
}

const store = storeFactory({})

describe('Private Welfare Section - Home', () => {
  describe('User has no private pension', () => {
    test('if the giving text was displayed when it should be', () => {
      const { getByText } = setup(store)
      expect(getByText('PGBL ou VGBL')).toBeInTheDocument()
    })
    test('if the button has the correct text', () => {
      const { getByRole } = setup(store)
      expect(getByRole('button').textContent).toBe('conhecer')
    })
  })
})
