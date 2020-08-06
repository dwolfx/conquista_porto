import React from 'react'

import Text from 'components/Text'
import { printFieldText } from 'helpers'
import { TableGridContent, Cell, CellHeader } from './styles'

interface IProfitabilityTableProps {
  profitability?: {
    hist_rentabil_benchmark: {
      rentabil_Ano: string
      rentabil_24_meses: string
      rentabil_12_meses: string
      rentabil_36_meses: string
      rentabil_dia: string
      rentabil_mes_anteiror: string
      benchmark: {
        nome: string
        id: string
      }
      rentabil_mes: string
    }
    hist_rentabil_fundo: {
      rel_fundo_benchmark_mes_ant: string
      rentabil_ano: string
      rentabil_12_meses: string
      rentabil_36_meses: string
      rel_fundo_benchmark_mes_anteiror: string
      rel_fundo_benchmark_mes: string
      rel_fundo_benchmark_dia: string
      rentabil_mes_anteiror: string
      rel_fundo_benchmark_24_meses: string
      rel_fundo_benchmark_ano: string
      rentabil_24_meses: string
      rel_fundo_benchmark_36_meses: string
      id_carteira: string
      rentabil_dia: string
      rentabil_mes: string
      rel_fundo_benchmark_12_meses: string
    }
    data_referencia: string
  }
}

const ProfitabilityTable: React.FC<IProfitabilityTableProps> = ({
  profitability,
}) => (
  <TableGridContent>
      <CellHeader alignLeft borderBottom>
        <Text type="subheading" color="gray6">
          HISTÓRICO DE RENTABILIDADE
        </Text>
      </CellHeader>
      <CellHeader borderBottom>
        <Text type="subheading" color="gray6">
          MÊS ANTERIOR
        </Text>
      </CellHeader>
      <CellHeader borderBottom>
        <Text type="subheading" color="gray6">
          ANO
        </Text>
      </CellHeader>
      <CellHeader borderBottom>
        <Text type="subheading" color="gray6">
          ÚLT. 12M
        </Text>
      </CellHeader>
      <CellHeader borderBottom>
        <Text type="subheading" color="gray6">
          24M
        </Text>
      </CellHeader>
      <CellHeader borderBottom>
        <Text type="subheading" color="gray6">
          36M
        </Text>
      </CellHeader>
      <Cell alignLeft borderBottom>
        <Text bold type="body" color="gray5">
          Fundo (%)
        </Text>
      </Cell>
      <Cell borderBottom>
        <Text type="subheading" color="gray6">
          {profitability &&
            printFieldText(
              profitability.hist_rentabil_fundo.rentabil_mes_anteiror
            )}
        </Text>
      </Cell>
      <Cell borderLeft borderBottom>
        <Text type="subheading" color="gray6">
          {profitability &&
            printFieldText(profitability.hist_rentabil_fundo.rentabil_ano)}
        </Text>
      </Cell>
      <Cell borderLeft borderBottom>
        <Text type="subheading" color="gray6">
          {profitability &&
            printFieldText(profitability.hist_rentabil_fundo.rentabil_12_meses)}
        </Text>
      </Cell>
      <Cell borderLeft borderBottom>
        <Text type="subheading" color="gray6">
          {profitability &&
            printFieldText(profitability.hist_rentabil_fundo.rentabil_24_meses)}
        </Text>
      </Cell>
      <Cell borderLeft borderBottom>
        <Text type="subheading" color="gray6">
          {profitability &&
            printFieldText(profitability.hist_rentabil_fundo.rentabil_36_meses)}
        </Text>
      </Cell>

      <Cell alignLeft borderBottom>
        <Text bold type="body" color="gray5">
          {`${profitability &&
            printFieldText(
              profitability.hist_rentabil_benchmark.benchmark.nome
            )} (%)`}
        </Text>
      </Cell>
      <Cell borderBottom>
        <Text type="subheading" color="gray6">
          {profitability &&
            printFieldText(
              profitability.hist_rentabil_benchmark.rentabil_mes_anteiror
            )}
        </Text>
      </Cell>
      <Cell borderLeft borderBottom>
        <Text type="subheading" color="gray6">
          {profitability &&
            printFieldText(profitability.hist_rentabil_benchmark.rentabil_Ano)}
        </Text>
      </Cell>
      <Cell borderLeft borderBottom>
        <Text type="subheading" color="gray6">
          {profitability &&
            printFieldText(
              profitability.hist_rentabil_benchmark.rentabil_12_meses
            )}
        </Text>
      </Cell>
      <Cell borderLeft borderBottom>
        <Text type="subheading" color="gray6">
          {profitability &&
            printFieldText(
              profitability.hist_rentabil_benchmark.rentabil_24_meses
            )}
        </Text>
      </Cell>
      <Cell borderLeft borderBottom>
        <Text type="subheading" color="gray6">
          {profitability &&
            printFieldText(
              profitability.hist_rentabil_benchmark.rentabil_36_meses
            )}
        </Text>
      </Cell>

      <Cell alignLeft>
        <Text bold type="body" color="gray5">
          {profitability &&
          profitability.hist_rentabil_benchmark.benchmark.nome === 'CDI'
            ? 'Variação (%)'
            : 'Variação (p.p.)'}
        </Text>
      </Cell>
      <Cell>
        <Text type="subheading" color="gray6">
          {profitability &&
            printFieldText(
              profitability.hist_rentabil_fundo.rel_fundo_benchmark_mes_ant
            )}
        </Text>
      </Cell>
      <Cell borderLeft>
        <Text type="subheading" color="gray6">
          {profitability &&
            printFieldText(
              profitability.hist_rentabil_fundo.rel_fundo_benchmark_ano
            )}
        </Text>
      </Cell>
      <Cell borderLeft>
        <Text type="subheading" color="gray6">
          {profitability &&
            printFieldText(
              profitability.hist_rentabil_fundo.rel_fundo_benchmark_12_meses
            )}
        </Text>
      </Cell>
      <Cell borderLeft>
        <Text type="subheading" color="gray6">
          {profitability &&
            printFieldText(
              profitability.hist_rentabil_fundo.rel_fundo_benchmark_24_meses
            )}
        </Text>
      </Cell>
      <Cell borderLeft>
        <Text type="subheading" color="gray6">
          {profitability &&
            printFieldText(
              profitability.hist_rentabil_fundo.rel_fundo_benchmark_36_meses
            )}
        </Text>
      </Cell>
    </TableGridContent>
)

export default ProfitabilityTable
