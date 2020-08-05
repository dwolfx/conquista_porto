import React from 'react'

import 'jest-styled-components'
import { ThemeProvider } from 'styled-components'
import theme from 'styles/theme'
import { renderWithReduxAndTheme, render } from 'testUtils'
import Button from '.'

describe('Button', () => {
  test('render a child', () => {
    const { getByText } = renderWithReduxAndTheme(<Button>clica aqui</Button>)
    expect(getByText('clica aqui').textContent).toBe('clica aqui')
  })
  test('rendering loading', () => {
    const { rerender, queryByText, getByRole } = render(
      <ThemeProvider theme={theme}>
        <Button>clica aqui</Button>
      </ThemeProvider>
    )
    expect(queryByText(/clica aqui/gi)).not.toBeNull()
    expect(queryByText(/spinner/gi)).toBeNull()
    rerender(
      <ThemeProvider theme={theme}>
        <Button loading>clica aqui</Button>
      </ThemeProvider>
    )
    expect(queryByText(/clica aqui/gi)).toBeNull()
    expect(queryByText(/spinner/gi)).not.toBeNull()
    expect(getByRole('button')).toHaveStyleRule('background', '#EBEBEB')
  })
  describe('Disable state', () => {
    describe('background color', () => {
      test('style with primary prop', () => {
        const { getByRole } = renderWithReduxAndTheme(
          <Button disabled>clica aqui</Button>
        )
        expect(getByRole('button')).toHaveStyleRule('background', '#EBEBEB')
      })
      test('style with secondary prop', () => {
        const { getByRole } = renderWithReduxAndTheme(
          <Button color="secondary" disabled>
            clica aqui
          </Button>
        )
        expect(getByRole('button')).toHaveStyleRule('background', '#EBEBEB')
      })
      test('style with isOutline and disabled prop', () => {
        const { getByRole } = renderWithReduxAndTheme(
          <Button outline disabled>
            clica aqui
          </Button>
        )
        expect(getByRole('button')).toHaveStyleRule('background', '#F1F1F1')
      })
    })
    describe('border color', () => {
      test('style with primary prop', () => {
        const { getByRole } = renderWithReduxAndTheme(
          <Button disabled>clica aqui</Button>
        )
        expect(getByRole('button')).toHaveStyleRule('border', 'none')
      })
      test('style with secondary prop', () => {
        const { getByRole } = renderWithReduxAndTheme(
          <Button disabled>clica aqui</Button>
        )
        expect(getByRole('button')).toHaveStyleRule('border', 'none')
      })
      test('style with disabled prop', () => {
        const { getByRole } = renderWithReduxAndTheme(
          <Button disabled outline>
            clica aqui
          </Button>
        )
        expect(getByRole('button')).toHaveStyleRule(
          'border',
          '1px solid #DDDDDD'
        )
      })
    })
    describe('color', () => {
      test('style with disabled and outlined (primary)', () => {
        const { getByRole } = renderWithReduxAndTheme(
          <Button outline disabled>
            clica aqui
          </Button>
        )
        expect(getByRole('button')).toHaveStyleRule('color', '#DDDDDD')
      })
      test('style with disabled and outlined (secondary)', () => {
        const { getByRole } = renderWithReduxAndTheme(
          <Button color="secondary" outline disabled>
            clica aqui
          </Button>
        )
        expect(getByRole('button')).toHaveStyleRule('color', '#DDDDDD')
      })
    })
  })
  describe('Enable state', () => {
    describe('background color', () => {
      test('style with primary prop', () => {
        const { getByRole } = renderWithReduxAndTheme(
          <Button>clica aqui</Button>
        )
        expect(getByRole('button')).toHaveStyleRule(
          'background',
          'linear-gradient( to left, #018CB7 20%, #00ADEF )'
        )
      })
      test('style with secondary prop', () => {
        const { getByRole } = renderWithReduxAndTheme(
          <Button color="secondary">clica aqui</Button>
        )
        expect(getByRole('button')).toHaveStyleRule(
          'background',
          'linear-gradient( to left, #2F736B -35%, #46A166 )'
        )
      })
    })
    describe('border color', () => {
      test('style with primary prop and outline', () => {
        const { getByRole } = renderWithReduxAndTheme(
          <Button outline>clica aqui</Button>
        )
        expect(getByRole('button')).toHaveStyleRule(
          'border',
          '1px solid #00ADEF'
        )
      })
      test('style with secondary prop and outline', () => {
        const { getByRole } = renderWithReduxAndTheme(
          <Button color="secondary" outline>
            clica aqui
          </Button>
        )
        expect(getByRole('button')).toHaveStyleRule(
          'border',
          '1px solid #46A166'
        )
      })
    })
  })
})
