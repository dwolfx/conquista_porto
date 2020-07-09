import React from 'react'

import { renderWithReduxAndTheme, fireEvent } from 'testUtils'
import TransactionHeader from '.'

describe('Transaction Header Component', () => {
  it('should render without back-button', () => {
    const { queryByTestId } = renderWithReduxAndTheme(<TransactionHeader />)

    expect(queryByTestId('back-button')).toBeNull()
    expect(queryByTestId('logo')).toBeDefined()
    expect(queryByTestId('close-button')).toBeDefined()
  })
  it('should render with back-button', () => {
    const { queryByTestId } = renderWithReduxAndTheme(
      <TransactionHeader showBackButton />
    )

    expect(queryByTestId('back-button')).toBeDefined()
    expect(queryByTestId('logo')).toBeDefined()
    expect(queryByTestId('close-button')).toBeDefined()
  })
  it('should not show step bar without stepBarProps', () => {
    const { queryByTestId } = renderWithReduxAndTheme(
      <TransactionHeader showStepsBar />
    )

    expect(queryByTestId('section-name')).toBeNull()
    expect(queryByTestId('steps')).toBeNull()
  })
  it('should not show step bar without stepBarProps', () => {
    const { queryByTestId } = renderWithReduxAndTheme(
      <TransactionHeader
        showStepsBar
        stepsBarProps={{ title: 'Testing Component', maxSteps: 4, step: 2 }}
      />
    )

    expect(queryByTestId('section-name')?.textContent).toBe('Testing Component')
    expect(queryByTestId('steps')?.textContent).toBe('ETAPA 2 de 4')
  })
})
