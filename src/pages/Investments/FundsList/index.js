import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

import useFetchInvestmentsList from 'hooks/Investments/useFetchInvestmentsList'
import useMedia from 'hooks/useMedia'
import { Col } from 'styled-bootstrap-grid'

import AnbimaLegalInfo from 'components/AnbimaLegalInfo'
import Filter from './Filter'
import useFilter from './Filter/useFilter'
import { columns, fundsType } from './mock'
import TableFunds from './Table'
import ListFunds from './List'

import { GridContainer, ContentWrapper, TableContent } from './styles'

export default function FundsList() {
  const fundsStatus = useSelector(state => ({
    isLoading: state.investmentsList.isLoading,
    isError: state.investmentsList.isError,
  }))
  useFetchInvestmentsList()

  const { state: locationState } = useLocation()
  const isMobile = useMedia('xs')

  const [filter, setFilter] = useState({
    byCategoriaArena: null,
    byPerfilRisco: null,
  })
  const filteredFundsList = useFilter(filter)

  function handleChangeFilter(newFilter) {
    setFilter(newFilter)
  }

  return (
    <GridContainer as="section">
      <TableContent>
        <Filter filter={filter} onChangeFilter={handleChangeFilter} />
        <ContentWrapper>
          <Col col="12">
            {isMobile ? (
              <ListFunds
                data={filteredFundsList}
                idGoal={(locationState || {}).idGoal}
              />
            ) : (
              <TableFunds
                columns={columns}
                data={filteredFundsList}
                fundsType={fundsType}
                isLoading={fundsStatus.isLoading}
                isError={fundsStatus.isError}
                idGoal={(locationState || {}).idGoal}
              />
            )}
          </Col>
        </ContentWrapper>
      </TableContent>
      <AnbimaLegalInfo />
    </GridContainer>
  )
}
