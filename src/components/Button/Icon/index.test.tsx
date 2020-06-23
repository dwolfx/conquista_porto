import React from 'react'

import 'jest-styled-components'
import { renderWithReduxAndTheme } from 'testUtils'
import { ThemeProvider } from 'styled-components'
import theme from 'styles/theme'
import IconButton from '.'

describe('IconButton', () => {
  test('rendering the chosen icon', () => {
    const { getByText } = renderWithReduxAndTheme(<IconButton icon="lock" />)
    expect(getByText('lock.svg')).not.toBeNull()
  })
  describe('styling props', () => {
    describe('size props', () => {
      test('if width and height are 28px when size is small (default)', () => {
        const { getByTestId } = renderWithReduxAndTheme(
          <IconButton data-testid="icon-button" icon="lock" />
        )
        expect(getByTestId('icon-button')).toHaveStyleRule('height', '28px')
        expect(getByTestId('icon-button')).toHaveStyleRule('width', '28px')
      })
      test('if width and height are 28px when size is medium', () => {
        const { getByTestId } = renderWithReduxAndTheme(
          <IconButton data-testid="icon-button" icon="lock" size="medium" />
        )
        expect(getByTestId('icon-button')).toHaveStyleRule('height', '35px')
        expect(getByTestId('icon-button')).toHaveStyleRule('width', '35px')
      })
      test('if width and height are 28px when size is large', () => {
        const { getByTestId } = renderWithReduxAndTheme(
          <IconButton data-testid="icon-button" icon="lock" size="large" />
        )
        expect(getByTestId('icon-button')).toHaveStyleRule('height', '49px')
        expect(getByTestId('icon-button')).toHaveStyleRule('width', '49px')
      })
    })
    describe('color prop', () => {
      test('if background gets #EBEBEB', () => {
        const { getByTestId } = renderWithReduxAndTheme(
          <IconButton data-testid="icon-button" icon="lock" />
        )
        expect(getByTestId('icon-button')).toHaveStyleRule(
          'background',
          '#EBEBEB'
        )
      })
      test('if background gets linear-gradient(90deg,#00ADEF 0%,#018CB7 146.43%) when color is PRIMARY', () => {
        const { getByTestId } = renderWithReduxAndTheme(
          <IconButton data-testid="icon-button" icon="lock" color="primary" />
        )
        expect(getByTestId('icon-button')).toHaveStyleRule(
          'background',
          'linear-gradient(90deg,#00ADEF 0%,#018CB7 146.43%)'
        )
      })
      test('if background gets linear-gradient(90deg,#57B063 0%,#898989 146.43%) when color is SECONDARY', () => {
        const { getByTestId } = renderWithReduxAndTheme(
          <IconButton data-testid="icon-button" icon="lock" color="secondary" />
        )
        expect(getByTestId('icon-button')).toHaveStyleRule(
          'background',
          'linear-gradient(90deg,#57B063 0%,#2F736B 201.79%)'
        )
      })
      test('if background gets unset when color is TRANSPARENT', () => {
        const { getByTestId } = renderWithReduxAndTheme(
          <IconButton
            data-testid="icon-button"
            icon="lock"
            color="transparent"
          />
        )
        expect(getByTestId('icon-button')).toHaveStyleRule(
          'background',
          'unset'
        )
      })
    })
  })
  describe('loading', () => {
    test('if spinner svg is displayed when flag if true', () => {
      const { getByText, rerender } = renderWithReduxAndTheme(
        <IconButton data-testid="icon-button" icon="lock" isLoading />
      )
      rerender(
        <ThemeProvider theme={theme}>
          <IconButton data-testid="icon-button" icon="lock" />
        </ThemeProvider>
      )
      expect(getByText('lock.svg')).toBeDefined()
    })
  })
})
