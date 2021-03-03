import React from 'react'
import { renderWithReduxAndTheme, screen } from 'testUtils'
import { storeFactory } from 'setupTests'
import ProposalSummary from '.'
import userEvent from '@testing-library/user-event'

describe('ProposalSummary component tests', () => {
  it('should exists', () => {
    expect(ProposalSummary).toBeDefined()
  })
  it('should render loading state', () => {
    const loadingStore = {
      fluxManagement: {
        stack: [],
        form: {},
      },
      tripInsuranceCreditCard: {
        data: {},
        hasError: false,
        isLoading: true,
      },
    }
    const store = storeFactory(loadingStore)
    renderWithReduxAndTheme(<ProposalSummary />, { store })

    expect(
      screen.getByText('Aguarde, estamos buscando suas informações...')
    ).toBeDefined()
  })
  it('should render error state', () => {
    const errorStore = {
      fluxManagement: {
        stack: [],
        form: {},
      },
      tripInsuranceCreditCard: {
        data: null,
        hasError: true,
        isLoading: false,
      },
    }
    const store = storeFactory(errorStore)
    renderWithReduxAndTheme(<ProposalSummary />, { store })

    expect(
      screen.getByText(
        'Desculpe, não foi possível carregar as informações. Aguarde alguns instantes e tente novamente.'
      )
    ).toBeDefined()
  })
  it('should trigger try again button', () => {
    const errorStore = {
      fluxManagement: {
        stack: [],
        form: {
          dataIda: '22/02/2022',
          dataVolta: '22/03/2022',
          nationalDestination: true,
          paisesAdicionais: [
            {
              id: '1',
              descricao: 'Japão',
            },
            {
              id: '2',
              descricao: 'Argentina',
            },
          ],
          qtdPassagMenorSetentaAnos: 2,
          qtdPassagMaiorSetentaAnos: 2,
        },
      },
      tripInsuranceCreditCard: {
        data: null,
        hasError: true,
        isLoading: false,
      },
    }
    const store = storeFactory(errorStore)
    renderWithReduxAndTheme(<ProposalSummary />, { store })

    expect(
      screen.getByText(
        'Desculpe, não foi possível carregar as informações. Aguarde alguns instantes e tente novamente.'
      )
    ).toBeDefined()

    const button = screen.getByRole('button', { name: 'TENTAR NOVAMENTE' })
    userEvent.click(button)

    expect(
      screen.getByText('Aguarde, estamos buscando suas informações...')
    ).toBeDefined()
  })
})
