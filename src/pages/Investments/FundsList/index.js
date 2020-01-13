import React, { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'

import useFetchInvestmentsList from 'hooks/Investments/useFetchInvestmentsList'
import useMedia from 'hooks/useMedia'

import { columns, riskClassification, fundsType } from './mock'
import TableFunds from './Table'
import ListFunds from './List'
import AmbimaLegalInfo from './AmbimaLegalInfo'
import {
  Section,
  TopWrapper,
  SelectRiskClassification,
  Breadcrumb,
  ContentWrapper,
  RiskDegree,
  SelectRow,
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

  const columnsMock = useMemo(() => columns, [])

  return (
    <Section>
      <TopWrapper>
        <Breadcrumb crumbs={['SOLUÇÕES', 'INVESTIMENTOS', 'Lista de fundos']} />
        <SelectRow>
          <SelectRiskClassification
            width={40}
            label="Classificação de Risco"
            showPlaceholder={false}
            value={selectedRisk}
            options={riskClassification}
            onChange={event => {
              setSelectedRisk(event.target.value)
            }}
          />
          {isMobile && (
            <SelectRiskClassification
              width={40}
              label="Tipo"
              showPlaceholder={false}
              value={selectedType}
              options={fundsType}
              onChange={event => {
                setSelectedType(event.target.value)
              }}
            />
          )}
        </SelectRow>

        <RiskDegree actives={[1, 2, 3, 4, 5]} />
      </TopWrapper>
      <ContentWrapper>
        {isMobile ? (
          <ListFunds data={fundsFiltered} />
        ) : (
          <TableFunds
            columns={columnsMock}
            data={fundsFiltered}
            fundsType={fundsType}
            setSelectedType={setSelectedType}
            selectedType={selectedType}
          />
        )}
      </ContentWrapper>
      <AmbimaLegalInfo />
    </Section>
  )
}
