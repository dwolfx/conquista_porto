import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import useFetchInvestmentsList from 'hooks/Investments/useFetchInvestmentsList'
import useMedia from 'hooks/useMedia'
import { Col } from 'styled-bootstrap-grid'

import Anbima from 'components/Anbima'
import Filter from './Filter'
import useFilter from './Filter/useFilter'
import { columns, fundsType } from './mock'
import TableFunds from './Table'
import ListFunds from './List'
import Layer from './Layer'

import { GridContainer, ContentWrapper, TableContent } from './styles'
import Detail from './Detail'

export default function FundsList() {
  const fundsStatus = useSelector(state => ({
    isLoading: state.investmentsList.isLoading,
    isError: state.investmentsList.isError,
  }))
  useFetchInvestmentsList()

  const isMobile = useMedia('xs')

  const [filter, setFilter] = useState({
    byCategoriaArena: [],
    byPerfilRisco: null,
  })

  const [isLayerOpen, setLayerOpen] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isOpenForInvestments, setIsOpenForInvestments] = useState(true)

  const filteredFundsList = useFilter(filter)

  function handleChangeFilter(newFilter) {
    setFilter(newFilter)
  }

  return (
    <>
      <Layer
        isOpen={isLayerOpen}
        fullScreen
        handleClose={() => setLayerOpen(false)}
      />
      <GridContainer as="section">
        <TableContent>
          <Filter filter={filter} onChangeFilter={handleChangeFilter} />
          <ContentWrapper>
            <Col col="12">
              {isMobile ? (
                <ListFunds data={filteredFundsList} />
              ) : (
                <TableFunds
                  columns={columns}
                  isDrawerOpen={isDrawerOpen}
                  onChangeIsDrawerOpen={setIsDrawerOpen}
                  handleLayerOpen={() => setLayerOpen(true)}
                  setIsOpenForInvestments={setIsOpenForInvestments}
                  data={filteredFundsList}
                  fundsType={fundsType}
                  isLoading={fundsStatus.isLoading}
                  isError={fundsStatus.isError}
                  isFiltering={
                    filter.byPerfilRisco || filter.byCategoriaArena.length > 0
                  }
                />
              )}
            </Col>
          </ContentWrapper>
        </TableContent>
        <Anbima />
      </GridContainer>
      <Detail
        isOpen={isDrawerOpen}
        handleLayerOpen={() => setLayerOpen(true)}
        isOpenForInvestments={isOpenForInvestments}
        handleClose={() => setIsDrawerOpen(false)}
      />
    </>
  )
}
