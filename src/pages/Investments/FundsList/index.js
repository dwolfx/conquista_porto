import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import useFetchInvestmentsList from 'hooks/Investments/useFetchInvestmentsList'
import useMedia from 'hooks/useMedia'
import { Col } from 'styled-bootstrap-grid'

import Anbima from 'components/Anbima'
import { FILTER_RISKS } from 'pages/Investments/FundsList/constants'
import Filter from './Filter'
import useFilter from './Filter/useFilter'
import { columns, fundsType } from './mock'
import TableFunds from './Table'
import ResponsiveList from './ResponsiveList'

import { GridContainer, ContentWrapper, TableContent } from './styles'
import Detail from './Detail'
import MobileFilter from './MobileFilter'
import sortFundList from './MobileFilter/sortFundList'

export default function FundsList() {
  const fundsStatus = useSelector(state => ({
    isLoading: state.investmentsList.isLoading,
    isError: state.investmentsList.isError,
  }))
  useFetchInvestmentsList()

  const isMobile = useMedia('xs')

  const [filter, setFilter] = useState({
    byCategoriaArena: [],
    byPerfilRisco: [...Object.values(FILTER_RISKS)],
  })

  const [mobileFundSort, setMobileFundSort] = useState({
    sortBy: null,
    sortType: null,
  })

  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isOpenForInvestments, setIsOpenForInvestments] = useState(true)

  const filteredFundsList = useFilter(filter)

  function handleChangeFilter(newFilter) {
    setFilter(newFilter)
  }

  function handleChangeMobileSort(newMobileSort) {
    setMobileFundSort(newMobileSort)
  }

  const mobileFundList = fundList => {
    if (mobileFundSort.sortType !== null)
      return sortFundList(fundList, mobileFundSort)
    return fundList
  }

  return (
    <>
      <GridContainer as="section">
        {isMobile ? (
          <>
            <MobileFilter
              filter={filter}
              onChangeFilter={handleChangeFilter}
              sort={mobileFundSort}
              onChangeSort={handleChangeMobileSort}
            />
            <Col col={12}>
              <ResponsiveList
                data={mobileFundList(filteredFundsList)}
                isLoading={fundsStatus.isLoading}
                isError={fundsStatus.isError}
                isFiltering={
                  filter.byPerfilRisco || filter.byCategoriaArena.length > 0
                }
              />
            </Col>
          </>
        ) : (
          <>
            <Filter filter={filter} onChangeFilter={handleChangeFilter} />
            <TableContent>
              <ContentWrapper>
                <Col col={12}>
                  <TableFunds
                    columns={columns}
                    isDrawerOpen={isDrawerOpen}
                    onChangeIsDrawerOpen={setIsDrawerOpen}
                    setIsOpenForInvestments={setIsOpenForInvestments}
                    data={filteredFundsList}
                    fundsType={fundsType}
                    isLoading={fundsStatus.isLoading}
                    isError={fundsStatus.isError}
                    isFiltering={
                      filter.byPerfilRisco > 0 ||
                      filter.byCategoriaArena.length > 0
                    }
                  />
                </Col>
              </ContentWrapper>
            </TableContent>
          </>
        )}
        <Anbima />
      </GridContainer>
      <Detail
        isOpen={isDrawerOpen}
        isOpenForInvestments={isOpenForInvestments}
        handleClose={() => setIsDrawerOpen(false)}
      />
    </>
  )
}
