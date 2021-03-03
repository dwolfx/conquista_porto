import React from 'react'
import { renderWithReduxAndTheme } from 'testUtils'

import AccountBalance from '.'

describe('AccountBalance', () => {
  it('should display formatted account balance value', () => {
    const { getByText } = renderWithReduxAndTheme(
      <AccountBalance
        reloadOnClickFunction={() => {}}
        accountBalanceValue="9785.0"
        hasError={false}
        isLoading={false}
      />
    )

    expect(getByText('R$ 9.785,00').textContent).toBeDefined()
  })
  it('should display error state if the hasError value is true', () => {
    const { getByText } = renderWithReduxAndTheme(
      <AccountBalance
        reloadOnClickFunction={() => {}}
        accountBalanceValue={null}
        hasError
        isLoading={false}
      />
    )

    expect(
      getByText(
        'Não foi possível carregar o saldo. Por favor, tente novamente.'
      ).textContent
    ).toBeDefined()
  })
  it('should display error state if the isLoading value is false and accountBalanceValue null', () => {
    const { getByText } = renderWithReduxAndTheme(
      <AccountBalance
        reloadOnClickFunction={() => {}}
        accountBalanceValue={null}
        hasError={false}
        isLoading={false}
      />
    )

    expect(
      getByText(
        'Não foi possível carregar o saldo. Por favor, tente novamente.'
      ).textContent
    ).toBeDefined()
  })
  it('should display loading state if the isLoading value is true', () => {
    const { getByText } = renderWithReduxAndTheme(
      <AccountBalance
        reloadOnClickFunction={() => {}}
        accountBalanceValue={null}
        hasError={false}
        isLoading
      />
    )

    expect(
      getByText('Buscando informações de saldo...').textContent
    ).toBeDefined()
  })
})
