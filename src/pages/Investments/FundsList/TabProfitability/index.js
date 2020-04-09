import React from 'react'
import PropTypes from 'prop-types'

import Text from 'components/Text'

import HorizontalList from 'components/HorizontalList'
import { StyledIcon } from '../styles'
import {
  TablesContainer,
  FixedTable,
  ContentTable,
  Thead,
  Tr,
  Td,
  Th,
} from './styles'

export default function TabProfitability({ fund }) {
  const printFieldText = text => text || '---'

  const histRentabilBenchmark =
    fund.comparativo_hist_rentabil.hist_rentabil_benchmark
  const histRentabilFundo = fund.comparativo_hist_rentabil.hist_rentabil_fundo

  return (
    <div>
      <HorizontalList
        startItems={[
          <StyledIcon name="linechart" />,
          <Text color="gray6" type="subheading" bold>
            RENTABILIDADE HISTÓRICA
          </Text>,
        ]}
      />
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
                <Text color="gray6" bold type="subheading">
                  FUNDO
                </Text>
              </Th>
            </Tr>
            <Tr>
              <Th>
                <Text color="gray6" bold type="subheading">
                  {printFieldText(histRentabilBenchmark.benchmark.nome) ===
                  'CDI'
                    ? `% ${printFieldText(
                        histRentabilBenchmark.benchmark.nome
                      )}`
                    : printFieldText(histRentabilBenchmark.benchmark.nome)}
                </Text>
              </Th>
            </Tr>
            <Tr>
              <Th>
                <Text color="gray6" bold type="subheading">
                  {histRentabilBenchmark.benchmark.nome === 'CDI'
                    ? 'Variação'
                    : 'Variação (P.P.)'}
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
                <Text color="gray6" bold type="subheading">
                  MÊS ANT.
                </Text>
              </Th>
              <Th>
                <Text color="gray6" bold type="subheading">
                  ANO
                </Text>
              </Th>
              <Th>
                <Text color="gray6" bold type="subheading">
                  ÚLT. 12M
                </Text>
              </Th>
              <Th>
                <Text color="gray6" bold type="subheading">
                  ÚLT. 24M
                </Text>
              </Th>
              <Th>
                <Text color="gray6" bold type="subheading">
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
                  {printFieldText(histRentabilFundo.rentabil_mes_anteiror)}
                </Text>
              </Td>
              <Td>
                <Text bold type="body" color="gray5">
                  {printFieldText(histRentabilFundo.rentabil_ano)}
                </Text>
              </Td>
              <Td>
                <Text bold type="body" color="gray5">
                  {printFieldText(histRentabilFundo.rentabil_12_meses)}
                </Text>
              </Td>
              <Td>
                <Text bold type="body" color="gray5">
                  {printFieldText(histRentabilFundo.rentabil_24_meses)}
                </Text>
              </Td>
              <Td>
                <Text bold type="body" color="gray5">
                  {printFieldText(histRentabilFundo.rentabil_36_meses)}
                </Text>
              </Td>
            </Tr>
            <Tr>
              <Th>
                <Text color="gray6" bold type="subheading">
                  {printFieldText(histRentabilBenchmark.benchmark.nome) ===
                  'CDI'
                    ? `% ${printFieldText(
                        histRentabilBenchmark.benchmark.nome
                      )}`
                    : printFieldText(histRentabilBenchmark.benchmark.nome)}
                </Text>
              </Th>
              <Td>
                <Text bold type="body" color="gray5">
                  {histRentabilBenchmark.rentabil_mes_anteiror}
                </Text>
              </Td>
              <Td>
                <Text bold type="body" color="gray5">
                  {histRentabilBenchmark.rentabil_Ano}
                </Text>
              </Td>
              <Td>
                <Text bold type="body" color="gray5">
                  {histRentabilBenchmark.rentabil_12_meses}
                </Text>
              </Td>
              <Td>
                <Text bold type="body" color="gray5">
                  {histRentabilBenchmark.rentabil_24_meses}
                </Text>
              </Td>
              <Td>
                <Text bold type="body" color="gray5">
                  {histRentabilBenchmark.rentabil_36_meses}
                </Text>
              </Td>
            </Tr>
            <Tr>
              <Th>
                <Text color="gray6" bold type="subheading">
                  {histRentabilBenchmark.benchmark.nome === 'CDI'
                    ? 'Variação'
                    : 'Variação (P.P.)'}
                </Text>
              </Th>
              <Td>
                <Text bold type="body" color="gray5">
                  {printFieldText(
                    histRentabilFundo.rel_fundo_benchmark_mes_anteiror
                  )}
                </Text>
              </Td>
              <Td>
                <Text bold type="body" color="gray5">
                  {printFieldText(histRentabilFundo.rel_fundo_benchmark_ano)}
                </Text>
              </Td>
              <Td>
                <Text bold type="body" color="gray5">
                  {printFieldText(
                    histRentabilFundo.rel_fundo_benchmark_12_meses
                  )}
                </Text>
              </Td>
              <Td>
                <Text bold type="body" color="gray5">
                  {printFieldText(
                    histRentabilFundo.rel_fundo_benchmark_24_meses
                  )}
                </Text>
              </Td>
              <Td>
                <Text bold type="body" color="gray5">
                  {printFieldText(
                    histRentabilFundo.rel_fundo_benchmark_36_meses
                  )}
                </Text>
              </Td>
            </Tr>
          </tbody>
        </ContentTable>
      </TablesContainer>
    </div>
  )
}

TabProfitability.propTypes = {
  fund: PropTypes.shape({
    comparativo_hist_rentabil: PropTypes.shape({
      hist_rentabil_fundo: PropTypes.object.isRequired,
      hist_rentabil_benchmark: PropTypes.object.isRequired,
    }).isRequired,
  }).isRequired,
}
