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

// const fundsDetail = {
//   value1: '00.000.000/0000-00',
//   value2: '00/00/0000',
//   value3: 'Lorem ipsum',
//   value4: 'CDI',
//   value5: 'R$ 0,00',
//   value6: '0,50% a.a.',
//   value7: 'R$ 0,00',
//   value8: '20% sobre o que exceder',
// }

const tableBenchmarkHead = [
  {
    name: 'Mês Anterior',
  },
  {
    name: 'Ano',
  },
  {
    name: 'Últ 12m',
  },
  {
    name: 'Últ 24m',
  },
  {
    name: 'Últ 36m',
  },
]

export default function FundsInfo({ fund }) {
  const themeContext = useContext(ThemeContext)

  console.log(fund)
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

  const tableBenchmarkRow = [
    {
      name: 'Fundo (%)',
      cell1:
        fund.comparativo_hist_rentabil.hist_rentabil_fundo
          .rentabil_mes_anteiror,
      cell2: fund.comparativo_hist_rentabil.hist_rentabil_fundo.rentabil_ano,
      cell3:
        fund.comparativo_hist_rentabil.hist_rentabil_fundo.rentabil_12_meses,
      cell4:
        fund.comparativo_hist_rentabil.hist_rentabil_fundo.rentabil_24_meses,
      cell5:
        fund.comparativo_hist_rentabil.hist_rentabil_fundo.rentabil_36_meses,
    },
  ]

  return (
    <Container>
      <SubTitle>{fund.apelido}</SubTitle>
      <RiskDegreeTitle>Perfil de Risco</RiskDegreeTitle>
      <RiskDegree actives={[riscoEnum[fund.perfil_risco]]} />
      <HistoricalRentabilityTable
        tableHead={tableBenchmarkHead}
        tableRow={tableBenchmarkRow}
      />
      <TransactionsSection
        title={`Movimentações (Até ${fund.hora_resgate})`}
        articles={fund}
      />
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
                <ButtonLink target="_blank" href={fund.link_infor_desempenho}>
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
                <ButtonLink target="_blank" href={fund.link_infor_desempenho}>
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
