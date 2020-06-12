import React from 'react'
import { render } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import theme from 'styles/theme'
import '@testing-library/jest-dom'
import 'jest-styled-components'

import { dict } from 'components/IconExporter'
import NewInput from '.'

const setup = (children: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{children}</ThemeProvider>)
}

describe('NewInput', () => {
  test('render with no props', () => {
    const { getByDisplayValue } = setup(
      <NewInput value="testing" onChange={() => {}} />
    )
    expect(getByDisplayValue('testing')).toBeDefined()
  })
  test('focus on input when clicked in the wrapper', () => {
    const { getByTestId } = setup(
      <NewInput value="testing" onChange={() => {}} />
    )
    getByTestId('new-input-addon').click()
    expect(document.activeElement).toEqual(getByTestId('new-input-input'))
  })
  test('label appearing', () => {
    const label = 'label renderizada'
    const { queryByText, rerender, getByTestId } = render(
      <ThemeProvider theme={theme}>
        <NewInput value="testing" onChange={() => {}} />
      </ThemeProvider>
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
    const { queryByText, rerender } = render(
      <ThemeProvider theme={theme}>
        <NewInput value="testing" onChange={() => {}} />
      </ThemeProvider>
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
    const { queryByText, rerender } = render(
      <ThemeProvider theme={theme}>
        <NewInput value="testing" onChange={() => {}} />
      </ThemeProvider>
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
    const { queryByText, rerender } = render(
      <ThemeProvider theme={theme}>
        <NewInput value="testing" onChange={() => {}} />
      </ThemeProvider>
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
