import React from 'react'
import { screen } from '@testing-library/react'
import { renderWithReduxAndTheme } from 'testUtils'
import CompanionStep from '.'
import { createStore } from 'redux'

const createRootContainer = () => {
  let portalRoot = document.getElementById('root')
  if (!portalRoot) {
    portalRoot = document.createElement('div')
    portalRoot.setAttribute('id', 'root')
    document.body.appendChild(portalRoot)
  }
  return portalRoot
}

const renderTableCompanionDataMock = [
  {
    nome: 'Bruno Mizhari',
    status: false,
  },
  {
    nome: 'Acompanhante 2',
    status: false,
  },
  {
    nome: 'Acompanhante 3',
    status: false,
  },
]

const reducerMock: any = {
  fluxManagement: {
    stack: [],
    form: {
      qtdPassagMenorSetentaAnos: 1,
      qtdPassagMaiorSetentaAnos: 2,
      acompanhantes: renderTableCompanionDataMock,
    },
  },
  tripInsuranceCreditCard: {
    isLoading: false,
    data: null,
  },
}

describe('Companion Form tests', () => {
  const storeMock = (state = reducerMock) => state
  it('should exists', () => {
    expect(CompanionStep).toBeDefined()
  })

  it('should render correctly', () => {
    renderWithReduxAndTheme(<CompanionStep />, {
      store: createStore(storeMock),
      container: createRootContainer(),
    })
    expect(screen.getByText('Bruno Mizhari')).toBeVisible()
  })
})
