import React from 'react'

import Text from 'components/Text'
import { printFieldText } from 'helpers'

import {
  TablesContainer,
  FixedTable,
  ContentTable,
  Thead,
  Tr,
  Td,
  Th,
} from '../styles'

import { IProps } from '../'

export default function DesktopView({ profitability }: IProps) {
  const tableFirstRow = profitability[0]
  const tableSecondRow = profitability[1]
  const tableThirdRow = profitability[2]

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
                FUNDO (%)
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
                FUNDO (%)
              </Text>
            </Th>
            <Td>
              <Text bold type="body" color="gray5">
                {printFieldText(tableFirstRow?.value[1]?.toString())}
              </Text>
            </Td>
            <Td>
              <Text bold type="body" color="gray5">
                {printFieldText(tableFirstRow?.value[2]?.toString())}
              </Text>
            </Td>
            <Td>
              <Text bold type="body" color="gray5">
                {printFieldText(tableFirstRow?.value[3]?.toString())}
              </Text>
            </Td>
            <Td>
              <Text bold type="body" color="gray5">
                {printFieldText(tableFirstRow?.value[4]?.toString())}
              </Text>
            </Td>
            <Td>
              <Text bold type="body" color="gray5">
                {printFieldText(tableFirstRow?.value[5]?.toString())}
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
                {printFieldText(tableSecondRow?.value[1]?.toString())}
              </Text>
            </Td>
            <Td>
              <Text bold type="body" color="gray5">
                {printFieldText(tableSecondRow?.value[2]?.toString())}
              </Text>
            </Td>
            <Td>
              <Text bold type="body" color="gray5">
                {printFieldText(tableSecondRow?.value[3]?.toString())}
              </Text>
            </Td>
            <Td>
              <Text bold type="body" color="gray5">
                {printFieldText(tableSecondRow?.value[4]?.toString())}
              </Text>
            </Td>
            <Td>
              <Text bold type="body" color="gray5">
                {printFieldText(tableSecondRow?.value[5]?.toString())}
              </Text>
            </Td>
          </Tr>
          <Tr>
            <Th>
              <Text color="gray6" type="subheading">
                {tableThirdRow.name === 'CDI'
                  ? 'Variação (%)'
                  : 'Variação (p.p.)'}
              </Text>
            </Th>
            <Td>
              <Text bold type="body" color="gray5">
                {printFieldText(tableThirdRow?.value[1]?.toString())}
              </Text>
            </Td>
            <Td>
              <Text bold type="body" color="gray5">
                {printFieldText(tableThirdRow?.value[2]?.toString())}
              </Text>
            </Td>
            <Td>
              <Text bold type="body" color="gray5">
                {printFieldText(tableThirdRow?.value[3]?.toString())}
              </Text>
            </Td>
            <Td>
              <Text bold type="body" color="gray5">
                {printFieldText(tableThirdRow?.value[4]?.toString())}
              </Text>
            </Td>
            <Td>
              <Text bold type="body" color="gray5">
                {printFieldText(tableThirdRow?.value[5]?.toString())}
              </Text>
            </Td>
          </Tr>
        </tbody>
      </ContentTable>
    </TablesContainer>
  )
}
