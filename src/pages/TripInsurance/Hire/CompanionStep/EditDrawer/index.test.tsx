import React from 'react'
import { HashRouter } from 'react-router-dom'
import { renderWithReduxAndTheme, screen } from 'testUtils'

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
    const companion = {
      name: 'Nome Teste',
      status: false,
      documentNumber: '',
      birthdayDate: new Date(),
      gender: { id: 0, name: '' },
      isBrazilianResident: false,
      hasPoliticallyExposedPerson: false,
      isSameContactForEmergencyData: true,
    }
    const handleClose = jest.fn()

    renderWithReduxAndTheme(
      <HashRouter>
        <EditDrawer handleClose={handleClose} companion={companion} />
      </HashRouter>,
      { container: createRootContainer() }
    )

    const menuElement = screen.getByText(companion.name)
    const nameInput = screen.getByText('Nome Completo')
    const cpfInput = screen.getByText('CPF')
    const birthdayDateInput = screen.getByText('Data de nascimento')
    const sexInput = screen.getByText('Sexo')
    const brazilianResidentQuestion = screen.getByText('Você reside no Brasil?')
    const politicallyExposedPersonQuestion = screen.getByText(
      'Pessoa politicamente exposta'
    )
    const emergencyContactQuestion = screen.getByText('Dados para emergência')
    expect(menuElement).toBeVisible()
    expect(nameInput).toBeVisible()
    expect(cpfInput).toBeVisible()
    expect(birthdayDateInput).toBeVisible()
    expect(sexInput).toBeVisible()
    expect(brazilianResidentQuestion).toBeVisible()
    expect(politicallyExposedPersonQuestion).toBeVisible()
    expect(emergencyContactQuestion).toBeVisible()
  })
})
