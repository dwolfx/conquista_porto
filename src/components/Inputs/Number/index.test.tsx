import React from 'react'

import 'jest-styled-components'
import { ThemeProvider } from 'styled-components'
import { render } from 'testUtils'
import theme from 'styles/theme'

import InputNumber from '.'
import { fireEvent } from '@testing-library/dom'

describe('InputNumber component', () => {
  it('should exists', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <InputNumber testId="default"/>
      </ThemeProvider>
    )
    expect(getByTestId('input-number-default')).toBeVisible()
  })

  it('should render a label', () => {
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <InputNumber testId="default" label="Teste"/>
      </ThemeProvider>
    )
    expect(getByText('Teste')).toBeVisible()
  })

  describe('Buttons should', () => {
    it('handle the add action', () => {
      const { getByTestId } = render(
        <ThemeProvider theme={theme}>
          <InputNumber testId="default" />
        </ThemeProvider>
      )
      const button = getByTestId('default-add-button')
      fireEvent.click(button)
      expect(getByTestId('input-number-default')).toHaveValue(1)
    })

    it('handle the subtract action', () => {
      const { getByTestId } = render(
        <ThemeProvider theme={theme}>
          <InputNumber testId="default" initialValue={1}/>
        </ThemeProvider>
      )
      let button = getByTestId('default-subtract-button')
      fireEvent.click(button)

      expect(getByTestId('input-number-default')).toHaveValue(0)
    })

    it('be disabled when maxValue is reached', () => {
      const { getByTestId } = render(
        <ThemeProvider theme={theme}>
          <InputNumber testId="default" initialValue={98} />
        </ThemeProvider>
      )
      let button = getByTestId('default-add-button')
      fireEvent.click(button)

      expect(button).toBeDisabled()
    })

    it('be disabled when minValue is reached', () => {
      const { getByTestId } = render(
        <ThemeProvider theme={theme}>
          <InputNumber testId="default" initialValue={1} />
        </ThemeProvider>
      )
      let button = getByTestId('default-subtract-button')
      fireEvent.click(button)

      expect(button).toBeDisabled()
    })
  })

  describe('Input should', () => {
    it('handle onChange event', () => {
      const { getByTestId } = render(
        <ThemeProvider theme={theme}>
          <InputNumber testId="default" />
        </ThemeProvider>
      )
      const input = getByTestId('input-number-default')
      fireEvent.change(input, { target: { value: '1' } })
      expect(input).toHaveValue(1)
    })

    it('handle NaN event', () => {
      const { getByTestId } = render(
        <ThemeProvider theme={theme}>
          <InputNumber testId="default" />
        </ThemeProvider>
      )
      const input = getByTestId('input-number-default')
      fireEvent.change(input, { target: { value: 'teste' } })
      expect(input).toHaveValue(0)
    })

    it('handle maxNumber', () => {
      const { getByTestId } = render(
        <ThemeProvider theme={theme}>
          <InputNumber testId="default" />
        </ThemeProvider>
      )
      const input = getByTestId('input-number-default')
      fireEvent.change(input, { target: { value: '100' } })
      expect(input).toHaveValue(99)
    })

    it('handle minNumber', () => {
      const { getByTestId } = render(
        <ThemeProvider theme={theme}>
          <InputNumber testId="default" />
        </ThemeProvider>
      )
      const input = getByTestId('input-number-default')
      fireEvent.change(input, { target: { value: '-1' } })
      expect(input).toHaveValue(0)
    })

    it('be disabled when needed', () => {
      const { getByTestId } = render(
        <ThemeProvider theme={theme}>
          <InputNumber testId="default" disabledCase={true}/>
        </ThemeProvider>
      )
      expect(getByTestId('input-number-default')).toBeDisabled()
    })
  })
})
