import React from 'react'
import { ThemeProvider } from 'styled-components'
import theme from 'styles/theme'

import { renderWithReduxAndTheme, fireEvent } from 'testUtils'

import { dict } from 'components/IconExporter'
import NewInput from '.'

describe('NewInput', () => {
  test('render with no props', () => {
    const { getByDisplayValue } = renderWithReduxAndTheme(
      <NewInput value="testing" onChange={() => {}} />
    )
    expect(getByDisplayValue('testing')).toBeDefined()
  })
  test('focus on input when clicked in the wrapper', () => {
    const { container, getByDisplayValue } = renderWithReduxAndTheme(
      <NewInput value="testing" onChange={() => {}} />
    )
    fireEvent.click(container.querySelectorAll('div')[2])
    expect(document.activeElement).toEqual(getByDisplayValue('testing'))
  })
  test('label appearing', () => {
    const label = 'label renderizada'
    const { queryByText, rerender, getByLabelText } = renderWithReduxAndTheme(
      <NewInput value="testing" onChange={() => {}} />
    )
    expect(queryByText(label)).toBeNull()
    rerender(
      <ThemeProvider theme={theme}>
        <NewInput label={label} value="testing" onChange={() => {}} />
      </ThemeProvider>
    )
    expect(queryByText(label)?.textContent).toBe(label)
  })
  test('suffix appearing', () => {
    const suffix = 'suffix renderizado'
    const { queryByText, rerender } = renderWithReduxAndTheme(
      <NewInput value="testing" onChange={() => {}} />
    )
    expect(queryByText(suffix)).toBeNull()
    rerender(
      <ThemeProvider theme={theme}>
        <NewInput suffix={suffix} value="testing" onChange={() => {}} />
      </ThemeProvider>
    )
    expect(queryByText(suffix)?.textContent).toBe(suffix)
  })
  test('prefix appearing', () => {
    const prefix = 'prefix renderizado'
    const { queryByText, rerender } = renderWithReduxAndTheme(
      <NewInput value="testing" onChange={() => {}} />
    )
    expect(queryByText(prefix)).toBeNull()
    rerender(
      <ThemeProvider theme={theme}>
        <NewInput prefix={prefix} value="testing" onChange={() => {}} />
      </ThemeProvider>
    )
    expect(queryByText(prefix)?.textContent).toBe(prefix)
  })
  test('error appearing', () => {
    const error: { icon: keyof typeof dict; message: string } = {
      icon: 'alertrounded',
      message: 'Ocorreu um erro.',
    }
    const { queryByText, rerender } = renderWithReduxAndTheme(
      <NewInput value="testing" onChange={() => {}} />
    )
    expect(queryByText(error.message)).toBeNull()
    rerender(
      <ThemeProvider theme={theme}>
        <NewInput error={error} value="testing" onChange={() => {}} />
      </ThemeProvider>
    )
    expect(queryByText(error.message)).toBeDefined()
  })
})
