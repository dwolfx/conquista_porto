import React from 'react'
import { render } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import theme from 'styles/theme'
import '@testing-library/jest-dom'
import 'jest-styled-components'

import HorizontalList from '.'

const setup = (children: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{children}</ThemeProvider>)
}

describe('HorizontalList', () => {
  describe('different sizes', () => {
    test('small size', () => {
      const { getByTestId } = setup(
        <HorizontalList data-testid="horizontal-list" size="small" />
      )
      expect(getByTestId('horizontal-list')).toHaveStyleRule('height', '28px')
    })
    test('medium size', () => {
      const { getByTestId } = setup(
        <HorizontalList data-testid="horizontal-list" size="medium" />
      )
      expect(getByTestId('horizontal-list')).toHaveStyleRule('height', '35px')
    })
    test('large size', () => {
      const { getByTestId } = setup(
        <HorizontalList data-testid="horizontal-list" size="large" />
      )
      expect(getByTestId('horizontal-list')).toHaveStyleRule('height', '63px')
    })
    test('default size', () => {
      const { getByTestId } = setup(
        <HorizontalList data-testid="horizontal-list" />
      )
      expect(getByTestId('horizontal-list')).toHaveStyleRule('height', '49px')
    })
  })
  describe('noPadding props', () => {
    test('noPadding with "true" value', () => {
      const { getByTestId } = setup(
        <HorizontalList data-testid="horizontal-list" noPadding />
      )
      expect(getByTestId('horizontal-list')).toHaveStyleRule('padding', '0')
    })
    test('noPadding with "default | false | null | undefined" value', () => {
      const { getByTestId } = setup(
        <HorizontalList data-testid="horizontal-list" />
      )
      expect(getByTestId('horizontal-list')).toHaveStyleRule(
        'padding',
        '0 14px'
      )
    })
  })
  describe('items at start', () => {
    test('render one child', () => {
      const { getByTestId } = setup(
        <HorizontalList
          startItems={[<span data-testid="first-start-item">first child</span>]}
        />
      )
      expect(getByTestId('first-start-item').textContent).toBe('first child')
    })
    test('render two child', () => {
      const { container, getByTestId } = setup(
        <HorizontalList
          startItems={[
            <span data-testid="first-start-item">first child</span>,
            <span data-testid="second-start-item">second child</span>,
          ]}
        />
      )
      expect(getByTestId('second-start-item').textContent).toBe('second child')
    })
  })
  describe('items at end', () => {
    test('render one child', () => {
      const { getByTestId } = setup(
        <HorizontalList
          endItems={[<span data-testid="first-end-item">first child</span>]}
        />
      )
      expect(getByTestId('first-end-item').textContent).toBe('first child')
    })
    test('render two childs', () => {
      const { getByTestId } = setup(
        <HorizontalList
          endItems={[
            <span data-testid="first-end-item">first child</span>,
            <span data-testid="second-end-item">second child</span>,
          ]}
        />
      )
      expect(getByTestId('second-end-item').textContent).toBe('second child')
    })
  })
})
