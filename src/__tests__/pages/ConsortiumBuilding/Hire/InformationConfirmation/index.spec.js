import React from 'react'
import renderer, { act } from 'react-test-renderer'

import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import createStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import consortiumBuildingCivilStatusMock from 'mocks/consortiumBuildingCivilStatus.json'
import consortiumBuildingStatesMock from 'mocks/consortiumBuildingStates.json'
import consortiumBuildingFatcaMock from 'mocks/consortiumBuildingFatca.json'
import consortiumBuildingCountriesMock from 'mocks/consortiumBuildingCountries.json'
import consortiumBuildingJobsMock from 'mocks/consortiumBuildingJobs.json'
import theme from 'styles/theme'

import InformationConfirmation from 'pages/ConsortiumBuilding/Hire/InformationConfirmation'

const INITIAL_STATE = {
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
  civilStatusConsortiumBuilding: {
    data: consortiumBuildingCivilStatusMock,
    isLoading: false,
    hasError: false,
  },
  consortiumBuildingStates: {
    data: consortiumBuildingStatesMock,
    isLoading: false,
    hasError: false,
  },
  countriesConsortiumBuilding: {
    data: consortiumBuildingCountriesMock,
    isLoading: false,
    hasError: false,
  },
  fatcaConsortiumBuilding: {
    data: consortiumBuildingFatcaMock,
    isLoading: false,
    hasError: false,
  },
  jobsConsortiumBuilding: {
    data: consortiumBuildingJobsMock,
    isLoading: false,
    hasError: false,
  },
  fluxManagement: { stack: [], form: {} },
}
const mockStore = createStore([])
const store = mockStore(INITIAL_STATE)

it('InformationConfirmation - Consortium Building - renders correctly', () => {
  let root

  act(() => {
    root = renderer.create(
      <Provider store={store}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <InformationConfirmation />
          </ThemeProvider>
        </BrowserRouter>
      </Provider>
    )
  })

  expect(root.toJSON()).toMatchSnapshot()
})
