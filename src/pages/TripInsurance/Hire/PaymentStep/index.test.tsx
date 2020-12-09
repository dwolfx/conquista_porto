import React from 'react'

import 'jest-styled-components'
import { ThemeProvider } from 'styled-components'
import { render } from 'testUtils'
import theme from 'styles/theme'

import PaymentStep from '.'
import { fireEvent } from '@testing-library/dom'

describe('PaymentStep component', () => {
  it('should exists', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <PaymentStep  />
      </ThemeProvider>
    )
    expect(getByTestId('payment-step')).toBeVisible()
  })

  it('should change the option when radio is clicked', () => {
    const { getByTestId, getAllByRole } = render(
      <ThemeProvider theme={theme}>
        <PaymentStep  />
      </ThemeProvider>
    )
    const radioPorto = getByTestId('input-radio-cartao-porto')
    const radioOutro = getByTestId('input-radio-cartao-outro')

    fireEvent.click(radioOutro)
    expect(getAllByRole('img', { name: 'creditcard' })[1].getAttribute('fill')).toEqual('#00ADEF')
    fireEvent.click(radioPorto)
    expect(getAllByRole('img', { name: 'creditcard' })[0].getAttribute('fill')).toEqual('#00ADEF')

  })

  it('should show the rest of form when radio is clicked', () => {
    const { getByTestId, getByText } = render(
      <ThemeProvider theme={theme}>
        <PaymentStep  />
      </ThemeProvider>
    )
    const radioOutro = getByTestId('input-radio-cartao-outro')

    fireEvent.click(radioOutro)
    expect(getByText('Assim como está impresso no cartão')).toBeVisible()
  })

  it('Should open select when select is clicked', () => {
    const { getByTestId, getByRole } = render(
      <ThemeProvider theme={theme}>
        <PaymentStep  />
      </ThemeProvider>
    )
    const select = getByTestId('select-option-input-parcelas')

    fireEvent.click(select)
    expect(getByRole('img',{ name: 'arrowup' })).toBeVisible()
  })

  it('button should be disabled until all is done', () => {
    const { getByTestId, getByRole, debug } = render(
      <ThemeProvider theme={theme}>
        <PaymentStep  />
      </ThemeProvider>
    )
    expect(getByRole('button',{ name: 'Continuar' })).toBeDisabled()

    const radioOutro = getByTestId('input-radio-cartao-outro')

    fireEvent.click(radioOutro)

    const select = getByTestId('select-option-input-parcelas')

    fireEvent.click(select)
    fireEvent.click(getByTestId('option-12x de R$310,00'))

    fireEvent.change(getByTestId('número do cartão'), { target: { value: '8888' } })
    fireEvent.change(getByTestId('nome completo'), { target: { value: '8888' } })
    fireEvent.change(getByTestId('validade'), { target: { value: '8888' } })
    fireEvent.change(getByTestId('cvc'), { target: { value: '8888' } })

    expect(getByRole('button',{ name: 'Continuar' })).not.toBeDisabled()
  })
})
