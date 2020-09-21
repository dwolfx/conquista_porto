import React from 'react'
import { renderWithReduxAndTheme } from 'testUtils'

import CardHeaderTitle from '.'

describe('CardHeaderTitle', () => {
  test('This component should be defined', () => {
    const { getByText } = renderWithReduxAndTheme(
      <CardHeaderTitle headerTitle="É a verdade não minto!" />
    )
    expect(getByText('É a verdade não minto!')).toBeDefined()
  })
  test('The icon "info" should be defined', () => {
    const { getByText } = renderWithReduxAndTheme(
      <CardHeaderTitle headerTitle="É a verdade não minto!" />
    )
    expect(getByText('information.svg')).toBeDefined()
  })
})
