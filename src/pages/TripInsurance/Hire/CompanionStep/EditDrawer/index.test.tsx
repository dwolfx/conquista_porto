import React from 'react'
import { HashRouter } from 'react-router-dom'
import { renderWithReduxAndTheme, screen } from 'testUtils'
import { IMainPassenger } from 'pages/TripInsurance/Creation/types'

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
    const companion = [
      {
        id: 1,
        nome: 'Nome Teste',
        status: true,
        documentNumber: '',
        birthdayDate: new Date(),
        gender: { id: 0, name: '' },
        isBrazilianResident: false,
        hasPoliticallyExposedPerson: false,
        isSameContactForEmergencyData: true,
      },
    ]
    const handleClose = jest.fn()
    const mainPassenger: IMainPassenger = {
      nome: 'Nome Passageiro Principal',
      email: 'email@principal.com',
      dataNascimento: '20/12/1980',
      sexo: 'M',
      numeroCpf: '000000001',
      digitoCpf: '91',
      isResidePais: true,
      celularDDD: '11',
      celularNumero: '965543221',
      contato: {
        nome: 'Contato Do Passageiro Principal',
        celularDDD: '11',
        celularNumero: '932216554',
      },
      endereco: {
        tipo: 'Rua',
        logradouro: 'Rua Augusta',
        bairro: 'Penha',
        cidade: 'São Paulo',
        uf: 'SP',
        complemento: '',
        numero: '123A',
        numeroCep: '01419',
        complementoCep: '001',
      },
    }

    renderWithReduxAndTheme(
      <HashRouter>
        <EditDrawer
          handleClose={handleClose}
          companions={companion}
          isDrawerOpen={true}
          selectedCompanion={1}
          companionAge={70}
          mainPassenger={mainPassenger}
        />
      </HashRouter>,
      { container: createRootContainer() }
    )
    expect(screen.getByText(companion[0].nome)).toBeVisible()
    const nameInput = screen.getByText('Nome Completo')
    const cpfInput = screen.getByText('CPF')
    const birthdayDateInput = screen.getByText('Data de nascimento')
    const sexInput = screen.getByText('Sexo')
    const brazilianResidentQuestion = screen.getByText('Você reside no Brasil?')
    const politicallyExposedPersonQuestion = screen.getByText(
      'Pessoa politicamente exposta'
    )
    const emergencyContactQuestion = screen.getByText('Dados para emergência')
    expect(nameInput).toBeVisible()
    expect(cpfInput).toBeVisible()
    expect(birthdayDateInput).toBeVisible()
    expect(sexInput).toBeVisible()
    expect(brazilianResidentQuestion).toBeVisible()
    expect(emergencyContactQuestion).toBeVisible()
    expect(politicallyExposedPersonQuestion).toBeVisible()
  })
})
