import React from 'react'
import { HashRouter } from 'react-router-dom'
import { renderWithReduxAndTheme, screen } from 'testUtils'
import { fireEvent } from '@testing-library/react'

import EditDrawer from './index'

const createRootContainer = () => {
  let portalRoot = document.getElementById('root')
  if (!portalRoot) {
    portalRoot = document.createElement('div')
    portalRoot.setAttribute('id', 'root')
    document.body.appendChild(portalRoot)
  }
  return portalRoot
}

describe('Edit Objective Drawer Component', () => {
  it('should render Edit Drawer title and inputs', async () => {
    renderWithReduxAndTheme(
      <HashRouter>
        <EditDrawer />
      </HashRouter>,
      { container: createRootContainer() }
    )

    const menuElement = screen.getByText('Alterar dados')
    const originInput = screen.getByText('Origem')
    const countryInput = screen.getByText('Você irá para qual(is) país(es)')
    const destinationInput = screen.getByText('Destino')
    const dateInput = screen.getByText('Periodo da Viagem')
    const passengersBelowSeventyYearsInput = screen.getByText(
      'Passageiros até 70 anos'
    )
    const passengersAboveSeventyYearsInput = screen.getByText(
      'Passageiros de 71 até 90 anos'
    )
    const adventureSportsInput = screen.getByText('Esportes de aventura')
    const motocicleQuestionInput = screen.getByText('Motocicleta')
    expect(menuElement).toBeVisible()
    expect(originInput).toBeVisible()
    expect(countryInput).toBeVisible()
    expect(destinationInput).toBeVisible()
    expect(dateInput).toBeVisible()
    expect(passengersBelowSeventyYearsInput).toBeVisible()
    expect(passengersAboveSeventyYearsInput).toBeVisible()
    expect(adventureSportsInput).toBeVisible()
    expect(motocicleQuestionInput).toBeVisible()
  })
})
