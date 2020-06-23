import React from 'react'

import Text from 'components/Text'
import { Row, Col } from 'styled-bootstrap-grid'
import VerticalList from 'components/VerticalList'
import Divisor from 'components/Divisor'

import { ColStyled, RowTitle } from './styles'
import { formatNumber } from 'helpers'

interface IProfitability {
  profitability: {
    name: string
    value: {
      [index: number]: number
    }
  }[]
}

export default function TabletView({ profitability }: IProfitability) {
  const tableFirstRow = profitability[0]
  const tableSecondRow = profitability[1]
  const tableThirdRow = profitability[2]

  const printFieldText = (text: string) => text || '---'
  const printFieldValueWithPercent = (value: number | undefined) =>
    value !== undefined ? `${formatNumber(value)}%` : '---'

  return (
    <>
      <RowTitle>
        <Col xl={12}>
          <Text color="gray5" type="headline" bold>
            Fundo (%)
          </Text>
        </Col>
      </RowTitle>
      <Row justifyContent="between">
        <ColStyled col={6}>
          <VerticalList
            elements={[
              <Text type="captionUppercase" color="gray4">
                MÊS ANTERIOR
              </Text>,
              <Text type="headline" color="gray6" bold>
                {printFieldValueWithPercent(tableFirstRow.value[1])}
              </Text>,
            ]}
          />
        </ColStyled>
        <ColStyled col={6}>
          <VerticalList
            elements={[
              <Text type="captionUppercase" color="gray4">
                ANO
              </Text>,
              <Text type="headline" color="gray6" bold>
                {printFieldValueWithPercent(tableFirstRow.value[2])}
              </Text>,
            ]}
          />
        </ColStyled>
        <ColStyled col={6}>
          <VerticalList
            elements={[
              <Text type="captionUppercase" color="gray4">
                ÚLT. 12 MESES
              </Text>,
              <Text type="headline" color="gray6" bold>
                {printFieldValueWithPercent(tableFirstRow.value[3])}
              </Text>,
            ]}
          />
        </ColStyled>
        <ColStyled col={6}>
          <VerticalList
            elements={[
              <Text type="captionUppercase" color="gray4">
                ÚLT 24 MESES
              </Text>,
              <Text type="headline" color="gray6" bold>
                {printFieldValueWithPercent(tableFirstRow.value[4])}
              </Text>,
            ]}
          />
        </ColStyled>
        <ColStyled col={6}>
          <VerticalList
            elements={[
              <Text type="captionUppercase" color="gray4">
                ÚLT 36 MESES
              </Text>,
              <Text type="headline" color="gray6" bold>
                {printFieldValueWithPercent(tableFirstRow.value[5])}
              </Text>,
            ]}
          />
        </ColStyled>
      </Row>
      <Divisor
        css={`
          margin: 7px 0 21px 0;
        `}
      />
      <RowTitle>
        <Col xl={12}>
          <Text color="gray5" type="headline" bold>
            {printFieldText(tableSecondRow.name) === 'CDI'
              ? `% ${printFieldText(tableSecondRow.name)}`
              : printFieldText(tableSecondRow.name)}
          </Text>
        </Col>
      </RowTitle>
      <Row justifyContent="between">
        <ColStyled col={6}>
          <VerticalList
            elements={[
              <Text type="captionUppercase" color="gray4">
                MÊS ANTERIOR
              </Text>,
              <Text type="headline" color="gray6" bold>
                {printFieldValueWithPercent(tableSecondRow.value[1])}
              </Text>,
            ]}
          />
        </ColStyled>
        <ColStyled col={6}>
          <VerticalList
            elements={[
              <Text type="captionUppercase" color="gray4">
                ANO
              </Text>,
              <Text type="headline" color="gray6" bold>
                {printFieldValueWithPercent(tableSecondRow.value[2])}
              </Text>,
            ]}
          />
        </ColStyled>
        <ColStyled col={6}>
          <VerticalList
            elements={[
              <Text type="captionUppercase" color="gray4">
                ÚLT. 12 MESES
              </Text>,
              <Text type="headline" color="gray6" bold>
                {printFieldValueWithPercent(tableSecondRow.value[3])}
              </Text>,
            ]}
          />
        </ColStyled>
        <ColStyled col={6}>
          <VerticalList
            elements={[
              <Text type="captionUppercase" color="gray4">
                ÚLT 24 MESES
              </Text>,
              <Text type="headline" color="gray6" bold>
                {printFieldValueWithPercent(tableSecondRow.value[4])}
              </Text>,
            ]}
          />
        </ColStyled>
        <ColStyled col={6}>
          <VerticalList
            elements={[
              <Text type="captionUppercase" color="gray4">
                ÚLT 36 MESES
              </Text>,
              <Text type="headline" color="gray6" bold>
                {printFieldValueWithPercent(tableSecondRow.value[5])}
              </Text>,
            ]}
          />
        </ColStyled>
      </Row>
      <Divisor
        css={`
          margin: 7px 0 21px 0;
        `}
      />
      <RowTitle>
        <Col xl={12}>
          <Text color="gray5" type="headline" bold>
            {tableThirdRow.name === 'CDI' ? 'Variação' : 'Variação (P.P.)'}
          </Text>
        </Col>
      </RowTitle>
      <Row justifyContent="between">
        <ColStyled col={6}>
          <VerticalList
            elements={[
              <Text type="captionUppercase" color="gray4">
                MÊS ANTERIOR
              </Text>,
              <Text type="headline" color="gray6" bold>
                {printFieldValueWithPercent(tableThirdRow.value[1])}
              </Text>,
            ]}
          />
        </ColStyled>
        <ColStyled col={6}>
          <VerticalList
            elements={[
              <Text type="captionUppercase" color="gray4">
                ANO
              </Text>,
              <Text type="headline" color="gray6" bold>
                {printFieldValueWithPercent(tableThirdRow.value[2])}
              </Text>,
            ]}
          />
        </ColStyled>
        <ColStyled col={6}>
          <VerticalList
            elements={[
              <Text type="captionUppercase" color="gray4">
                ÚLT. 12 MESES
              </Text>,
              <Text type="headline" color="gray6" bold>
                {printFieldValueWithPercent(tableThirdRow.value[3])}
              </Text>,
            ]}
          />
        </ColStyled>
        <ColStyled col={6}>
          <VerticalList
            elements={[
              <Text type="captionUppercase" color="gray4">
                ÚLT 24 MESES
              </Text>,
              <Text type="headline" color="gray6" bold>
                {printFieldValueWithPercent(tableThirdRow.value[4])}
              </Text>,
            ]}
          />
        </ColStyled>
        <ColStyled col={6}>
          <VerticalList
            elements={[
              <Text type="captionUppercase" color="gray4">
                ÚLT 36 MESES
              </Text>,
              <Text type="headline" color="gray6" bold>
                {printFieldValueWithPercent(tableThirdRow.value[5])}
              </Text>,
            ]}
          />
        </ColStyled>
      </Row>
    </>
  )
}
