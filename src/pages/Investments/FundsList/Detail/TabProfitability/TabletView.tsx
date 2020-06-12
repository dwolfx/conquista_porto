import React from 'react'

import Text from 'components/Text'
import { Row, Col } from 'styled-bootstrap-grid'
import VerticalList from 'components/VerticalList'
import Divisor from 'components/Divisor'

import { ColStyled, RowTitle } from './styles'
import { formatNumber } from 'helpers'

import { IProps } from './interfaces'

export default function TabletView({
  histRentabilBenchmark,
  histRentabilFundo,
}: IProps) {
  const printFieldText = (text: string) => text || '---'
  const printFieldTextWithPercent = (text: string) =>
    text && text !== '-' ? `${formatNumber(text)}%` : '---'

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
                {printFieldTextWithPercent(
                  histRentabilFundo.rentabil_mes_anteiror
                )}
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
                {printFieldTextWithPercent(histRentabilFundo.rentabil_ano)}
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
                {printFieldTextWithPercent(histRentabilFundo.rentabil_12_meses)}
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
                {printFieldTextWithPercent(histRentabilFundo.rentabil_24_meses)}
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
                {printFieldTextWithPercent(histRentabilFundo.rentabil_36_meses)}
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
            {printFieldText(histRentabilBenchmark.benchmark.nome) === 'CDI'
              ? `% ${printFieldText(histRentabilBenchmark.benchmark.nome)}`
              : printFieldText(histRentabilBenchmark.benchmark.nome)}
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
                {printFieldTextWithPercent(
                  histRentabilBenchmark.rentabil_mes_anteiror
                )}
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
                {printFieldTextWithPercent(histRentabilBenchmark.rentabil_Ano)}
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
                {printFieldTextWithPercent(
                  histRentabilBenchmark.rentabil_12_meses
                )}
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
                {printFieldTextWithPercent(
                  histRentabilBenchmark.rentabil_24_meses
                )}
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
                {printFieldTextWithPercent(
                  histRentabilBenchmark.rentabil_36_meses
                )}
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
            {histRentabilBenchmark.benchmark.nome === 'CDI'
              ? 'Variação'
              : 'Variação (P.P.)'}
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
                {printFieldTextWithPercent(
                  histRentabilFundo.rel_fundo_benchmark_mes_anteiror
                )}
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
                {printFieldTextWithPercent(
                  histRentabilFundo.rel_fundo_benchmark_ano
                )}
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
                {printFieldTextWithPercent(
                  histRentabilFundo.rel_fundo_benchmark_12_meses
                )}
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
                {printFieldTextWithPercent(
                  histRentabilFundo.rel_fundo_benchmark_24_meses
                )}
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
                {printFieldTextWithPercent(
                  histRentabilFundo.rel_fundo_benchmark_36_meses
                )}
              </Text>,
            ]}
          />
        </ColStyled>
      </Row>
    </>
  )
}
