import React from 'react'

import { renderWithReduxAndTheme, act, screen } from 'testUtils'
import userEvent from '@testing-library/user-event'

import ComparativeModal from './index'

import tripInsuranceQuotationMock from 'mocks/tripInsuranceQuotation.json'

const createRootContainer = () => {
  let container = document.getElementById('root')
  if (!container) {
    container = document.createElement('div')
    container.setAttribute('id', 'root')
    document.body.appendChild(container)
  }
  return container
}

const setup = () =>
  renderWithReduxAndTheme(
    <ComparativeModal
      isOpen
      handleClose={() => {}}
      travelPlans={tripInsuranceQuotationMock.ViagemPacote.pacotes}
      isLoading={false}
    />,
    {
      container: createRootContainer(),
    }
  )

describe('ComparativeModal component', () => {
  it('should exists', () => {
    expect(ComparativeModal).toBeDefined()
  })
  it(`should trigger 'CLOSE' button`, () => {
    const handleClose = jest.fn()

    renderWithReduxAndTheme(
      <ComparativeModal
        isOpen
        handleClose={handleClose}
        travelPlans={tripInsuranceQuotationMock.ViagemPacote.pacotes}
        isLoading={false}
      />,
      {
        container: createRootContainer(),
      }
    )

    const closeButton = screen.getByText(/close/i)
    userEvent.click(closeButton)

    expect(handleClose).toHaveBeenCalled()
  })
  it('should render Table component', () => {
    setup()

    expect(screen.getByText(/comparativo de coberturas/i)).toBeDefined()
  })
  it('should render Tabs component', () => {
    setup()

    act(() => {
      window.resizeTo(400, 600)
    })

    expect(screen.getByText(/coberturas/i)).toBeDefined()
  })
  it('should render loading state', () => {
    setup()
    renderWithReduxAndTheme(
      <ComparativeModal
        isOpen
        handleClose={() => {}}
        travelPlans={tripInsuranceQuotationMock.ViagemPacote.pacotes}
        isLoading
      />,
      {
        container: createRootContainer(),
      }
    )

    expect(
      screen.getByText(/aguarde, estamos buscando suas informações\.\.\./i)
    ).toBeDefined()
  })
  it('should render empty state', () => {
    const { container } = renderWithReduxAndTheme(
      <ComparativeModal isOpen handleClose={() => {}} travelPlans={null} />,
      {
        container: createRootContainer(),
      }
    )
    expect(container.children[0].children[1].children[1]).toBeEmptyDOMElement()
  })
  it('should render loading state', () => {
    setup()
    renderWithReduxAndTheme(
      <ComparativeModal
        isOpen
        handleClose={() => {}}
        travelPlans={tripInsuranceQuotationMock.ViagemPacote.pacotes}
        isLoading
      />,
      {
        container: createRootContainer(),
      }
    )

    expect(
      screen.getByText(/aguarde, estamos buscando suas informações\.\.\./i)
    ).toBeDefined()
  })
  it('should render empty state', () => {
    const { container } = renderWithReduxAndTheme(
      <ComparativeModal isOpen handleClose={() => {}} travelPlans={null} />,
      {
        container: createRootContainer(),
      }
    )
    expect(container.children[0].children[1].children[1]).toBeEmptyDOMElement()
  })
})
