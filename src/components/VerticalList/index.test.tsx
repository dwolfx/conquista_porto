import React from 'react'
import { render } from '@testing-library/react'

import VerticalList from '.'

describe('VerticalList', () => {
  test('render one child', () => {
    const { getByTestId } = render(
      <VerticalList elements={[<span data-testid="first">first child</span>]} />
    )
    expect(getByTestId('first').textContent).toBe('first child')
  })
  test('render two childs', () => {
    const { getByTestId } = render(
      <VerticalList
        elements={[
          <span data-testid="first">first child</span>,
          <span data-testid="second">second child</span>,
        ]}
      />
    )
    expect(getByTestId('first').textContent).toBe('first child')
    expect(getByTestId('second').textContent).toBe('second child')
  })
})
