import React from 'react'

import Text from 'components/Text'

import { formatNumber } from 'helpers'

import {
  TablesContainer,
  FixedTable,
  ContentTable,
  Thead,
  Tr,
  Td,
  Th,
} from './styles'

interface IProfitability {
  profitability: {
    name: string
    value: {
      [index: number]: number
    }
  }[]
}

export default function DesktopView({ profitability }: IProfitability) {
  const tableFirstRow = profitability[0]
  const tableSecondRow = profitability[1]
  const tableThirdRow = profitability[2]

  const printFieldText = (text: string) => text || '---'
  const printFieldValueWithPercent = (value: number | undefined) =>
    value !== undefined ? `${formatNumber(value)}%` : '---'

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
                {printFieldText(tableSecondRow.name) === 'CDI'
                  ? `% ${printFieldText(tableSecondRow.name)}`
                  : printFieldText(tableSecondRow.name)}
              </Text>
            </Th>
          </Tr>
          <Tr>
            <Th>
              <Text color="gray6" type="subheading">
                {tableThirdRow.name === 'CDI' ? 'VARIAÇÃO' : 'VARIAÇÃO (P.P.)'}
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
                {printFieldValueWithPercent(tableFirstRow.value[1])}
              </Text>
            </Td>
            <Td>
              <Text bold type="body" color="gray5">
                {printFieldValueWithPercent(tableFirstRow.value[2])}
              </Text>
            </Td>
            <Td>
              <Text bold type="body" color="gray5">
                {printFieldValueWithPercent(tableFirstRow.value[3])}
              </Text>
            </Td>
            <Td>
              <Text bold type="body" color="gray5">
                {printFieldValueWithPercent(tableFirstRow.value[4])}
              </Text>
            </Td>
            <Td>
              <Text bold type="body" color="gray5">
                {printFieldValueWithPercent(tableFirstRow.value[5])}
              </Text>
            </Td>
          </Tr>
          <Tr>
            <Th>
              <Text color="gray6" type="subheading">
                {printFieldText(tableSecondRow.name) === 'CDI'
                  ? `% ${printFieldText(tableSecondRow.name)}`
                  : printFieldText(tableSecondRow.name)}
              </Text>
            </Th>
            <Td>
              <Text bold type="body" color="gray5">
                {printFieldValueWithPercent(tableSecondRow.value[1])}
              </Text>
            </Td>
            <Td>
              <Text bold type="body" color="gray5">
                {printFieldValueWithPercent(tableSecondRow.value[2])}
              </Text>
            </Td>
            <Td>
              <Text bold type="body" color="gray5">
                {printFieldValueWithPercent(tableSecondRow.value[3])}
              </Text>
            </Td>
            <Td>
              <Text bold type="body" color="gray5">
                {printFieldValueWithPercent(tableSecondRow.value[4])}
              </Text>
            </Td>
            <Td>
              <Text bold type="body" color="gray5">
                {printFieldValueWithPercent(tableSecondRow.value[5])}
              </Text>
            </Td>
          </Tr>
          <Tr>
            <Th>
              <Text color="gray6" type="subheading">
                {tableThirdRow.name === 'CDI' ? 'Variação' : 'Variação (P.P.)'}
              </Text>
            </Th>
            <Td>
              <Text bold type="body" color="gray5">
                {printFieldValueWithPercent(tableThirdRow.value[1])}
              </Text>
            </Td>
            <Td>
              <Text bold type="body" color="gray5">
                {printFieldValueWithPercent(tableThirdRow.value[2])}
              </Text>
            </Td>
            <Td>
              <Text bold type="body" color="gray5">
                {printFieldValueWithPercent(tableThirdRow.value[3])}
              </Text>
            </Td>
            <Td>
              <Text bold type="body" color="gray5">
                {printFieldValueWithPercent(tableThirdRow.value[4])}
              </Text>
            </Td>
            <Td>
              <Text bold type="body" color="gray5">
                {printFieldValueWithPercent(tableThirdRow.value[5])}
              </Text>
            </Td>
          </Tr>
        </tbody>
      </ContentTable>
    </TablesContainer>
  )
}
