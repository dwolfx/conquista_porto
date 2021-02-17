import React from 'react'
import { renderWithReduxAndTheme, screen } from 'testUtils'

import InsuranceSumary from '.'

describe('Success state tests', () => {
  it('exists', () => {
    expect(InsuranceSumary).toBeDefined()
  })
  it('should render tablet component', () => {
    window.resizeTo(500, 800)
    renderWithReduxAndTheme(<InsuranceSumary />)
    expect(screen.getByTestId('hire-card-sumary-tablet')).toBeInTheDocument()
  })
  it('should render desktop component', () => {
    renderWithReduxAndTheme(<InsuranceSumary />)
    expect(screen.getByTestId('hire-card-sumary-desktop')).toBeInTheDocument()
  })
})
