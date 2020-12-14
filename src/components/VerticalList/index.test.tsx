import React from 'react'

import { renderWithReduxAndTheme, screen } from 'testUtils'

import VerticalList from '.'

describe('VerticalList', () => {
  test('render one child', () => {
    renderWithReduxAndTheme(
      <VerticalList elements={[<span data-testid="first">first child</span>]} />
    )
    expect(screen.getByTestId('first').textContent).toBe('first child')
  })
  test('render two childs', () => {
    renderWithReduxAndTheme(
      <VerticalList
        elements={[
          <span data-testid="first">first child</span>,
          <span data-testid="second">second child</span>,
        ]}
      />
    )
    expect(screen.getByTestId('first').textContent).toBe('first child')
    expect(screen.getByTestId('second').textContent).toBe('second child')
  })
})
