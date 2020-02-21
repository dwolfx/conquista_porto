import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { ThemeContext } from 'styled-components'

import ButtonLink from 'components/Button/Link'
import Icon from 'components/IconExporter'

import HistoricalRentabilityTable from './HistoricalRentabilityTable'
import TransactionsSection from './TransactionsSection'
import WrapperDetailsContent from './WrapperDetailsContent'
import Taxation from './Taxation'

import {
  Container,
  FundsDetailsSection,
  Notification,
  RiskDegree,
  RiskDegreeTitle,
  SubTitle,
  WrapperDetails,
  DownloadSection,
  DownloadItem,
  DownloadIconWrapper,
  DownloadTitle,
} from './styles'

export default function FundsInfo({ fund }) {
  const themeContext = useContext(ThemeContext)

  if (Object.entries(fund).length === 0) {
    return <></>
  }

  const riscoEnum = {
    baixo: 1,
    'medio-baixo': 2,
    medio: 3,
    'medio-alto': 4,
    alto: 5,
  }

  return (
    <Container>
      <SubTitle>{fund.apelido}</SubTitle>
      <RiskDegreeTitle>Perfil de Risco</RiskDegreeTitle>
      <RiskDegree actives={[riscoEnum[fund.perfil_risco]]} />
      <HistoricalRentabilityTable data={fund.comparativo_hist_rentabil} />
      <TransactionsSection title="Movimentações" articles={fund} />
      <FundsDetailsSection>
        <WrapperDetails>
          <WrapperDetailsContent title="Detalhes do Fundo" fundsDetail={fund} />
          <DownloadSection>
            <DownloadItem>
              <DownloadIconWrapper>
                <Icon
                  name="pdf"
                  fill={themeContext.colors.gray6}
                  height="24px"
                />
              </DownloadIconWrapper>
              <div>
                <DownloadTitle>Informativo de desempenho</DownloadTitle>
                <ButtonLink
                  data-gtm-type="click"
                  data-gtm-clicktype="link"
                  data-gtm-subname="informativo de desempenho"
                  data-gtm-name="baixar arquivo"
                  target="_blank"
                  href={fund.link_infor_desempenho}
                >
                  Baixar arquivo
                </ButtonLink>
              </div>
            </DownloadItem>
            <DownloadItem>
              <DownloadIconWrapper>
                <Icon
                  name="pdf"
                  fill={themeContext.colors.gray6}
                  height="24px"
                />
              </DownloadIconWrapper>
              <div>
                <DownloadTitle>Informativo de desempenho</DownloadTitle>
                <ButtonLink
                  data-gtm-type="click"
                  data-gtm-clicktype="link"
                  data-gtm-subname="informativo de desempenho"
                  data-gtm-name="baixar arquivo"
                  target="_blank"
                  href={fund.link_infor_desempenho}
                >
                  Baixar arquivo
                </ButtonLink>
              </div>
            </DownloadItem>
          </DownloadSection>
        </WrapperDetails>
        <Taxation title="Tributação (IR)" taxationData={fund} />
      </FundsDetailsSection>
      <Notification>
        HAVERÁ INCIDÊNCIA DE IOF REGRESSIVO CASO OCORRAM RESGATES ANTES DE 30
        DIAS CORRIDOS DA DATA DA APLICAÇÃO.
      </Notification>
    </Container>
  )
}

FundsInfo.defaultProps = {
  fund: {},
}

FundsInfo.propTypes = {
  fund: PropTypes.object,
}
