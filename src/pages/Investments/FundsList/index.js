import React, { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'

import Dropdown from 'pages/Investments/FundsList/DropdrownRisk'
import useFetchInvestmentsList from 'hooks/Investments/useFetchInvestmentsList'
import useMedia from 'hooks/useMedia'
import { Col } from 'styled-bootstrap-grid'
import Text from 'components/Text'

import AnbimaLegalInfo from 'components/AnbimaLegalInfo'
import { columns, fundsType } from './mock'
import TableFunds from './Table'
import ListFunds from './List'
import {
  GridContainer,
  TopWrapper,
  SelectDropdown,
  Breadcrumb,
  ContentWrapper,
  RiskDegree,
  DropdownWrapper,
} from './styles'

const allOption = 'todos'

export default function FundsList() {
  useFetchInvestmentsList()

  const isMobile = useMedia('xs')
  const [selectedRisk, setSelectedRisk] = useState(allOption)
  const [selectedType, setSelectedType] = useState(allOption)
  const funds = useSelector(state => state.investmentsList)

  const filterFundsByType = type => (fundsArr = []) => {
    const newFunds =
      type === allOption
        ? fundsArr
        : fundsArr.filter(
            fund => fund.nome_categoria.toLowerCase().replace(' ', '') === type
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

  return (
    <GridContainer as="section">
      <TopWrapper>
        <Col xs="12" sm="12" md="4">
          <Breadcrumb
            crumbs={['SOLUÇÕES', 'INVESTIMENTOS', 'Lista de fundos']}
          />
        </Col>
        <DropdownWrapper xs="6" sm="6" md="4">
          <Text type="caption">Classificação de Risco</Text>
          <Dropdown currentValue={selectedRisk} onChange={setSelectedRisk} />
        </DropdownWrapper>
        <DropdownWrapper hiddenSmUp xs="6">
          <Text type="caption">Tipo</Text>
          <SelectDropdown
            options={fundsType}
            onChange={setSelectedType}
            currentValue={selectedType}
          />
        </DropdownWrapper>
        <Col hiddenSmDown xs="12" sm="6" md="4">
          <RiskDegree actives={[1, 2, 3, 4, 5]} />
        </Col>
      </TopWrapper>
      <ContentWrapper>
        <Col col="12">
          {isMobile ? (
            <ListFunds data={fundsFiltered} />
          ) : (
            <TableFunds
              columns={columns}
              data={fundsFiltered}
              fundsType={fundsType}
              setSelectedType={setSelectedType}
              selectedType={selectedType}
            />
          )}
        </Col>
      </ContentWrapper>
      <AnbimaLegalInfo />
    </GridContainer>
  )
}
