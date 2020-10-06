import React from 'react'

import { renderWithReduxAndTheme, screen } from 'testUtils'

import PrivateWelfareLoadingState from '.'

describe('PrivateWelfareLoadingState tests', () => {
  it('should exists PrivateWelfareLoadingState component', () => {
    expect(PrivateWelfareLoadingState).toBeDefined()
  })
  it('should render correctly', () => {
    renderWithReduxAndTheme(<PrivateWelfareLoadingState />)
    expect(screen.getByTestId('loading-bar')).toBeInTheDocument()
  })
})
