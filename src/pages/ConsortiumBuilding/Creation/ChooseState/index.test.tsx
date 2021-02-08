import React from 'react'
import 'jest-styled-components'
import { renderWithReduxAndTheme, screen } from 'testUtils'
import { storeFactory } from 'setupTests'
import userEvent from '@testing-library/user-event'

import ChooseState from 'pages/ConsortiumBuilding/Creation/ChooseState'

import * as t from './types'

let portalRoot = document.getElementById('root')

if (!portalRoot) {
  portalRoot = document.createElement('div')
  portalRoot.setAttribute('id', 'root')
  document.body.appendChild(portalRoot)
}

const defaultStore: t.IDefaultStore = {
  consortiumBuildingStates: {
    data: {
      uf: [
        {
          sigla: 'AC',
          nome: 'ACRE',
        },
        {
          sigla: 'AL',
          nome: 'ALAGOAS',
        },
        {
          sigla: 'AP',
          nome: 'AMAPA',
        },
        {
          sigla: 'AM',
          nome: 'AMAZONAS',
        },
        {
          sigla: 'BA',
          nome: 'BAHIA',
        },
        {
          sigla: 'CE',
          nome: 'CEARA',
        },
        {
          sigla: 'DF',
          nome: 'DISTRITO FEDERAL',
        },
        {
          sigla: 'ES',
          nome: 'ESPIRITO SANTO',
        },
        {
          sigla: 'GO',
          nome: 'GOIAS',
        },
        {
          sigla: 'MA',
          nome: 'MARANHAO',
        },
        {
          sigla: 'MT',
          nome: 'MATO GROSSO',
        },
        {
          sigla: 'MS',
          nome: 'MATO GROSSO DO SUL',
        },
        {
          sigla: 'MG',
          nome: 'MINAS GERAIS',
        },
        {
          sigla: 'PA',
          nome: 'PARA',
        },
        {
          sigla: 'PB',
          nome: 'PARAIBA',
        },
        {
          sigla: 'PR',
          nome: 'PARANA',
        },
        {
          sigla: 'PE',
          nome: 'PERNAMBUCO',
        },
        {
          sigla: 'PI',
          nome: 'PIAUI',
        },
        {
          sigla: 'RJ',
          nome: 'RIO DE JANEIRO',
        },
        {
          sigla: 'RN',
          nome: 'RIO GRANDE DO NORTE',
        },
        {
          sigla: 'RS',
          nome: 'RIO GRANDE DO SUL',
        },
        {
          sigla: 'RO',
          nome: 'RONDONIA',
        },
        {
          sigla: 'RR',
          nome: 'RORAIMA',
        },
        {
          sigla: 'SP',
          nome: 'S?O PAULO',
        },
        {
          sigla: 'SC',
          nome: 'SANTA CATARINA',
        },
        {
          sigla: 'SE',
          nome: 'SERGIPE',
        },
        {
          sigla: 'TO',
          nome: 'TOCANTINS',
        },
      ],
    },
    isLoading: false,
    hasError: false,
  },
}

const setup = (initialState: t.IDefaultStore) => {
  const store = storeFactory(initialState)
  return renderWithReduxAndTheme(<ChooseState />, {
    store,
  })
}

describe('ChooseState component', () => {
  it('should exists', () => {
    expect(ChooseState).toBeDefined()
  })

  it('should render correctly', () => {
    const { getByText, getAllByPlaceholderText } = renderWithReduxAndTheme(
      <ChooseState />
    )
    const introText = getByText('Em qual estado você reside?')
    const destinationCountryValue = getAllByPlaceholderText('Selecione')
    const button = getByText('Próximo')

    expect(introText).toBeVisible()
    expect(destinationCountryValue).toHaveLength(1)
    expect(button).toBeVisible()
  })

  it('should render select', () => {
    setup(defaultStore)

    const destinationSelect = screen.getByTestId('select-')

    userEvent.click(destinationSelect)

    const option = screen.getByTestId('option-TOCANTINS')

    userEvent.click(option)

    expect(option).toBeVisible()
  })
})
