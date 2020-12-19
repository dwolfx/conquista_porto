import React from 'react'
import { renderWithReduxAndTheme, screen } from 'testUtils'

import Status from '.'

describe('Success state tests', () => {
  it('exists', () => {
    expect(Status).toBeDefined()
  })
  it('should render SuccessState', () => {
    renderWithReduxAndTheme(<Status type="success" />)
    expect(screen.getByTestId('hire-status-success')).toBeInTheDocument()
  })
  it('should render ErrorState', () => {
    renderWithReduxAndTheme(<Status type="error" />)
    expect(screen.getByTestId('hire-status-error')).toBeInTheDocument()
  })
})
