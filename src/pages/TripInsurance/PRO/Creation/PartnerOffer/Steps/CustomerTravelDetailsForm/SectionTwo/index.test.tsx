import React from 'react'
import { renderWithReduxAndTheme, screen } from 'testUtils'
import userEvent from '@testing-library/user-event'

import SectionTwo from '.'

describe('SectionTwo component', () => {
  it('should exists', () => {
    renderWithReduxAndTheme(
      <SectionTwo
        setIsSectionValid={jest.fn()}
        emailState={['', jest.fn()]}
        phoneNumberState={['', jest.fn()]}
        selectedPhoneTypeState={[
          {
            id: 0,
            name: '',
          },
          jest.fn(),
        ]}
        sectionTwoRef={{ current: {} as HTMLTableSectionElement }}
      />
    )
    expect(SectionTwo).toBeDefined()
  })
  it(`should display input email value`, () => {
    renderWithReduxAndTheme(
      <SectionTwo
        setIsSectionValid={jest.fn()}
        emailState={['email@test.com', jest.fn()]}
        phoneNumberState={['', jest.fn()]}
        selectedPhoneTypeState={[
          {
            id: 0,
            name: '',
          },
          jest.fn(),
        ]}
        sectionTwoRef={{ current: {} as HTMLTableSectionElement }}
      />
    )

    const EmailInput = screen.getByTestId('e-mail') as HTMLInputElement

    expect(EmailInput).toHaveValue('email@test.com')
  })
  it(`should call setEmail`, () => {
    const mockSetState = jest.fn()
    renderWithReduxAndTheme(
      <SectionTwo
        setIsSectionValid={jest.fn()}
        emailState={['', mockSetState]}
        phoneNumberState={['', jest.fn()]}
        selectedPhoneTypeState={[
          {
            id: 0,
            name: '',
          },
          jest.fn(),
        ]}
        sectionTwoRef={{ current: {} as HTMLTableSectionElement }}
      />
    )

    const EmailInput = screen.getByTestId('e-mail') as HTMLInputElement

    EmailInput.setSelectionRange(0, 20)
    userEvent.type(EmailInput, '{backspace}email@test.com')
    userEvent.tab()

    expect(mockSetState).toHaveBeenCalled()
  })
  it(`should display input phone value`, () => {
    renderWithReduxAndTheme(
      <SectionTwo
        setIsSectionValid={jest.fn()}
        emailState={['', jest.fn()]}
        phoneNumberState={['11944445555', jest.fn()]}
        selectedPhoneTypeState={[
          {
            id: 0,
            name: '',
          },
          jest.fn(),
        ]}
        sectionTwoRef={{ current: {} as HTMLTableSectionElement }}
      />
    )

    const EmailInput = screen.getByTestId('telefone') as HTMLInputElement

    expect(EmailInput).toHaveValue('(11) 9 4444-5555')
  })
  it(`should call setPhoneNumber`, () => {
    const mockSetState = jest.fn()
    renderWithReduxAndTheme(
      <SectionTwo
        setIsSectionValid={jest.fn()}
        emailState={['', jest.fn()]}
        phoneNumberState={['', mockSetState]}
        selectedPhoneTypeState={[
          {
            id: 0,
            name: '',
          },
          jest.fn(),
        ]}
        sectionTwoRef={{ current: {} as HTMLTableSectionElement }}
      />
    )

    const phoneInput = screen.getByTestId('telefone') as HTMLInputElement

    phoneInput.setSelectionRange(0, 32)
    userEvent.type(phoneInput, '{backspace}11944445555')
    userEvent.tab()

    expect(mockSetState).toHaveBeenCalled()
  })
  it(`should display input phone type value`, () => {
    renderWithReduxAndTheme(
      <SectionTwo
        setIsSectionValid={jest.fn()}
        emailState={['', jest.fn()]}
        phoneNumberState={['', jest.fn()]}
        selectedPhoneTypeState={[
          {
            id: 1,
            name: 'Celular',
            value: 'Celular',
          },
          jest.fn(),
        ]}
        sectionTwoRef={{ current: {} as HTMLTableSectionElement }}
      />
    )

    const phoneTypeInput = screen.getByTestId('select-option-input-phone-type')

    expect(phoneTypeInput).toHaveValue('Celular')
  })
})
