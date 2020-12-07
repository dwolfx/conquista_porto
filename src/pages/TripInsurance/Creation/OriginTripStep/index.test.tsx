import React from 'react'

import 'jest-styled-components'

import { renderWithReduxAndTheme } from 'testUtils'
import OriginTripStep from 'pages/TripInsurance/Creation/OriginTripStep'

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

  // it('should has a specifc text', () => {
  //   const { getByTestId } = render(
  //     <ThemeProvider theme={theme}>
  //       <OriginTripStep />
  //     </ThemeProvider>
  //   )
  //   const text = getByTestId('introText')

  //   expect(text).toHaveTextContent(
  //     'Confirme a origem e o destino da sua viagem'
  //   )
  // })

  // it('should capture event', () => {
  //   const { getByTestId } = render(
  //     <ThemeProvider theme={theme}>
  //       <OriginTripStep />
  //     </ThemeProvider>
  //   )
  //   const destinationSelect = getByTestId('select-DESTINO')

  //   userEvent.click(destinationSelect)

  //   const option = getByTestId('option-Brasil')
  //   expect(option).toBeVisible();

  // })

  // it('should correct handle option click', () => {
  //   const { getByTestId } = render(
  //     <ThemeProvider theme={theme}>
  //       <OriginTripStep />
  //     </ThemeProvider>
  //   )
  //   const destinationSelect = getByTestId('select-DESTINO')
  //   const selectInput = getByTestId('select-option-input-inputId')
  //   userEvent.click(destinationSelect)

  //   const option = getByTestId('option-Brasil')
  //   userEvent.click(option)

  //   expect(selectInput).toHaveValue('Brasil')
  // })
})
