import React from 'react'
import { renderWithReduxAndTheme } from 'testUtils'
import '@testing-library/jest-dom'
import 'jest-styled-components'

import LinkText from '.'

describe('LinkText Footer', () => {
  it('Should to render link text', () => {
    const { getByText } = renderWithReduxAndTheme(
      <LinkText hrefValue="">clicou no link</LinkText>
    )
    expect(getByText('clicou no link')).toBeInTheDocument()
  })
  it('Should to render css rules', () => {
    const { getByText } = renderWithReduxAndTheme(
      <LinkText hrefValue="">clicou no link</LinkText>
    )
    expect(getByText('clicou no link')).toHaveStyleRule('color', '#00ADEF')
  })
})
