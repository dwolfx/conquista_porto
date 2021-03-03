import React from 'react'

import 'jest-styled-components'
import { renderWithReduxAndTheme } from 'testUtils'

import { fireEvent } from '@testing-library/dom'
import PassengerStep from '.'

let portalRoot = document.getElementById('root')

if (!portalRoot) {
  portalRoot = document.createElement('div')
  portalRoot.setAttribute('id', 'root')
  document.body.appendChild(portalRoot)
}

describe('PassengerStep tests', () => {
  it('should exists', () => {
    const { getByTestId } = renderWithReduxAndTheme(<PassengerStep />)
    expect(getByTestId('passenger-step')).toBeVisible()
  })

  it('should be able to show text when icon is hovered', () => {
    window.resizeTo(400, 400)
    const { getByTestId, getByText } = renderWithReduxAndTheme(
      <PassengerStep />
    )

    fireEvent.click(getByTestId('passenger-info'))
    expect(
      getByText(/O seguro cobre até 20 passageiros, incluindo você\./i)
    ).toBeVisible()
  })

  it('should increment state on afterOnChange', () => {
    const { getAllByRole, getAllByTestId } = renderWithReduxAndTheme(
      <PassengerStep />
    )
    const button = getAllByRole('button', { name: 'plus' })[0]
    const input = getAllByTestId('input-number-')[0]

    fireEvent.click(button)
    expect(input).toHaveValue(1)
  })
})
