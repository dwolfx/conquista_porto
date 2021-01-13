import React from 'react'

import 'jest-styled-components'
import { renderWithReduxAndTheme, screen } from 'testUtils'
import { storeFactory } from 'setupTests'
import userEvent from '@testing-library/user-event'

import tripInsuranceQuotationMock from 'mocks/tripInsuranceQuotation.json'
import tripInsuranceCreditCardMock from 'mocks/tripInsuranceCreditCard.json'
import PaymentStep from '.'

const defaultStore = {
  tripInsuranceCreditCard: {
    data: {
      Message: {
        TipoCritica: '',
        Mensagem: '',
      },
      creditCards: tripInsuranceCreditCardMock,
    },
    isLoading: false,
    hasError: false,
  },
  tripInsuranceQuotation: {
    data: tripInsuranceQuotationMock,
    isLoading: false,
    hasError: false,
  },
  fluxManagement: {
    stack: [{}],
    form: {
      pacoteEscolhido: '1',
    },
  },
}

const setup = (initialState: any) => {
  const store = storeFactory(initialState)
  return renderWithReduxAndTheme(<PaymentStep />, {
    store,
  })
}

describe('PaymentStep component', () => {
  it('should exists', () => {
    setup(defaultStore)
    expect(PaymentStep).toBeDefined()
  })

  it('should change the option when radio is clicked', () => {
    setup(defaultStore)
    const radioPorto = screen.getAllByRole('radio', { name: 'cartao-porto' })
    const radioOutro = screen.getByRole('radio', { name: 'cartao-outro' })

    userEvent.click(radioOutro)
    expect(radioOutro).toBeChecked()

    userEvent.click(radioPorto[1])
    expect(radioPorto[1]).toBeChecked()
  })

  it('should show form inputs', () => {
    renderWithReduxAndTheme(<PaymentStep />)

    expect(screen.getByTestId('select-option-input-parcelas')).toBeVisible()
    expect(screen.getByTestId('número do cartão')).toBeVisible()
    expect(screen.getByTestId('nome completo')).toBeVisible()
    expect(screen.getByText('Assim como está impresso no cartão')).toBeVisible()
    expect(screen.getByTestId('validade')).toBeVisible()
    expect(screen.getByTestId('cvc')).toBeVisible()
  })

  it('Should open select when select is clicked', () => {
    setup(defaultStore)
    const select = screen.getByTestId('select-option-input-parcelas')

    userEvent.click(select)
    expect(screen.getByRole('img', { name: 'arrowup' })).toBeVisible()
    expect(screen.getByText('1x de R$ 31,94 (À vista)')).toBeVisible()
  })

  it('button should be disabled until all is done', () => {
    setup(defaultStore)
    expect(screen.getByRole('button', { name: 'Continuar' })).toBeDisabled()

    const radioOutro = screen.getByRole('radio', { name: 'cartao-outro' })

    userEvent.click(radioOutro)
    expect(radioOutro).toBeChecked()

    const select = screen.getByTestId('select-option-input-parcelas')

    userEvent.click(select)
    userEvent.click(screen.getByText('1x de R$ 33,63 (À vista)'))

    const cardNumberInput = screen.getByTestId('número do cartão')
    userEvent.type(cardNumberInput, '5555666677778884')
    expect(cardNumberInput).toHaveValue('5555 6666 7777 8884')

    const nameInput = screen.getByTestId('nome completo')
    userEvent.type(nameInput, 'João Silva')
    expect(nameInput).toHaveValue('João Silva')

    const validityInput = screen.getByTestId('validade')
    userEvent.type(validityInput, '12/2025')
    expect(validityInput).toHaveValue('12/2025')

    const cvcInput = screen.getByTestId('cvc')
    userEvent.type(cvcInput, '123')
    cvcInput.blur()
    expect(cvcInput).toHaveValue('123')

    const button = screen.getByRole('button', { name: 'Continuar' })
    userEvent.click(button)
    expect(button).not.toBeDisabled()
  })

  it('should be able to disable button if it has invalid data', () => {
    setup(defaultStore)
    expect(screen.getByRole('button', { name: 'Continuar' })).toBeDisabled()

    const radioOutro = screen.getByRole('radio', { name: 'cartao-outro' })

    userEvent.click(radioOutro)
    expect(radioOutro).toBeChecked()

    const select = screen.getByTestId('select-option-input-parcelas')

    userEvent.click(select)
    userEvent.click(screen.getByText('1x de R$ 33,63 (À vista)'))

    const cardNumberInput = screen.getByTestId('número do cartão')
    userEvent.type(cardNumberInput, '1111111111111111')
    expect(cardNumberInput).toHaveValue('1111 1111 1111 1111')

    const nameInput = screen.getByTestId('nome completo')
    userEvent.type(nameInput, 'João Silva')
    expect(nameInput).toHaveValue('João Silva')

    const validityInput = screen.getByTestId('validade')
    userEvent.type(validityInput, '13/2025')
    expect(validityInput).toHaveValue('13/2025')

    const cvcInput = screen.getByTestId('cvc')
    userEvent.type(cvcInput, '12')
    cvcInput.blur()
    expect(cvcInput).toHaveValue('12')

    expect(screen.getByRole('button', { name: 'Continuar' })).toBeDisabled()
  })
})
