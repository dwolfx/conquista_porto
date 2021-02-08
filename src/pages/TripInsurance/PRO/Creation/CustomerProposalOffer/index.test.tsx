import React from 'react'

import { renderWithReduxAndTheme, screen } from 'testUtils'
import { storeFactory } from 'setupTests'

import CustomerProposalOffer from '.'

const defaultStore: {
  fluxManagement: { stack: React.ReactElement[]; form: {} }
} = {
  fluxManagement: {
    stack: [],
    form: {},
  },
}

const createRootContainer = () => {
  let container = document.getElementById('root')
  if (!container) {
    container = document.createElement('div')
    container.setAttribute('id', 'root')
    document.body.appendChild(container)
  }
  return container
}

const setup = (initialState: {
  fluxManagement: { stack: React.ReactElement[]; form: {} }
}) => {
  const store = storeFactory(initialState)
  return renderWithReduxAndTheme(
    <CustomerProposalOffer isOpen closeHandler={() => {}} />,
    { store, container: createRootContainer() }
  )
}

describe('CustomerProposalOffer component', () => {
  it('should exists', () => {
    setup(defaultStore)
    expect(CustomerProposalOffer).toBeDefined()
  })
})
