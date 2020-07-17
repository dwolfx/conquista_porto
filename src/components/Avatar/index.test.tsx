import React from 'react'
import { renderWithReduxAndTheme } from 'testUtils'

import Avatar from '.'

describe('Avatar', () => {
  test('Should render the tag img', () => {
    const avatarUrl = 'url'
    const { getByRole } = renderWithReduxAndTheme(
      <Avatar avatarUrl={avatarUrl} />
    )
    expect(getByRole('img')).toBeDefined()
  })
  test('Should render the user icon', () => {
    const avatarUrl = ''
    const { getByText } = renderWithReduxAndTheme(
      <Avatar avatarUrl={avatarUrl} />
    )
    expect(getByText('user.svg')).toBeDefined()
  })
})
