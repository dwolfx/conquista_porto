import React from 'react'
import { renderWithReduxAndTheme } from 'testUtils'
import '@testing-library/jest-dom'
import 'jest-styled-components'

import Tablet from '.'
import { MemoryRouter } from 'react-router-dom'

const createRootContainer = () => {
  let container = document.getElementById('root')
  if (!container) {
    container = document.createElement('div')
    container.setAttribute('id', 'root')
    document.body.appendChild(container)
  }
  return container
}

describe('It renders correctly', () => {
  test('It render left content', () => {
    const { getByTestId } = renderWithReduxAndTheme(
      <MemoryRouter>
        <Tablet
          filters={[]}
          filteredInvestedFunds={[]}
          viewMode="LIST"
          onHandleChangeFilter={() => {}}
          onHandleChangeView={() => {}}
        />
      </MemoryRouter>,
      { container: createRootContainer() }
    )
    expect(getByTestId('left-content')).toBeInTheDocument()
  })
  test('It render main content', () => {
    const { getByTestId } = renderWithReduxAndTheme(
      <MemoryRouter>
        <Tablet
          filters={[]}
          filteredInvestedFunds={[]}
          viewMode="LIST"
          onHandleChangeFilter={() => {}}
          onHandleChangeView={() => {}}
        />
      </MemoryRouter>,
      { container: createRootContainer() }
    )
    expect(getByTestId('main-content')).toBeInTheDocument()
  })
})
