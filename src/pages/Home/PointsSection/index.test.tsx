import React from 'react'

import { renderWithReduxAndTheme } from 'testUtils'
import { storeFactory } from 'setupTests'
import { MemoryRouter } from 'react-router-dom'

import PointsSection from '.'

const setup = (store?: any) => {
  let portalRoot = document.getElementById('root')
  if (!portalRoot) {
    portalRoot = document.createElement('div')
    portalRoot.setAttribute('id', 'root')
    document.body.appendChild(portalRoot)
  }

  const container = portalRoot
  return renderWithReduxAndTheme(
    <MemoryRouter>
      <PointsSection />
    </MemoryRouter>,
    { store, container }
  )
}

describe('Poinst Section - Home', () => {
  describe('when there is points for all gifts', () => {
    const store = storeFactory({
      points: {
        balanceData: { consultaPontosResponseType: { saldoAtual: 200000 } },
      },
    })
    test('available points gift card title should be "Você já pode trocar"', () => {
      const { getByText } = setup(store)
      expect(
        getByText((_, node) => {
          const hasText = (node: any) =>
            node.textContent === 'Você já pode trocar'
          const nodeHasText = hasText(node)
          const childrenDontHaveText = Array.from(node.children).every(
            child => !hasText(child)
          )

          return nodeHasText && childrenDontHaveText
        })
      ).toHaveTextContent('Você já pode trocar')
    })
    test('next points gift card title should be "Mais alguns pontos"', () => {
      const { getByText } = setup(store)
      expect(
        getByText((_, node) => {
          const hasText = (node: any) =>
            node.textContent === 'Mais alguns pontos'
          const nodeHasText = hasText(node)
          const childrenDontHaveText = Array.from(node.children).every(
            child => !hasText(child)
          )

          return nodeHasText && childrenDontHaveText
        })
      ).toHaveTextContent('Mais alguns pontos')
    })
  })

  describe('when there is points for some gifts (not all)', () => {
    const store = storeFactory({
      points: {
        balanceData: { consultaPontosResponseType: { saldoAtual: 2000 } },
      },
    })
    test('available points gift card title should be "Você já pode trocar"', () => {
      const { getByText } = setup(store)
      expect(
        getByText((_, node) => {
          const hasText = (node: any) =>
            node.textContent === 'Você já pode trocar'
          const nodeHasText = hasText(node)
          const childrenDontHaveText = Array.from(node.children).every(
            child => !hasText(child)
          )

          return nodeHasText && childrenDontHaveText
        })
      ).toHaveTextContent('Você já pode trocar')
    })
    test('next points gift card title should be "Acumule mais pontos"', () => {
      const { getByText } = setup(store)
      expect(
        getByText((_, node) => {
          const hasText = (node: any) =>
            node.textContent === 'Acumule mais pontos'
          const nodeHasText = hasText(node)
          const childrenDontHaveText = Array.from(node.children).every(
            child => !hasText(child)
          )

          return nodeHasText && childrenDontHaveText
        })
      ).toHaveTextContent('Acumule mais pontos')
    })
  })

  describe('when there is no points', () => {
    const store = storeFactory({
      points: {
        balanceData: { consultaPontosResponseType: { saldoAtual: 0 } },
      },
    })
    it('should render two cards with the same title = "Acumule mais pontos"', () => {
      const { queryAllByText } = setup(store)
      expect(queryAllByText('Acumule mais pontos')).toHaveLength(2)
    })
  })
})
