import React from 'react'
import { render, RenderResult, fireEvent } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import theme from 'styles/theme'
import '@testing-library/jest-dom'
import 'jest-styled-components'

import FormFinancialContribution from '.'
import { Provider } from 'react-redux'
import { storeFactory } from 'setupTests'

const store = storeFactory()

const setup = (children: React.ReactElement) => {
  return render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </Provider>
  )
}

describe('FormFinancialContribution', () => {
  describe('rendering with no errors', () => {
    let formData = {
      isAwareOfTerms: true,
      moneyToInvest: '5.000,00',
      whenToInvest: '20/10/2030',
    }

    const formDataCopy = { ...formData }

    const mockOnChangeFormData = jest.fn(newState => {
      formData = { ...formData, ...newState }
    })
    const mockOnFormHasChanged = jest.fn()
    const mockNextStep = jest.fn()

    test('render form with future date', () => {
      const { getByDisplayValue, rerender } = render(
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <FormFinancialContribution
              onChangeFormData={mockOnChangeFormData}
              onFormHasChanged={mockOnFormHasChanged}
              nextStep={mockNextStep}
              formData={formData}
              formDataCopy={formDataCopy}
            />
          </ThemeProvider>
        </Provider>
      )
      expect(getByDisplayValue('20/10/2030')).toBeDefined()
      fireEvent.change(getByDisplayValue('20/10/2030'), {
        target: { value: '11/11/2028' },
      })
      rerender(
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <FormFinancialContribution
              onChangeFormData={mockOnChangeFormData}
              onFormHasChanged={mockOnFormHasChanged}
              nextStep={mockNextStep}
              formData={formData}
              formDataCopy={formDataCopy}
            />
          </ThemeProvider>
        </Provider>
      )
      expect(getByDisplayValue('11/11/2028')).toBeDefined()
    })

    test('render form with valid value', () => {
      const { getByDisplayValue, rerender } = render(
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <FormFinancialContribution
              onChangeFormData={mockOnChangeFormData}
              onFormHasChanged={mockOnFormHasChanged}
              nextStep={mockNextStep}
              formData={formData}
              formDataCopy={formDataCopy}
            />
          </ThemeProvider>
        </Provider>
      )

      const input = getByDisplayValue('5.000,00')
      expect(input).toBeDefined()
      fireEvent.change(input, {
        target: { value: '10.000,00' },
      })
      rerender(
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <FormFinancialContribution
              onChangeFormData={mockOnChangeFormData}
              onFormHasChanged={mockOnFormHasChanged}
              nextStep={mockNextStep}
              formData={formData}
              formDataCopy={formDataCopy}
            />
          </ThemeProvider>
        </Provider>
      )
      expect(getByDisplayValue('10.000,00')).toBeDefined()
    })
  })
})
