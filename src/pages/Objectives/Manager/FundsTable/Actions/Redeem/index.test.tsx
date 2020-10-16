import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import { TObjectiveFunds } from 'store/modules/ObjectiveManagement/types'
import { renderWithReduxAndTheme, screen, waitFor } from 'testUtils'

import RedeemDrawer from './index'
import UnlinkContent from './UnlinkContent'
import TransferContent from './TransferContent'

const fundMock: TObjectiveFunds = {
  adm_tax: 0.4,
  anbima_category: '',
  arena_category: 'Renda Fixa',
  available: 84057.06,
  balance: 86558.46,
  benchmark: 'CDI',
  classification: 'Longo Prazo',
  financial_apply_days: 'D+0',
  financial_rescue_days: 'D+0 (Úteis)',
  fund_id: 5105,
  fund_wallet_type: 'RECOMMENDED',
  goals: [{ id: 626, name: 'PVEV-772', value: 1000.7, goal_type: 'TRAVEL' }],
  initial_date: '27/02/2014',
  initial_value: 10300.23,
  invested: 1500.7,
  is_fund_active: true,
  min_balance_value: 1000,
  min_initial_value: 1000,
  min_value_to_apply: 100,
  monthly_value: 1100.77,
  name: 'Porto Seguro FI Referenciado DI Credito Privado',
  nickname: 'Porto Seguro FI RF Ref. DI CP',
  order_profile_risk: 4,
  performance_rate: 0,
  profitability: [
    { name: 'fundo', value: { 1: 0.61, 2: 0.55, 3: 1.73, 4: 8.24, 5: 15.54 } },
  ],
  quotation_apply_days: 'D+0',
  quotation_rescue_days: 'D+0 (Úteis)',
  release_to_apply: true,
  release_to_rescue: true,
  time_limit_to_apply: '15:00',
  url_fund_rules_pdf:
    'https://www.portoseguro.com.br/NovoInstitucional/static_files/documents/para-mim/investimentos/DI/Regulamento_PS_Referenciado_DI_Credito_Privado.pdf',
  url_performance_info_pdf:
    'https://www.portoseguro.com.br/NovoInstitucional/static_files/documents/para-mim/investimentos/DI/InformativoDesempenho_PS_ReferenciadoDICreditoPrivado.pdf',
}

describe('Objective Manager Redeem Drawer', () => {
  // test case
  it('should render Unlink, Transfer and redeem options', () => {
    const handleClose = jest.fn()
    let portalRoot = document.getElementById('root')
    if (!portalRoot) {
      portalRoot = document.createElement('div')
      portalRoot.setAttribute('id', 'root')
      document.body.appendChild(portalRoot)
    }

    renderWithReduxAndTheme(
      <MemoryRouter>
        <RedeemDrawer isOpen handleClose={handleClose} fund={fundMock} />
      </MemoryRouter>,
      { container: portalRoot }
    )

    expect(
      screen.queryByText(
        'Se você quer desvincular uma quantia do seu objetivo sem tirá-la do fundo, escolha esta opção.'
      )
    ).toBeDefined()
    expect(
      screen.queryByRole('button', { name: 'Desvincular do objetivo' })
    ).toBeDefined()
    expect(
      screen.queryByText(
        'Se você quer transferir uma quantia deste objetivo para outro, escolha esta opção.'
      )
    ).toBeDefined()
    expect(
      screen.queryByRole('button', { name: 'Transferir de objetivo' })
    ).toBeDefined()
    expect(
      screen.queryByText(
        'Se você quer resgatar uma quantia do fundo para a sua conta, escolha esta opção.'
      )
    ).toBeDefined()
    expect(
      screen.queryByRole('button', { name: 'Resgatar do fundo' })
    ).toBeDefined()
  })

  // test case
  it('should render contents when action button is clicked', async () => {
    const handleClose = jest.fn()
    let portalRoot = document.getElementById('root')
    if (!portalRoot) {
      portalRoot = document.createElement('div')
      portalRoot.setAttribute('id', 'root')
      document.body.appendChild(portalRoot)
    }

    renderWithReduxAndTheme(
      <MemoryRouter>
        <RedeemDrawer isOpen handleClose={handleClose} fund={fundMock} />
      </MemoryRouter>,
      { container: portalRoot }
    )

    const unlinkButton = screen.getByRole('button', {
      name: 'Desvincular do objetivo',
    })

    expect(unlinkButton).toBeDefined()
    expect(
      screen.queryByText('Quanto você deseja desvincular deste objetivo?')
    ).toBeNull()
    expect(unlinkButton).toBeDefined()
    userEvent.click(unlinkButton)
    expect(
      screen.getByText('Quanto você deseja desvincular deste objetivo?')
    ).toBeDefined()

    userEvent.click(screen.getByText(/arrow-left.svg/g))

    const transferButton = screen.getByRole('button', {
      name: 'Transferir de objetivo',
    })
    expect(
      screen.queryByText('Para qual objetivo você deseja transferir?')
    ).toBeNull()
    expect(transferButton).toBeDefined()
    userEvent.click(transferButton)
    expect(
      screen.getByText('Para qual objetivo você deseja transferir?')
    ).toBeDefined()

    userEvent.click(screen.getByText(/arrow-left.svg/g))

    const redeemButton = screen.getByRole('button', {
      name: 'Resgatar do fundo',
    })
    expect(
      screen.queryByText(
        'Por favor, aponte, abaixo, o motivo pelo qual deseja resgatar valores deste fundo:'
      )
    ).toBeNull()
    expect(redeemButton).toBeDefined()

    expect(screen.queryAllByText(/spinner.svg/g)[0]).toBeDefined()
    await waitFor(() =>
      expect(
        screen.queryAllByText(
          'Por favor, aponte, abaixo, o motivo pelo qual deseja resgatar valores deste fundo:'
        )
      ).toBeDefined()
    )
  })
})
