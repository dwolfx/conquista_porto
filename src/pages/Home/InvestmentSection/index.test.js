import React from 'react'

import { renderWithReduxAndTheme } from 'testUtils'
import { storeFactory } from 'setupTests'
import { MemoryRouter } from 'react-router-dom'

import '@testing-library/jest-dom'
import InvestmentSection from '.'

jest.mock('../commons/LoadingState', () => ({
  __esModule: true,
  default: () => <div>loading</div>,
}))
jest.mock('../commons/ErrorState', () => ({
  __esModule: true,
  default: () => <div>erro</div>,
}))

const defaultStore = {
  suitabilityInfo: {
    data: {},
  },
  consolidatedPosition: {
    isLoading: false,
    hasError: false,
  },
}

const setup = (initialState = defaultStore) => {
  const store = storeFactory(initialState)

  let portalRoot = document.getElementById('root')
  if (!portalRoot) {
    portalRoot = document.createElement('div')
    portalRoot.setAttribute('id', 'root')
    document.body.appendChild(portalRoot)
  }

  const container = portalRoot
  return renderWithReduxAndTheme(
    <MemoryRouter>
      <InvestmentSection />
    </MemoryRouter>,
    { store, container }
  )
}

describe('Investment Section - Home', () => {
  describe('user does not have already invested/has no suitability', () => {
    test('if the giving text was displayed when it should be', () => {
      const { getByText } = setup()
      expect(
        getByText(
          'No Conquista, você pode criar a própria carteira ou receber sugestões para o seu perfil investidor. Conheça nossos produtos e comece a investir!'
        )
      ).toBeInTheDocument()
    })
    test('if the button has the correct text', () => {
      const { getByRole } = setup()
      expect(getByRole('button').textContent).toBe('investir')
    })
    test('Should render loading', () => {
      const store = {
        ...defaultStore,
        consolidatedPosition: {
          data: [],
          isLoading: true,
        },
      }
      const { getByText } = setup(store)
      expect(getByText('loading')).toBeDefined()
    })
    test('Should render error', () => {
      const store = {
        ...defaultStore,
        consolidatedPosition: {
          data: [],
          hasError: true,
        },
      }
      const { getByText } = setup(store)
      expect(getByText('erro')).toBeDefined()
    })
  })
})
