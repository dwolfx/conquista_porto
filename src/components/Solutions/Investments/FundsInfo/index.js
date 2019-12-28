import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { ThemeContext } from 'styled-components'

import HistoricalRentabilityTable from './HistoricalRentabilityTable'
import TransactionsSection from './TransactionsSection'
import WrapperDetailsContent from './WrapperDetailsContent'
import Taxation from './Taxation'
import FileDownloadSection from '../../FileDownloadSection'

import {
  Container,
  FundsDetailsSection,
  Notification,
  RiskDegree,
  RiskDegreeTitle,
  SubTitle,
  WrapperDetails,
} from './styles'

const articles = {
  value1: 'R$ 20.000,00',
  value2: 'R$ 20.000,00',
  value3: 'R$ 20.000,00',
  value4: 'R$ 20.000,00',
  value5: 'D+0 úteis',
  value6: 'D+0 úteis',
  value7: 'D+0 úteis',
  value8: 'D+0 úteis',
}

const downloadFileSectionData = [
  {
    title: 'Informativo de Desempenho',
    buttonText: 'Baixar Arquivo',
  },
  {
    title: 'Regulamento do fundo',
    buttonText: 'Baixar Arquivo',
  },
]

const fundsDetail = {
  value1: '00.000.000/0000-00',
  value2: '00/00/0000',
  value3: 'Lorem ipsum',
  value4: 'CDI',
  value5: 'R$ 0,00',
  value6: '0,50% a.a.',
  value7: 'R$ 0,00',
  value8: '20% sobre o que exceder',
}

const taxationData = {
  value1: 'Longo Prazo',
  value2: '22,5%',
  value3: '20%',
  value4: '17,5%',
  value5: '15%',
  value6: 'Regime Regressivo',
}

const tableHead = [
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

const tableRow = [
  {
    name: 'Fundo (%)',
    cell1: '0,94',
    cell2: '8,39',
    cell3: '14,25',
    cell4: '22,94',
    cell5: '39,22',
  },
  {
    name: 'ima-b 5 (%)',
    cell1: '0,97',
    cell2: '8,54',
    cell3: '14,57',
    cell4: '22,20',
    cell5: '39,19',
  },
  {
    name: 'Variação (P.P.)',
    cell1: '---',
    cell2: '---',
    cell3: '---',
    cell4: '0,74',
    cell5: '0,03',
  },
]

export default function FundsInfo({ fund }) {
  const themeContext = useContext(ThemeContext)

  return (
    <Container>
      <SubTitle>{fund.apelido}</SubTitle>
      <RiskDegreeTitle>Perfil de Risco</RiskDegreeTitle>
      <RiskDegree actives={[2]} />
      <HistoricalRentabilityTable tableHead={tableHead} tableRow={tableRow} />
      <TransactionsSection
        title="Movimentações (Até 13:30)"
        articles={articles}
      />
      <FundsDetailsSection>
        <WrapperDetails>
          <WrapperDetailsContent
            title="Detalhes do Fundo"
            fundsDetail={fundsDetail}
          />
          <FileDownloadSection
            backgroundColor={themeContext.colors.gray1}
            data={downloadFileSectionData}
          />
        </WrapperDetails>
        <Taxation title="Tributação (IR)" taxationData={taxationData} />
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
