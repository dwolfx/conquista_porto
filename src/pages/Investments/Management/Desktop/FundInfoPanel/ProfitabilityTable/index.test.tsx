import React from 'react'
import { render } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import theme from 'styles/theme'

import ProfitabilityTable from '.'

const ProfitabilityMock = {
  hist_rentabil_benchmark: {
    rentabil_Ano: '1.02',
    rentabil_24_meses: '12.14',
    rentabil_12_meses: '5.45',
    rentabil_36_meses: '21.57',
    rentabil_dia: '0.01',
    rentabil_mes_anteiror: '0.29',
    benchmark: {
      nome: 'CDI',
      id: '1',
    },
    rentabil_mes: '0.34',
  },
  hist_rentabil_fundo: {
    rel_fundo_benchmark_mes_ant: '-',
    rentabil_ano: '-3.01',
    rentabil_12_meses: '6.53',
    rentabil_36_meses: '25.29',
    rel_fundo_benchmark_mes: '-',
    rel_fundo_benchmark_dia: '-',
    rentabil_mes_anteiror: '-0.71',
    rel_fundo_benchmark_24_meses: '105.04',
    rel_fundo_benchmark_ano: '-',
    rentabil_24_meses: '12.75',
    rel_fundo_benchmark_36_meses: '117.24',
    id_carteira: '5112',
    rentabil_dia: '-0.02',
    rentabil_mes: '-2.95',
    rel_fundo_benchmark_12_meses: '119.78',
  },
  data_referencia: '2020-03-23T00:00:00-03:00',
}

const setup = (children: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{children}</ThemeProvider>)
}

describe('ProfitabilityTable', () => {
  test('With Props', () => {
    const { getByText } = setup(
      <ProfitabilityTable profitability={ProfitabilityMock} />
    )
    expect(getByText('1,02%')).toBeDefined()
    expect(getByText('-3,01%')).toBeDefined()
  })

  test('Without Props', () => {
    const { queryByText } = setup(<ProfitabilityTable />)

    expect(queryByText('1,02%')).toBe(null)
    expect(queryByText('-3,01%')).toBe(null)
  })
})
