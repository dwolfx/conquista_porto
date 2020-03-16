import React from 'react'
import PropTypes from 'prop-types'

import {
  Container,
  Title,
  TableWrapper,
  Table,
  TBody,
  THead,
  Tr,
  Th,
  Td,
} from './styles'

export default function HistoricalRentabilityTable({ data }) {
  const tableHead = [
    {
      name: 'Mês Anterior',
    },
    {
      name: 'Ano',
    },
    {
      name: 'Últ 12m',
    },
    {
      name: 'Últ 24m',
    },
    {
      name: 'Últ 36m',
    },
  ]

  const printFieldText = text => text || '---'

  const histRentabilBenchmark = data.hist_rentabil_benchmark
  const histRentabilFundo = data.hist_rentabil_fundo
  return (
    <Container>
      <Title>Rentabilidade Histórica</Title>
      <TableWrapper>
        <Table>
          <THead>
            <Tr>
              <Th></Th>
              {tableHead.map((cell, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <Th key={`${index}-${cell.name}`}>{cell.name}</Th>
              ))}
            </Tr>
          </THead>
          <TBody>
            <Tr>
              <Td>Fundo (%)</Td>
              <Td>{printFieldText(histRentabilFundo.rentabil_mes_anteiror)}</Td>
              <Td>{printFieldText(histRentabilFundo.rentabil_ano)}</Td>
              <Td>{printFieldText(histRentabilFundo.rentabil_12_meses)}</Td>
              <Td>{printFieldText(histRentabilFundo.rentabil_24_meses)}</Td>
              <Td>{printFieldText(histRentabilFundo.rentabil_36_meses)}</Td>
            </Tr>
            <Tr>
              <Td>
                {printFieldText(histRentabilBenchmark.benchmark.nome)} (%)
              </Td>
              <Td>
                {printFieldText(histRentabilBenchmark.rentabil_mes_anteiror)}
              </Td>
              <Td>{printFieldText(histRentabilBenchmark.rentabil_Ano)}</Td>
              <Td>{printFieldText(histRentabilBenchmark.rentabil_12_meses)}</Td>
              <Td>{printFieldText(histRentabilBenchmark.rentabil_24_meses)}</Td>
              <Td>{printFieldText(histRentabilBenchmark.rentabil_36_meses)}</Td>
            </Tr>
            <Tr>
              <Td>
                {histRentabilBenchmark.benchmark.nome === 'CDI'
                  ? 'Variação'
                  : 'Variação (P.P.)'}
              </Td>
              <Td>
                {printFieldText(
                  histRentabilFundo.rel_fundo_benchmark_mes_anteiror
                )}
              </Td>
              <Td>
                {printFieldText(histRentabilFundo.rel_fundo_benchmark_ano)}
              </Td>
              <Td>
                {printFieldText(histRentabilFundo.rel_fundo_benchmark_12_meses)}
              </Td>
              <Td>
                {printFieldText(histRentabilFundo.rel_fundo_benchmark_24_meses)}
              </Td>
              <Td>
                {printFieldText(histRentabilFundo.rel_fundo_benchmark_36_meses)}
              </Td>
            </Tr>
          </TBody>
        </Table>
      </TableWrapper>
    </Container>
  )
}

HistoricalRentabilityTable.defaultProps = {
  data: {
    hist_rentabil_benchmark: {
      benchmark: {
        nome: '---',
      },
      rentabil_mes_anteiror: '---',
      rentabil_Ano: '---',
      rentabil_12_meses: '---',
      rentabil_24_meses: '---',
      rentabil_36_meses: '---',
    },
    hist_rentabil_fundo: {
      rel_fundo_benchmark_mes_anteiror: '---',
      rel_fundo_benchmark_ano: '---',
      rel_fundo_benchmark_12_meses: '---',
      rel_fundo_benchmark_24_meses: '---',
      rel_fundo_benchmark_36_meses: '---',
      rentabil_mes_anteiror: '---',
      rentabil_ano: '---',
      rentabil_12_meses: '---',
      rentabil_24_meses: '---',
      rentabil_36_meses: '---',
    },
  },
}

HistoricalRentabilityTable.propTypes = {
  data: PropTypes.shape({
    hist_rentabil_benchmark: PropTypes.shape({
      benchmark: PropTypes.shape({
        nome: PropTypes.string,
      }),
      rentabil_mes_anteiror: PropTypes.string,
      rentabil_Ano: PropTypes.string,
      rentabil_12_meses: PropTypes.string,
      rentabil_24_meses: PropTypes.string,
      rentabil_36_meses: PropTypes.string,
    }),
    hist_rentabil_fundo: PropTypes.shape({
      rel_fundo_benchmark_mes_anteiror: PropTypes.string,
      rel_fundo_benchmark_ano: PropTypes.string,
      rel_fundo_benchmark_12_meses: PropTypes.string,
      rel_fundo_benchmark_24_meses: PropTypes.string,
      rel_fundo_benchmark_36_meses: PropTypes.string,
      rentabil_mes_anteiror: PropTypes.string,
      rentabil_ano: PropTypes.string,
      rentabil_12_meses: PropTypes.string,
      rentabil_24_meses: PropTypes.string,
      rentabil_36_meses: PropTypes.string,
    }),
  }),
}
