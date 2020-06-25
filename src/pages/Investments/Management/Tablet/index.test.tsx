import React from 'react'
import { renderWithReduxAndTheme } from 'testUtils'
import '@testing-library/jest-dom'
import 'jest-styled-components'

import Tablet from '.'

describe('It renders correctly', () => {
  test('It render left content', () => {
    const { getByTestId } = renderWithReduxAndTheme(<Tablet />)
    expect(getByTestId('left-content')).toBeInTheDocument()
  })
  test('It render main content', () => {
    const { getByTestId } = renderWithReduxAndTheme(<Tablet />)
    expect(getByTestId('main-content')).toBeInTheDocument()
  })
})
