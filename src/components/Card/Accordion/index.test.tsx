import React from 'react'
import { renderWithReduxAndTheme, screen, fireEvent } from 'testUtils'

import CardAccordion from './index'

describe('Card Accordion component', () => {
  it('should render with title and have height of 100px', () => {
    renderWithReduxAndTheme(
      <CardAccordion initialHeight={100} title="Card Accordion" />
    )

    expect(screen.getByText('Card Accordion')).toBeDefined()
    expect(screen.getByTestId('accordion-card')).toHaveStyle('height: 100px')
  })
  it('should expand and contract', () => {
    renderWithReduxAndTheme(
      <CardAccordion initialHeight={100} title="Card Accordion" />
    )

    expect(screen.getByTestId('accordion-card')).toHaveStyle('height: 100px')
    fireEvent.click(screen.getByRole('button'))
    expect(screen.getByTestId('accordion-card')).toHaveStyle('height: auto')
    fireEvent.click(screen.getByRole('button'))
    expect(screen.getByTestId('accordion-card')).toHaveStyle('height: 100px')
  })
})
