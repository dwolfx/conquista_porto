import React from 'react'
import 'jest-styled-components'
import { renderWithReduxAndTheme, screen } from 'testUtils'
import { storeFactory } from 'setupTests'
import userEvent from '@testing-library/user-event'

import OriginTripStep from 'pages/TripInsurance/Creation/OriginTripStep'

import * as t from './types'

const defaultStore: t.IDefaultStore = {
  destinationCountries: {
    data: {
      Message: {
        TipoCritica: 'SUCESSO',
        Mensagem: 'SUCESSO',
      },
      ViagemPais: {
        destinos: [
          {
            text: 'AFEGANISTAO',
            id: 1,
            value: 'Afeganistao',
          },
          {
            text: 'AFRICA DO SUL',
            id: 2,
            value: 'Africa do sul',
          },
          {
            text: 'BRASIL',
            id: 3,
            value: 'Brasil',
          },
        ],
      },
    },
    isLoading: false,
    hasError: false,
  },
}

const setup = (initialState: t.IDefaultStore) => {
  const store = storeFactory(initialState)
  return renderWithReduxAndTheme(<OriginTripStep />, {
    store,
  })
}

describe('OriginTripStep component', () => {
  it('should exists', () => {
    expect(OriginTripStep).toBeDefined()
  })

  it('should render correctly', () => {
    const {
      getByText,
      getByRole,
      getAllByPlaceholderText,
      getByDisplayValue,
    } = renderWithReduxAndTheme(<OriginTripStep />)
    const stepDescription = getByText(
      'Aqui você não precisa informar as escalas do seu trajeto, apenas o destino final. Se sua viagem tiver mais de um destino, adicione ao mesmo campo para incluí-los.'
    )
    const introText = getByText('Confirme a origem e o destino da sua viagem')
    const originCountryLabel = getByText('origem')
    const originCountryValue = getByDisplayValue('Brasil')
    const destinationCountryLabel = getByText('origem')
    const destinationCountryValue = getAllByPlaceholderText('Selecione')
    const button = getByRole('button')

    expect(stepDescription).toBeVisible()
    expect(introText).toBeVisible()
    expect(originCountryLabel).toBeVisible()
    expect(originCountryValue).toBeVisible()
    expect(destinationCountryLabel).toBeVisible()
    expect(destinationCountryValue).toHaveLength(2)
    expect(button).toBeVisible()
  })

  it('should has a specifc text', () => {
    renderWithReduxAndTheme(<OriginTripStep />)

    expect(
      screen.getByText(/confirme a origem e o destino da sua viagem/i)
    ).toBeDefined()
  })

  it('should render multiselector', () => {
    setup(defaultStore)

    const destinationSelect = screen.getByTestId('select-Destino')

    userEvent.click(destinationSelect)

    const option = screen.getByTestId('option-Internacional')

    userEvent.click(option)

    expect(option).toBeVisible()

    const multiselector = screen.getByTestId('você irá para qual(is) país(es)?')

    expect(multiselector).toBeVisible()

    userEvent.click(multiselector)

    const optionBrasil = screen.getByText(/brasil/i)

    expect(optionBrasil).toBeVisible()
  })
})
