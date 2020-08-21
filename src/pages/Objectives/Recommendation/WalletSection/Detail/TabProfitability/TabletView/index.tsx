import React from 'react'
import { Row, Col } from 'styled-bootstrap-grid'

import Text from 'components/Text'
import VerticalList from 'components/VerticalList'
import Divisor from 'components/Divisor'

import { printFieldText } from 'helpers'
import { ColStyled, RowTitle } from '../styles'

import { IProps } from '../'

export default function TabletView({ profitability }: IProps) {
  return (
    <>
      <RowTitle>
        <Col xl={12}>
          <Text color="gray5" type="headline" bold>
            FUNDO (%)
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
                {printFieldText(profitability[0]?.value[1]?.toString())}
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
                {printFieldText(profitability[0]?.value[2]?.toString())}
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
                {printFieldText(profitability[0]?.value[3]?.toString())}
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
                {printFieldText(profitability[0]?.value[4]?.toString())}
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
                {printFieldText(profitability[0]?.value[5]?.toString())}
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
            {printFieldText(profitability[1]?.name) === 'CDI'
              ? `% ${printFieldText(profitability[1]?.name)}`
              : printFieldText(profitability[1]?.name)}
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
                {printFieldText(profitability[1]?.value[1]?.toString())}
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
                {printFieldText(profitability[1]?.value[2]?.toString())}
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
                {printFieldText(profitability[1]?.value[3]?.toString())}
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
                {printFieldText(profitability[1]?.value[4]?.toString())}
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
                {printFieldText(profitability[1]?.value[5]?.toString())}
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
            {profitability[2]?.name === 'CDI'
              ? 'Variação (%)'
              : 'Variação (p.p.)'}
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
                {printFieldText(profitability[2]?.value[1]?.toString())}
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
                {printFieldText(profitability[2]?.value[2]?.toString())}
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
                {printFieldText(profitability[2]?.value[3]?.toString())}
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
                {printFieldText(profitability[2]?.value[4]?.toString())}
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
                {printFieldText(profitability[2]?.value[5]?.toString())}
              </Text>,
            ]}
          />
        </ColStyled>
      </Row>
    </>
  )
}
