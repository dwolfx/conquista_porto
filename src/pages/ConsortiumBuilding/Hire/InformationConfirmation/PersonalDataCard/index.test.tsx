import React from 'react'
import { screen } from '@testing-library/react'
import { renderWithReduxAndTheme } from 'testUtils'
import { createStore } from 'redux'
import { formatCpf } from 'helpers'
import PersonalDataCard from '.'
import { IPersonalDataForm } from '..'

const reducerMock = {
  customerProfile: {
    data: {
      cpfCnpj: '36275312807',
      customerName: 'Rubao Teste',
      customerEmail: 'ricardo.eufrasio@portoseguro.com.br',
      customerState: 'SP',
      customerBirthdate: '1981-11-11T00:00:00-03:00',
    },
    status: 'loaded',
    hasError: false,
    isLoading: false,
  },
}

const PersonalDataCardComponent = () => {
  const labels = {
    name: 'Nome',
    document: 'CPF',
    dateOfBirth: 'Data de Nascimento',
    nationality: 'Nacionalidade',
    civilStatus: 'Estado civil',
    spouseName: 'Nome do(a) cônjuge',
    spouseDocument: 'CPF do(a) cônjuge',
  }
  const [personalDataForm, setPersonalDataForm] = React.useState<
    IPersonalDataForm
  >({
    civilStatus: '',
    spouseName: '',
    spouseDocument: '',
  })

  return (
    <PersonalDataCard
      personalData={[personalDataForm, setPersonalDataForm]}
      label={labels}
    />
  )
}

describe('PersonalDataCard', () => {
  const storeMock = (state = reducerMock) => state
  const store = createStore(storeMock)

  it('Should exist', () => {
    expect(PersonalDataCardComponent).toBeDefined()
  })

  it('Should show data display exist', () => {
    renderWithReduxAndTheme(<PersonalDataCardComponent />, {
      store,
    })

    expect(screen.getByText('Rubao Teste')).toBeInTheDocument()
    expect(screen.getByText(formatCpf('36275312807'))).toBeInTheDocument()
    expect(screen.getByText('11/11/1981')).toBeInTheDocument()
    expect(screen.getByText('Brasileiro(a)')).toBeInTheDocument()
  })
})
