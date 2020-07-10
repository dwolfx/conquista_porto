import React from 'react'

import Text from 'components/Text'

import { formatNumber } from 'helpers'

import { IHistRentabilBenchmark, IHistRentabilFundo } from '../../../types'

import {
  TablesContainer,
  FixedTable,
  ContentTable,
  Thead,
  Tr,
  Td,
  Th,
} from './styles'

interface IProps {
  histRentabilBenchmark: IHistRentabilBenchmark
  histRentabilFundo: IHistRentabilFundo
}
export default function Desktop({
  histRentabilBenchmark,
  histRentabilFundo,
}: IProps) {
  const printFieldText = (text: string) => text || '---'
  const printFieldTextWithPercent = (text: string) =>
    text && text !== '-' ? `${formatNumber(text)}%` : '---'
  return (
    <TablesContainer>
      <FixedTable>
        <Thead>
          <Tr>
            <Th>&nbsp;</Th>
          </Tr>
        </Thead>
        <tbody>
          <Tr>
            <Th>
              <Text color="gray6" type="subheading">
                FUNDO
              </Text>
            </Th>
          </Tr>
          <Tr>
            <Th>
              <Text color="gray6" type="subheading">
                {printFieldText(histRentabilBenchmark.benchmark.nome) === 'CDI'
                  ? `% ${printFieldText(histRentabilBenchmark.benchmark.nome)}`
                  : printFieldText(histRentabilBenchmark.benchmark.nome)}
              </Text>
            </Th>
          </Tr>
          <Tr>
            <Th>
              <Text color="gray6" type="subheading">
                {histRentabilBenchmark.benchmark.nome === 'CDI'
                  ? 'VARIAÇÃO'
                  : 'VARIAÇÃO (P.P.)'}
              </Text>
            </Th>
          </Tr>
        </tbody>
      </FixedTable>
      <ContentTable>
        <Thead>
          <Tr>
            <Th>&nbsp;</Th>
            <Th>
              <Text color="gray6" type="subheading">
                MÊS ANT.
              </Text>
            </Th>
            <Th>
              <Text color="gray6" type="subheading">
                ANO
              </Text>
            </Th>
            <Th>
              <Text color="gray6" type="subheading">
                ÚLT. 12M
              </Text>
            </Th>
            <Th>
              <Text color="gray6" type="subheading">
                ÚLT. 24M
              </Text>
            </Th>
            <Th>
              <Text color="gray6" type="subheading">
                ÚLT. 36M
              </Text>
            </Th>
          </Tr>
        </Thead>
        <tbody>
          <Tr>
            <Th>
              <Text color="gray6" bold type="subheading">
                FUNDO
              </Text>
            </Th>
            <Td>
              <Text bold type="body" color="gray5">
                {printFieldTextWithPercent(
                  histRentabilFundo.rentabil_mes_anteiror
                )}
              </Text>
            </Td>
            <Td>
              <Text bold type="body" color="gray5">
                {printFieldTextWithPercent(histRentabilFundo.rentabil_ano)}
              </Text>
            </Td>
            <Td>
              <Text bold type="body" color="gray5">
                {printFieldTextWithPercent(histRentabilFundo.rentabil_12_meses)}
              </Text>
            </Td>
            <Td>
              <Text bold type="body" color="gray5">
                {printFieldTextWithPercent(histRentabilFundo.rentabil_24_meses)}
              </Text>
            </Td>
            <Td>
              <Text bold type="body" color="gray5">
                {printFieldTextWithPercent(histRentabilFundo.rentabil_36_meses)}
              </Text>
            </Td>
          </Tr>
          <Tr>
            <Th>
              <Text color="gray6" type="subheading">
                {printFieldText(histRentabilBenchmark.benchmark.nome) === 'CDI'
                  ? `% ${printFieldText(histRentabilBenchmark.benchmark.nome)}`
                  : printFieldText(histRentabilBenchmark.benchmark.nome)}
              </Text>
            </Th>
            <Td>
              <Text bold type="body" color="gray5">
                {printFieldTextWithPercent(
                  histRentabilBenchmark.rentabil_mes_anteiror
                )}
              </Text>
            </Td>
            <Td>
              <Text bold type="body" color="gray5">
                {printFieldTextWithPercent(histRentabilBenchmark.rentabil_Ano)}
              </Text>
            </Td>
            <Td>
              <Text bold type="body" color="gray5">
                {printFieldTextWithPercent(
                  histRentabilBenchmark.rentabil_12_meses
                )}
              </Text>
            </Td>
            <Td>
              <Text bold type="body" color="gray5">
                {printFieldTextWithPercent(
                  histRentabilBenchmark.rentabil_24_meses
                )}
              </Text>
            </Td>
            <Td>
              <Text bold type="body" color="gray5">
                {printFieldTextWithPercent(
                  histRentabilBenchmark.rentabil_36_meses
                )}
              </Text>
            </Td>
          </Tr>
          <Tr>
            <Th>
              <Text color="gray6" type="subheading">
                {histRentabilBenchmark.benchmark.nome === 'CDI'
                  ? 'Variação'
                  : 'Variação (P.P.)'}
              </Text>
            </Th>
            <Td>
              <Text bold type="body" color="gray5">
                {printFieldTextWithPercent(
                  histRentabilFundo.rel_fundo_benchmark_mes_anteiror
                )}
              </Text>
            </Td>
            <Td>
              <Text bold type="body" color="gray5">
                {printFieldTextWithPercent(
                  histRentabilFundo.rel_fundo_benchmark_ano
                )}
              </Text>
            </Td>
            <Td>
              <Text bold type="body" color="gray5">
                {printFieldTextWithPercent(
                  histRentabilFundo.rel_fundo_benchmark_12_meses
                )}
              </Text>
            </Td>
            <Td>
              <Text bold type="body" color="gray5">
                {printFieldTextWithPercent(
                  histRentabilFundo.rel_fundo_benchmark_24_meses
                )}
              </Text>
            </Td>
            <Td>
              <Text bold type="body" color="gray5">
                {printFieldTextWithPercent(
                  histRentabilFundo.rel_fundo_benchmark_36_meses
                )}
              </Text>
            </Td>
          </Tr>
        </tbody>
      </ContentTable>
    </TablesContainer>
  )
}
