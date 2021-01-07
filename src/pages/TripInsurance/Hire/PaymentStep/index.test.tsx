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
    const radioPorto = screen.getByRole('radio', { name: 'cartao-porto' })
    const radioOutro = screen.getByRole('radio', { name: 'cartao-outro' })

    userEvent.click(radioOutro)
    expect(radioOutro).toBeChecked()

    userEvent.click(radioPorto)
    expect(radioPorto).toBeChecked()
  })

  it('should show form inputs', () => {
    setup(defaultStore)

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

    const select = screen.getByTestId('select-option-input-parcelas')

    userEvent.click(select)
    userEvent.click(screen.getByText('1x de R$ 31,94 (À vista)'))

    const cardNumberInput = screen.getByTestId('número do cartão')
    userEvent.type(cardNumberInput, '9876987698769876')
    expect(cardNumberInput).toHaveValue('9876987698769876')

    const nameInput = screen.getByTestId('nome completo')
    userEvent.type(nameInput, 'João Silva')
    expect(nameInput).toHaveValue('João Silva')

    const validityInput = screen.getByTestId('validade')
    userEvent.type(validityInput, '22/2025')
    expect(validityInput).toHaveValue('22/2025')

    const cvcInput = screen.getByTestId('cvc')
    userEvent.type(cvcInput, '123')
    expect(cvcInput).toHaveValue('123')

    expect(screen.getByRole('button', { name: 'Continuar' })).not.toBeDisabled()
  })
})
