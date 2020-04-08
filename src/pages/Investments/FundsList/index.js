import React, { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

import Dropdown from 'pages/Investments/FundsList/DropdrownRisk'
import useFetchInvestmentsList from 'hooks/Investments/useFetchInvestmentsList'
import useMedia from 'hooks/useMedia'
import { Col } from 'styled-bootstrap-grid'
import Text from 'components/Text'

import AnbimaLegalInfo from 'components/AnbimaLegalInfo'
import { columns2, fundsType } from './mock'
import TableFunds from './Table'
import ListFunds from './List'
import {
  GridContainer,
  TopWrapper,
  ContentWrapper,
  RiskDegree,
  DropdownWrapper,
} from './styles'

const allOption = 'todos'

export default function FundsList() {
  useFetchInvestmentsList()

  const { state: locationState } = useLocation()
  const isMobile = useMedia('xs')
  const [selectedRisk, setSelectedRisk] = useState(allOption)
  const [selectedType, setSelectedType] = useState(allOption)
  const funds = useSelector(state => state.investmentsList)

  const filterFundsByType = type => (fundsArr = []) => {
    const newFunds =
      type === allOption
        ? fundsArr
        : fundsArr.filter(
            fund =>
              fund.nome_categoria.toLowerCase().replace(/\s/g, '') === type
          )

    return newFunds.flatMap(fund => fund.fundos)
  }

  const filterFundsByRisk = risk => (fundsArr = []) =>
    risk === allOption
      ? fundsArr
      : fundsArr.filter(
          fund => parseInt(fund.perfil_risco_ordem, 10) === parseInt(risk, 10)
        )

  const fundsFiltered = useMemo(() => {
    const filterByType = filterFundsByType(selectedType)
    const filterByRisk = filterFundsByRisk(selectedRisk)
    return filterByRisk(filterByType(funds.data[0]))
  }, [funds.data, selectedRisk, selectedType])

  // TODO
  return (
    <GridContainer as="section" style={{ backgroundColor: 'white' }}>
      <TopWrapper>
        <DropdownWrapper xs="6" sm="6" md="4">
          <Text type="caption">Classificação de Risco</Text>
          <Dropdown currentValue={selectedRisk} onChange={setSelectedRisk} />
        </DropdownWrapper>
        <Col hiddenSmDown xs="12" sm="6" md="4">
          <RiskDegree actives={[1, 2, 3, 4, 5]} />
        </Col>
      </TopWrapper>
      <ContentWrapper>
        <Col col="12">
          {isMobile ? (
            <ListFunds
              data={fundsFiltered}
              idGoal={(locationState || {}).idGoal}
            />
          ) : (
            <TableFunds
              columns={columns2}
              data={fundsFiltered}
              fundsType={fundsType}
              setSelectedType={setSelectedType}
              selectedType={selectedType}
              idGoal={(locationState || {}).idGoal}
            />
          )}
        </Col>
      </ContentWrapper>
      <AnbimaLegalInfo />
    </GridContainer>
  )
}
