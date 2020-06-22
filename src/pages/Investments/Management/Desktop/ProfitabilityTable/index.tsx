import React from 'react'

import Card from 'components/Card'
import Text from 'components/Text'
import { TableGridContent, Cell } from './styles'
import { formatNumber } from 'helpers'

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
}) => {
  const printFieldText = (text: string) => text || '---'
  const printFieldTextWithPercent = (text: string) =>
    text && text !== '-' ? `${formatNumber(text)}%` : '---'

  return (
    <TableGridContent>
      <Cell className="align-left header">
        <Text type="subheading" color="gray6">
          HISTÓRICO DE RENTABILIDADE
        </Text>
      </Cell>
      <Cell className="header">
        <Text type="subheading" color="gray6">
          MÊS ANTERIOR
        </Text>
      </Cell>
      <Cell className="header">
        <Text type="subheading" color="gray6">
          ANO
        </Text>
      </Cell>
      <Cell className="header">
        <Text type="subheading" color="gray6">
          ÚLT. 12M
        </Text>
      </Cell>
      <Cell className="header">
        <Text type="subheading" color="gray6">
          24M
        </Text>
      </Cell>
      <Cell className="header">
        <Text type="subheading" color="gray6">
          36M
        </Text>
      </Cell>
      <Cell className="align-left">
        <Text bold type="body" color="gray5">
          Rentabilidade em %*
        </Text>
      </Cell>
      <Cell>
        <Text type="subheading" color="gray6">
          {profitability &&
            printFieldTextWithPercent(
              profitability.hist_rentabil_fundo.rentabil_mes_anteiror
            )}
        </Text>
      </Cell>
      <Cell className="with-border">
        <Text type="subheading" color="gray6">
          {profitability &&
            printFieldTextWithPercent(
              profitability.hist_rentabil_fundo.rentabil_ano
            )}
        </Text>
      </Cell>
      <Cell className="with-border">
        <Text type="subheading" color="gray6">
          {profitability &&
            printFieldTextWithPercent(
              profitability.hist_rentabil_fundo.rentabil_12_meses
            )}
        </Text>
      </Cell>
      <Cell className="with-border">
        <Text type="subheading" color="gray6">
          {profitability &&
            printFieldTextWithPercent(
              profitability.hist_rentabil_fundo.rentabil_24_meses
            )}
        </Text>
      </Cell>
      <Cell className="with-border">
        <Text type="subheading" color="gray6">
          {profitability &&
            printFieldTextWithPercent(
              profitability.hist_rentabil_fundo.rentabil_36_meses
            )}
        </Text>
      </Cell>
      <Cell className="align-left">
        <Text bold type="body" color="gray5">
          ${`Referência em 
          ${profitability &&
            printFieldText(
              profitability.hist_rentabil_benchmark.benchmark.nome
            )}*`}
        </Text>
      </Cell>
      <Cell>
        <Text type="subheading" color="gray6">
          {profitability &&
            printFieldTextWithPercent(
              profitability.hist_rentabil_benchmark.rentabil_mes_anteiror
            )}
        </Text>
      </Cell>
      <Cell className="with-border">
        <Text type="subheading" color="gray6">
          {profitability &&
            printFieldTextWithPercent(
              profitability.hist_rentabil_benchmark.rentabil_Ano
            )}
        </Text>
      </Cell>
      <Cell className="with-border">
        <Text type="subheading" color="gray6">
          {profitability &&
            printFieldTextWithPercent(
              profitability.hist_rentabil_benchmark.rentabil_12_meses
            )}
        </Text>
      </Cell>
      <Cell className="with-border">
        <Text type="subheading" color="gray6">
          {profitability &&
            printFieldTextWithPercent(
              profitability.hist_rentabil_benchmark.rentabil_24_meses
            )}
        </Text>
      </Cell>
      <Cell className="with-border">
        <Text type="subheading" color="gray6">
          {profitability &&
            printFieldTextWithPercent(
              profitability.hist_rentabil_benchmark.rentabil_36_meses
            )}
        </Text>
      </Cell>
    </TableGridContent>
  )
}

export default ProfitabilityTable
