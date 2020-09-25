import React from 'react'
import { renderWithReduxAndTheme, screen, fireEvent } from 'testUtils'
import { storeFactory } from 'setupTests'

import { GetPrivateWelfareRequest } from 'store/modules/PrivateWelfare/action'
import PrivateWelfareErrorState from '.'

describe('PrivateWelfareError tests', () => {
  it('should exists PrivateWelfareErrorState component', () => {
    expect(PrivateWelfareErrorState).toBeDefined()
  })
  it('text should render correctly', () => {
    renderWithReduxAndTheme(<PrivateWelfareErrorState isLoading={false} cpf="13150747619"/>)
    const errorTextElement = screen.getByText('Desculpe, não foi possível carregar suas informações. Aguarde alguns instantes e tente novamente.')
    expect(errorTextElement).toBeDefined()
    expect(errorTextElement).toHaveStyleRule('color', '#E72176')
  })
  it('button should render correctly', () => {
    renderWithReduxAndTheme(
      <PrivateWelfareErrorState isLoading={false} cpf="13150747619" />
    )
    const errorButtonElement = screen.getByRole('button', {
      name: /tentar novamente/i,
    })
    expect(errorButtonElement).toBeDefined()
  })
  it('button should indicates loading request when clicked', () => {
    renderWithReduxAndTheme(
      <PrivateWelfareErrorState isLoading cpf="13150747619" />
    )
    const loadingSpinerIcon = screen.getByTestId('loading-spinner')
    expect(loadingSpinerIcon).toBeDefined()
  })
  it('button should reload request', () => {
    const store = storeFactory({
      privateWelfare: {
        data: null,
        hasError: false,
        isLoading: false,
      },
    })
    const { rerender } = renderWithReduxAndTheme(
      <PrivateWelfareErrorState
        isLoading={store.getState().privateWelfare.isLoading}
        cpf="13150747619"
      />,
      { store }
    )
    const retryButtonElemment = screen.getByRole('button', {
      name: /tentar novamente/i,
    })
    fireEvent.click(retryButtonElemment)
    store.dispatch(GetPrivateWelfareRequest('13150747619'))
    rerender(
      <PrivateWelfareErrorState
        isLoading={store.getState().privateWelfare.isLoading}
        cpf="13150747619"
      />
    )
    const loadingSpinerIcon = screen.getByTestId('loading-spinner')
    expect(loadingSpinerIcon).toBeInTheDocument()
  })
})