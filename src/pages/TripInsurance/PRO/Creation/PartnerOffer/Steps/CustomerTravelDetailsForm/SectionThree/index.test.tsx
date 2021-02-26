import React from 'react'
import { renderWithReduxAndTheme, screen } from 'testUtils'
import userEvent from '@testing-library/user-event'

import SectionThree from './index'

describe('SectionThree component', () => {
  it('should exists', () => {
    expect(SectionThree).toBeDefined()
  })
  it('should call setIsSectionValid', () => {
    const setIsSectionValid = jest.fn()

    renderWithReduxAndTheme(
      <SectionThree
        sectionThreeRef={{ current: {} as HTMLTableSectionElement }}
        setIsSectionValid={setIsSectionValid}
        customer={{
          nomeCliente: 'Nome do Cliente',
          cpfCliente: '00000000191',
          idCorretor: '35',
        }}
        hasPoliticallyExposedPersonState={[true, jest.fn()]}
        selectedPoliticalyExposedKinshipState={[
          { id: 6, name: 'Outros' },
          jest.fn(),
        ]}
        politicalyExposedPersonNameState={['Nome do Cliente', jest.fn()]}
        politicalyExposedPersonCPFState={['00000000191', jest.fn()]}
      />
    )

    expect(setIsSectionValid).toHaveBeenCalledTimes(2)
  })
  it('should call setPoliticalyExposedPersonName and setPoliticalyExposedPersonCPF', () => {
    const setPoliticalyExposedPersonName = jest.fn()
    const setPoliticalyExposedPersonCPF = jest.fn()

    renderWithReduxAndTheme(
      <SectionThree
        sectionThreeRef={{ current: {} as HTMLTableSectionElement }}
        setIsSectionValid={jest.fn()}
        customer={{
          nomeCliente: 'Nome do Cliente',
          cpfCliente: '00000000191',
          idCorretor: '35',
        }}
        hasPoliticallyExposedPersonState={[true, jest.fn()]}
        selectedPoliticalyExposedKinshipState={[
          { id: 7, name: 'Segurado' },
          jest.fn(),
        ]}
        politicalyExposedPersonNameState={['', setPoliticalyExposedPersonName]}
        politicalyExposedPersonCPFState={['', setPoliticalyExposedPersonCPF]}
      />
    )

    expect(setPoliticalyExposedPersonName).toHaveBeenCalledTimes(1)
    expect(setPoliticalyExposedPersonCPF).toHaveBeenCalledTimes(1)
  })
  it('should trigger Radio onChange', () => {
    const setPoliticalyExposedPerson = jest.fn()

    renderWithReduxAndTheme(
      <SectionThree
        sectionThreeRef={{ current: {} as HTMLTableSectionElement }}
        setIsSectionValid={jest.fn()}
        customer={{
          nomeCliente: 'Nome do Cliente',
          cpfCliente: '00000000191',
          idCorretor: '35',
        }}
        hasPoliticallyExposedPersonState={[false, setPoliticalyExposedPerson]}
        selectedPoliticalyExposedKinshipState={[
          { id: 7, name: 'Segurado' },
          jest.fn(),
        ]}
        politicalyExposedPersonNameState={['', jest.fn()]}
        politicalyExposedPersonCPFState={['', jest.fn()]}
      />
    )

    const radioOption = screen.getByLabelText(/sim/i)
    userEvent.click(radioOption)

    expect(setPoliticalyExposedPerson).toHaveBeenCalledTimes(1)
  })
  it('should trigger name input onChange', () => {
    const setPoliticalyExposedPersonName = jest.fn()

    renderWithReduxAndTheme(
      <SectionThree
        sectionThreeRef={{ current: {} as HTMLTableSectionElement }}
        setIsSectionValid={jest.fn()}
        customer={{
          nomeCliente: 'Nome do Cliente',
          cpfCliente: '00000000191',
          idCorretor: '35',
        }}
        hasPoliticallyExposedPersonState={[true, jest.fn()]}
        selectedPoliticalyExposedKinshipState={[
          { id: 6, name: 'Outros' },
          jest.fn(),
        ]}
        politicalyExposedPersonNameState={['', setPoliticalyExposedPersonName]}
        politicalyExposedPersonCPFState={['00000000191', jest.fn()]}
      />
    )

    const nameInput = screen.getByTestId('nome completo') as HTMLInputElement

    nameInput.setSelectionRange(0, 20)
    userEvent.type(nameInput, '{backspace}Nome teste')

    expect(setPoliticalyExposedPersonName).toHaveBeenCalled()
  })
  it('should trigger cpf input onChange', () => {
    const setPoliticalyExposedPersonCPF = jest.fn()

    renderWithReduxAndTheme(
      <SectionThree
        sectionThreeRef={{ current: {} as HTMLTableSectionElement }}
        setIsSectionValid={jest.fn()}
        customer={{
          nomeCliente: 'Nome do Cliente',
          cpfCliente: '00000000191',
          idCorretor: '35',
        }}
        hasPoliticallyExposedPersonState={[true, jest.fn()]}
        selectedPoliticalyExposedKinshipState={[
          { id: 6, name: 'Outros' },
          jest.fn(),
        ]}
        politicalyExposedPersonNameState={['', jest.fn()]}
        politicalyExposedPersonCPFState={[
          '00000000191',
          setPoliticalyExposedPersonCPF,
        ]}
      />
    )

    const cpfInput = screen.getByTestId('cpf') as HTMLInputElement

    cpfInput.setSelectionRange(0, 20)
    userEvent.type(cpfInput, '{backspace}00000000191')
    userEvent.tab()

    expect(setPoliticalyExposedPersonCPF).toHaveBeenCalled()
  })
})
