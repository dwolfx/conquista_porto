import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import 'styled-components/macro'
import { Row } from 'styled-bootstrap-grid'

import Icon from 'components/IconExporter'
import Text from 'components/Text'
import Divisor from 'components/Divisor'
import ButtonLink from 'components/Button/Link'
import VerticalList from 'components/VerticalList'

import { formatNumber } from 'helpers'

import { ColStyled, InfoContent, HorizontalList } from './styles'

export default function TabMoreInfo({ fund, historicBenchmark }) {
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
                  {moment(fund.data_inicio).format('DD/MM/YYYY')}
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
                  {fund.nome_gestor ? fund.nome_gestor : '-'}
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
                  {historicBenchmark?.benchmark?.nome}
                </Text>,
              ]}
            />
          </ColStyled>
          {/* <VerticalList
          width="67%"
          elements={[
            <Text type="captionUppercase" color="gray4">
              pl atual
            </Text>,
            <Text type="headline" color="gray6" bold>
              {} ??? qual atributo devemos exibir
            </Text>,
          ]}
        /> */}
          <ColStyled xs={12} sm={6} md={3}>
            <VerticalList
              elements={[
                <Text type="captionUppercase" color="gray4">
                  taxa de administração
                </Text>,
                <Text type="headline" color="gray6" bold>
                  {formatNumber(fund.taxa_administracao)}% a.a
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
                  {Number(fund.taxa_performance) === 0
                    ? 'Não há cobrança de performance'
                    : `${formatNumber(
                        fund.taxa_performance
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
                  href={fund.link_infor_desempenho}
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
                  href={fund.link_regulamento}
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

TabMoreInfo.defaultProps = {
  historicBenchmark: {},
}

TabMoreInfo.propTypes = {
  fund: PropTypes.shape({
    data_inicio: PropTypes.number,
    nome_gestor: PropTypes.string,
    benchmark: PropTypes.shape({
      nome: PropTypes.string,
    }),
    taxa_administracao: PropTypes.number,
    taxa_performance: PropTypes.number,
    link_regulamento: PropTypes.string,
    link_infor_desempenho: PropTypes.string,
  }).isRequired,
  historicBenchmark: PropTypes.shape({}),
}

TabMoreInfo.defaultProps = {
  historicBenchmark: {},
}
