import React from 'react'
import 'styled-components/macro'
import { Row } from 'styled-bootstrap-grid'

import Icon from 'components/IconExporter'
import Text from 'components/Text'
import Divisor from 'components/Divisor'
import ButtonLink from 'components/Button/Link'
import VerticalList from 'components/VerticalList'

import { formatNumber } from 'helpers'

import { ColStyled, InfoContent, HorizontalList } from './styles'

interface IFund {
  fund: {
    initial_date: string
    manager: string
    benchmark: string
    pl?: number
    adm_tax: number
    performance_rate: number
    url_performance_info_pdf: string
    url_fund_rules_pdf: string
  }
}

export default function TabMoreInfo({ fund }: IFund) {
  return (
    <InfoContent>
      <div>
        <HorizontalList
          noPadding
          startItems={[
            <Icon name="information" width="21px" />,
            <Text color="gray6" type="subheading" bold>
              MAIS INFORMAÇÕES
            </Text>,
          ]}
        />
        <Row justifyContent="between">
          <ColStyled xs={12} sm={6} md={3}>
            <VerticalList
              elements={[
                <Text type="captionUppercase" color="gray4">
                  DATA DE INÍCIO
                </Text>,
                <Text type="headline" color="gray6" bold>
                  {fund.initial_date}
                </Text>,
              ]}
            />
          </ColStyled>
          <ColStyled xs={12} sm={6} md={3}>
            <VerticalList
              elements={[
                <Text type="captionUppercase" color="gray4">
                  gestor
                </Text>,
                <Text type="headline" color="gray6" bold>
                  {fund.manager ? fund.manager : '-'}
                </Text>,
              ]}
            />
          </ColStyled>

          <ColStyled xs={12} sm={6} md={3}>
            <VerticalList
              elements={[
                <Text type="captionUppercase" color="gray4">
                  benchmark
                </Text>,
                <Text type="headline" color="gray6" bold>
                  {fund.benchmark}
                </Text>,
              ]}
            />
          </ColStyled>
          {fund.pl && (
            <VerticalList
              elements={[
                <Text type="captionUppercase" color="gray4">
                  pl atual
                </Text>,
                <Text type="headline" color="gray6" bold>
                  {fund.pl}
                </Text>,
              ]}
            />
          )}
          <ColStyled xs={12} sm={6} md={3}>
            <VerticalList
              elements={[
                <Text type="captionUppercase" color="gray4">
                  taxa de administração
                </Text>,
                <Text type="headline" color="gray6" bold>
                  {formatNumber(fund.adm_tax)}% a.a
                </Text>,
              ]}
            />
          </ColStyled>
          <ColStyled lg={12}>
            <VerticalList
              elements={[
                <Text type="captionUppercase" color="gray4">
                  taxa de performance
                </Text>,
                <Text type="headline" color="gray6" bold>
                  {fund.performance_rate === 0
                    ? 'Não há cobrança de performance'
                    : `${formatNumber(
                        fund.performance_rate
                      )}% sobre o que exceder o benchmark`}
                </Text>,
              ]}
            />
          </ColStyled>
        </Row>
      </div>
      <Divisor
        css={`
          margin: 7px 0 21px 0;
        `}
      />
      <div>
        <HorizontalList
          noPadding
          startItems={[
            <Icon name="download" width="21px" />,
            <Text color="gray6" type="subheading" bold>
              ARQUIVOS
            </Text>,
          ]}
        />
        <Row
          css={`
            margin: 7px 0;
          `}
        >
          <ColStyled xs={12} sm={5} md={5}>
            <VerticalList
              elements={[
                <Text color="gray5">Informativo de desempenho</Text>,
                <ButtonLink
                  data-gtm-type="click"
                  data-gtm-clicktype="link"
                  data-gtm-subname="informativo de desempenho"
                  data-gtm-name="baixar arquivo"
                  target="_blank"
                  href={fund.url_performance_info_pdf}
                >
                  Baixar arquivo
                </ButtonLink>,
              ]}
            />
          </ColStyled>
          <ColStyled xs={12} sm={5} md={5}>
            <VerticalList
              elements={[
                <Text color="gray5">Regulamento do Fundo</Text>,
                <ButtonLink
                  data-gtm-type="click"
                  data-gtm-clicktype="link"
                  data-gtm-subname="regulamento do fundo"
                  data-gtm-name="baixar arquivo"
                  target="_blank"
                  href={fund.url_fund_rules_pdf}
                >
                  Baixar arquivo
                </ButtonLink>,
              ]}
            />
          </ColStyled>
        </Row>
      </div>
    </InfoContent>
  )
}
