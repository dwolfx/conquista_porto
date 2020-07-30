import React from 'react'
import { renderWithReduxAndTheme } from 'testUtils'

import Loading from './index'

describe('Loading component', () => {
  it('should display only spinner', () => {
    const { queryByTestId } = renderWithReduxAndTheme(
      <Loading legend="This is a legend" />
    )

    expect(queryByTestId('legend')).toBeNull()
    expect(queryByTestId('loading-bar')).toBeNull()
    expect(queryByTestId('loading-spinner')).toBeDefined()
  })

  // it('should display loading bar', () => {
  //   const { queryByTestId } = renderWithReduxAndTheme(
  //     <Loading legend="This is a legend" type="bar" />
  //   )

  //   expect(queryByTestId('spinner')).toBeNull()
  //   expect(queryByTestId('legend')?.textContent).toBe('This is a legend')
  //   expect(queryByTestId('spinner')).toBeDefined()
  // })
})
