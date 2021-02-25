import React from 'react'
import { renderWithReduxAndTheme, screen } from 'testUtils'
import { storeFactory } from 'setupTests'
import userEvent from '@testing-library/user-event'

import SectionOne from '.'

const defaultStore: {
  fluxManagement: { stack: React.ReactElement[]; form: {} }
} = {
  fluxManagement: {
    stack: [],
    form: {
      passageiroPrincipal: {
        nome: 'Nome Passageiro Principal',
        numeroCpf: '000000001',
        digitoCpf: '91',
      },
    },
  },
}

describe('SectionOne component', () => {
  it('should exists', () => {
    const store = storeFactory(defaultStore)
    renderWithReduxAndTheme(
      <SectionOne
        setIsSectionValid={jest.fn()}
        brazilianResidentState={['', jest.fn()]}
        sectionOneRef={{ current: {} as HTMLTableSectionElement }}
      />,
      {
        store,
      }
    )
    expect(SectionOne).toBeDefined()
  })
  it(`should have 'sim' option selected`, () => {
    const store = storeFactory(defaultStore)
    renderWithReduxAndTheme(
      <SectionOne
        setIsSectionValid={jest.fn()}
        brazilianResidentState={['1', jest.fn()]}
        sectionOneRef={{ current: {} as HTMLTableSectionElement }}
      />,
      {
        store,
      }
    )

    expect(screen.getByLabelText(/sim/i)).toBeChecked()
  })
  it(`should have 'nao' option selected`, () => {
    const store = storeFactory(defaultStore)
    renderWithReduxAndTheme(
      <SectionOne
        setIsSectionValid={jest.fn()}
        brazilianResidentState={['0', jest.fn()]}
        sectionOneRef={{ current: {} as HTMLTableSectionElement }}
      />,
      {
        store,
      }
    )

    expect(screen.getByLabelText(/não/i)).toBeChecked()
  })
  it(`should call setIsBrazilianResident`, () => {
    const mockSetState = jest.fn()
    const store = storeFactory(defaultStore)
    renderWithReduxAndTheme(
      <SectionOne
        setIsSectionValid={jest.fn()}
        brazilianResidentState={['', mockSetState]}
        sectionOneRef={{ current: {} as HTMLTableSectionElement }}
      />,
      {
        store,
      }
    )

    const radioOption = screen.getByLabelText(/sim/i)
    userEvent.click(radioOption)

    expect(mockSetState).toHaveBeenCalled()
  })
})
