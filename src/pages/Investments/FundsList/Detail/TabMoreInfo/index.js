import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import 'styled-components/macro'
import { Row } from 'styled-bootstrap-grid'

import HorizontalList from 'components/HorizontalList'
import Text from 'components/Text'
import Divisor from 'components/Divisor'
import VerticalList from 'components/VerticalList'
import ButtonLink from 'components/Button/Link'

import { StyledIcon } from 'pages/Investments/FundsList/styles'

import {
  InformationContainer,
  VerticalListStyled,
  FileContainer,
} from './styles'

export default function TabMoreInfo({ fund }) {
  return (
    <div>
      <InformationContainer>
        <HorizontalList
          noPadding
          startItems={[
            <StyledIcon name="information" />,
            <Text color="gray6" type="subheading" bold>
              MAIS INFORMAÇÕES
            </Text>,
          ]}
        />
        <Row
          justifyContent="between"
          css={`
            margin: 14px 0;
          `}
        >
          <VerticalListStyled
            width="33%"
            elements={[
              <Text type="captionUppercase" color="gray4">
                DATA DE INÍCIO
              </Text>,
              <Text type="headline" color="gray6" bold>
                {moment(fund.data_inicio).format('DD/MM/YYYY')}
              </Text>,
            ]}
          />
          {/* <VerticalListStyled
          width="67%"
          elements={[
            <Text type="captionUppercase" color="gray4">
              gestor
            </Text>,
            <Text type="headline" color="gray6" bold>
              {} ??? qual atributo devemos exibir
            </Text>,
          ]}
        /> */}
          <VerticalListStyled
            width="33%"
            elements={[
              <Text type="captionUppercase" color="gray4">
                benchmark
              </Text>,
              <Text type="headline" color="gray6" bold>
                {fund.benchmark.nome}
              </Text>,
            ]}
          />
          {/* <VerticalListStyled
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
          <VerticalListStyled
            width="33%"
            elements={[
              <Text type="captionUppercase" color="gray4">
                taxa de administração
              </Text>,
              <Text type="headline" color="gray6" bold>
                {fund.taxa_administracao}% a.a
              </Text>,
            ]}
          />
          <VerticalListStyled
            width="100%"
            elements={[
              <Text type="captionUppercase" color="gray4">
                taxa de performance
              </Text>,
              <Text type="headline" color="gray6" bold>
                {Number(fund.taxa_performance) === 0
                  ? 'Não há cobrança de performance'
                  : `${fund.taxa_performance}% sobre o que exceder`}
              </Text>,
            ]}
          />
        </Row>
      </InformationContainer>
      <Divisor />
      <FileContainer>
        <HorizontalList
          noPadding
          startItems={[
            <StyledIcon name="download" />,
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
          <VerticalList
            css={`
              width: 230px;
            `}
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
          <VerticalList
            css={`
              width: 230px;
            `}
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
        </Row>
      </FileContainer>
    </div>
  )
}

TabMoreInfo.propTypes = {
  fund: PropTypes.shape({
    data_inicio: PropTypes.string,
    benchmark: PropTypes.shape({
      nome: PropTypes.string,
    }),
    taxa_administracao: PropTypes.string,
    taxa_performance: PropTypes.string,
    link_regulamento: PropTypes.string,
    link_infor_desempenho: PropTypes.string,
  }).isRequired,
}
