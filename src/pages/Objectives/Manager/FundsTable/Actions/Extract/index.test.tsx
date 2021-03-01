import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { TObjectiveFunds } from 'store/modules/ObjectiveManagement/types'
import { renderWithReduxAndTheme, screen } from 'testUtils'

import ExtractLayer from './index'

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
  min_value_to_invest: 100,
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

describe('Objective Manager Extract Layer', () => {
  it('should render extract layer option', () => {
    const handleClose = jest.fn()
    let portalRoot = document.getElementById('root')
    if (!portalRoot) {
      portalRoot = document.createElement('div')
      portalRoot.setAttribute('id', 'root')
      document.body.appendChild(portalRoot)
    }
    renderWithReduxAndTheme(
      <MemoryRouter>
        <ExtractLayer isOpen handleClose={handleClose} fund={fundMock} />,
      </MemoryRouter>,
      { container: portalRoot }
    )
    expect(screen.queryByText('Disponível no fundo')).toBeDefined()
    expect(screen.queryByText('R$ 1.500,70')).toBeDefined()
    expect(screen.queryByText('Inv. inicial')).toBeDefined()
    expect(screen.queryByText('R$ 10.300,23')).toBeDefined()
  })
})
