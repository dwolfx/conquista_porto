import React from 'react'
import renderer from 'react-test-renderer'
import { ThemeProvider } from 'styled-components'
import theme from 'styles/theme'

import FundsInfo from '../../../../../components/Solutions/Investments/FundsInfo'

const INITIAL_STATE = {
  data_inicio: '2009-12-29T00:00:00-03:00',
  taxa_performance: '20.00',
  apelido: 'Polo Macro FIM',
  nome_carteira: 'POLO MACRO FI MULTIMERCADO',
  contagem_dias_resgate: 'Corridos',
  minimo_inicial: '5000.0',
  link_regulamento:
    'https://www.portoseguro.com.br/NovoInstitucional/static_files/documents/para-mim/investimentos/fundos-de-terceiros/Regulamentos/REGULAMENTO_POLOMACROFIM.pdf',
  perfil_risco: 'alto',
  resgate_cotizacao: 'D+30',
  hora_resgate: '23:53',
  link_lamina:
    'https://www.portoseguro.com.br/NovoInstitucional/static_files/documents/para-mim/investimentos/fundos-de-terceiros/Informativos-de-Desempenho/INFORMATIVODESEMPENHO_POLOMACROFIM.pdf',
  link_infor_desempenho:
    'https://www.portoseguro.com.br/NovoInstitucional/static_files/documents/para-mim/investimentos/fundos-de-terceiros/Informativos-de-Desempenho/INFORMATIVODESEMPENHO_POLOMACROFIM.pdf',
  benchmark: { nome: 'CDI', id: '1' },
  comparativo_hist_rentabil: {
    hist_rentabil_benchmark: {
      rentabil_Ano: '4.67',
      rentabil_24_meses: '13.35',
      rentabil_12_meses: '6.28',
      rentabil_36_meses: '26.45',
      rentabil_dia: '0.02',
      rentabil_mes_anteiror: '0.50',
      benchmark: { nome: 'CDI', id: '1' },
      rentabil_mes: '0.47',
    },
    hist_rentabil_fundo: {
      rel_fundo_benchmark_mes_ant: '-',
      rentabil_ano: '7.81',
      rentabil_12_meses: '16.80',
      rentabil_36_meses: '48.49',
      rel_fundo_benchmark_mes: '263.94',
      rel_fundo_benchmark_dia: '1122.03',
      rentabil_mes_anteiror: '-3.78',
      rel_fundo_benchmark_24_meses: '180.12',
      rel_fundo_benchmark_ano: '167.41',
      rentabil_24_meses: '24.05',
      rel_fundo_benchmark_36_meses: '183.33',
      id_fundo: '51380064',
      rentabil_dia: '0.23',
      rentabil_mes: '1.23',
      rel_fundo_benchmark_12_meses: '267.64',
    },
    data_referencia: '2019-09-26T00:00:00-03:00',
  },
  resgate_financeiro: 'D+1',
  hora_aplicacao: '23:53',
  link_termo_adesao:
    'https://www.portoseguro.com.br/NovoInstitucional/static_files/documents/para-mim/investimentos/fundos-de-terceiros/Termos/TERMODECIENCIADERISCO_POLOMACROFIM.pdf',
  aliquotas_ir: {
    aliquota: [
      { valor: '22.5', faixa: 'Até 180 dias' },
      { valor: '20', faixa: 'De 181 dias a 360 dias' },
      { valor: '17.5', faixa: 'De 361 dias a 720 dias' },
      { valor: '15', faixa: 'Acima de 720 dias' },
    ],
  },
  taxa_administracao: '2.00',
  id_fundo: '51380064',
  regime_iof: 'Regime Regressivo',
  classificacao: 'Longo Prazo',
  aplicao_minima: '5000.0',
  aplicacao_financeiro: 'D+0',
}

it('FundsInfo renders correctly', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={theme}>
        <FundsInfo fund={INITIAL_STATE} />
      </ThemeProvider>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
