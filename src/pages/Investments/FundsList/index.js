import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useToast } from 'hooks/toast'
// import { useLocation } from 'react-router-dom'
// import { handleGiwRedirect } from 'helpers'

import { GetSuitabilityInfoAndValidate } from 'store/modules/SuitabilityInfo/action'
import { GetInvestmentDetailsRequest } from 'store/modules/Investment/Details/action'
import useFetchInvestmentsList from 'hooks/Investments/useFetchInvestmentsList'
import useMedia from 'hooks/useMedia'
import { Col } from 'styled-bootstrap-grid'

import Anbima from 'components/Anbima'
import Filter from './Filter'
import useFilter from './Filter/useFilter'
import { columns, fundsType, columnsWithSticky } from './mock'
import TableFunds from './Table'
import ResponsiveList from './ResponsiveList'
import FinancialApplication from '../FinancialApplication'

import {
  GridContainer,
  ContentWrapper,
  TableContent,
  Modal,
  ModalText,
  ModalButtonWrapper,
  ModalButton,
  FloatButton,
} from './styles'
import Detail from './Detail'
import DrawerFilter from './DrawerFilter'
import sortFundList from './DrawerFilter/sortFundList'
import DetailModal from './DetailModal'

const modalSuitabilityInfoInitialState = {
  isOpen: false,
  title: '',
  description: '',
  button: {
    buttonName: '',
    dataGtmName: '',
    dataGtmType: '',
    dataGtmClicktype: '',
    handleClick: () => {},
  },
}

export default function FundsList() {
  const [selectedFundId, setSelectedFundId] = useState(null)
  const [isLayerOpen, setLayerOpen] = useState(false)
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false)
  const [isFiltersClean, setIsFiltersClean] = useState(false)
  const [filtersCount, setFiltersCount] = useState(0)
  const [isOpenForInvestments, setIsOpenForInvestments] = useState(true)
  const [modalSuitabilityInfo, setModalSuitabilityInfo] = useState(
    modalSuitabilityInfoInitialState
  )
  const [clickedFundInvestButtonId, setClickedFundInvestButtonId] = useState(
    null
  )
  const [filter, setFilter] = useState({
    byCategoriaArena: [],
    byPerfilRisco: [],
  })
  const [mobileFundSort, setMobileFundSort] = useState({
    sortBy: null,
    sortType: null,
  })
  // const { state: locationState } = useLocation()
  const dispatch = useDispatch()
  const { addToast } = useToast()
  const isMobile = useMedia('xs')
  const isTablet = useMedia('lg')
  const funds = useSelector(state => state.investmentsList.data)
  const filteredFundsList = useFilter(filter, funds)
  const [isFundDetailOpen, setIsFundDetailOpen] = useState(false)
  const [title, setTitle] = useState('')

  const fundsStatus = useSelector(state => ({
    isLoading: state.investmentsList.isLoading,
    isError: state.investmentsList.isError,
  }))

  useFetchInvestmentsList()

  useEffect(() => {
    if (
      !filter.byCategoriaArena.length &&
      !filter.byPerfilRisco.length &&
      !mobileFundSort.sortBy &&
      !mobileFundSort.sortType
    ) {
      setIsFiltersClean(true)
    } else {
      setIsFiltersClean(false)
    }

    const totalFiltersCount =
      filter.byCategoriaArena.length +
      filter.byPerfilRisco.length +
      (mobileFundSort.sortBy ? 1 : 0)

    setFiltersCount(totalFiltersCount)
  }, [filter, mobileFundSort])

  function triggerSuitabilityDispatch(onSuccess) {
    dispatch(GetSuitabilityInfoAndValidate(onSuccess, 'investir', addToast))
  }

  const handleClickInvestButton = (fundId = null, hasDetailsFund = false) => {
    const onSuccess = data => {
      setModalSuitabilityInfo({ ...data })
      if (data.isValid) {
        setIsFundDetailOpen(false)
        setLayerOpen(true) // para entregar a sprint precisamos comentar essa linha e descomentar o código abaixo

        // handleGiwRedirect(`portaldecliente/conquista/aplicacao?idFundo=${fundId}&r=true${
        //   locationState && locationState.idGoal
        //     ? `&idObjetivo=${locationState.idGoal}`
        //     : ''
        // }
        //   `)
        setSelectedFundId(fundId)
        if (!hasDetailsFund) {
          dispatch(GetInvestmentDetailsRequest(fundId))
        }
      }
    }
    triggerSuitabilityDispatch(onSuccess)
  }

  const onChangeLayerOpen = fundId => {
    setClickedFundInvestButtonId(fundId)
    const onSuccess = data => {
      if (data.isValid) {
        handleClickInvestButton(fundId)
      } else {
        setModalSuitabilityInfo({ ...data })
      }
    }
    triggerSuitabilityDispatch(onSuccess)
  }

  function handleChangeFilter(newFilter) {
    setFilter(newFilter)
  }

  function handleChangeMobileSort(newMobileSort) {
    setMobileFundSort(newMobileSort)
  }

  function handleCleanFilter() {
    setFilter({
      byCategoriaArena: [],
      byPerfilRisco: [],
    })
  }

  function handleCleanSort() {
    setMobileFundSort({
      sortBy: null,
      sortType: null,
    })
  }

  const mobileFundList = fundList => {
    if (mobileFundSort.sortType !== null)
      return sortFundList(fundList, mobileFundSort)
    return fundList
  }

  return (
    <>
      <Modal
        modalTitle={modalSuitabilityInfo.title}
        isOpen={modalSuitabilityInfo.isOpen}
        handleClose={() =>
          setModalSuitabilityInfo({
            ...modalSuitabilityInfo,
            isOpen: false,
          })
        }
      >
        <ModalText>{modalSuitabilityInfo.description}</ModalText>
        <ModalButtonWrapper>
          {modalSuitabilityInfo.button && (
            <ModalButton
              data-gtm-name={modalSuitabilityInfo.button.dataGtmName}
              data-gtm-type={modalSuitabilityInfo.button.dataGtmType}
              data-gtm-clicktype={modalSuitabilityInfo.button.dataGtmClicktype}
              onClick={
                modalSuitabilityInfo.button.handleClick
                  ? modalSuitabilityInfo.button.handleClick
                  : () =>
                      setModalSuitabilityInfo({
                        ...modalSuitabilityInfo,
                        isOpen: false,
                      })
              }
            >
              {modalSuitabilityInfo.button.buttonName}
            </ModalButton>
          )}
        </ModalButtonWrapper>
      </Modal>
      <FinancialApplication
        isOpen={isLayerOpen}
        handleClose={() => {
          setLayerOpen(false)
          setSelectedFundId(null)
        }}
        selectedFundId={selectedFundId}
        handleFundDetailOpen={() => setIsFundDetailOpen(true)}
      />
      <GridContainer as="section">
        {isMobile ? (
          <>
            {!fundsStatus.isLoading &&
              !fundsStatus.isError &&
              !!funds.length && (
                <FloatButton
                  color="primary"
                  onClick={() => setIsFilterDrawerOpen(true)}
                  size="large"
                  icon="filter"
                />
              )}
            <Col col={12}>
              <ResponsiveList
                onChangeIsFundDetailOpen={setIsFundDetailOpen}
                handleLayerOpen={fundId => onChangeLayerOpen(fundId)}
                data={mobileFundList(filteredFundsList)}
                isLoading={fundsStatus.isLoading}
                isError={fundsStatus.isError}
                setTitle={setTitle}
                setIsOpenForInvestments={setIsOpenForInvestments}
              />
            </Col>
          </>
        ) : (
          <>
            <TableContent>
              <Filter
                disabled={
                  !funds.length || fundsStatus.isLoading || fundsStatus.isError
                }
                filter={filter}
                onChangeFilter={handleChangeFilter}
                onChangeIsDrawerOpen={setIsFilterDrawerOpen}
                onClearFilter={handleCleanFilter}
                onClearSort={handleCleanSort}
                sort={mobileFundSort}
                onChangeSort={handleChangeMobileSort}
                isFiltersClean={isFiltersClean}
                filtersCount={filtersCount}
              />
              <ContentWrapper>
                <Col col={12}>
                  <TableFunds
                    onChangeIsFundDetailOpen={setIsFundDetailOpen}
                    columns={isTablet ? columnsWithSticky : columns}
                    setIsOpenForInvestments={setIsOpenForInvestments}
                    clickedFundInvestButton={clickedFundInvestButtonId}
                    handleLayerOpen={fundId => onChangeLayerOpen(fundId)}
                    isTablet={isTablet}
                    data={mobileFundList(filteredFundsList)}
                    filteredFundListEmpty={
                      !!funds.length &&
                      !mobileFundList(filteredFundsList).length
                    }
                    fundsType={fundsType}
                    isLoading={fundsStatus.isLoading}
                    isError={fundsStatus.isError}
                  />
                </Col>
              </ContentWrapper>
            </TableContent>
          </>
        )}
        <Anbima />
      </GridContainer>
      {isMobile ? (
        <>
          <DetailModal
            title={title}
            isOpenForInvestments={isOpenForInvestments}
            isOpen={isFundDetailOpen}
            isLayerOpen={isLayerOpen}
            handleLayerOpen={handleClickInvestButton}
            handleClose={() => setIsFundDetailOpen(false)}
          />
          <DrawerFilter
            filter={filter}
            onChangeFilter={handleChangeFilter}
            isDrawerOpen={isFilterDrawerOpen}
            onChangeIsDrawerOpen={setIsFilterDrawerOpen}
            sort={mobileFundSort}
            onChangeSort={handleChangeMobileSort}
          />
        </>
      ) : (
        <>
          <Detail
            isOpen={isFundDetailOpen}
            isLayerOpen={isLayerOpen}
            handleLayerOpen={handleClickInvestButton}
            isOpenForInvestments={isOpenForInvestments}
            handleClose={() => setIsFundDetailOpen(false)}
          />
          {isTablet && (
            <DrawerFilter
              filter={filter}
              onChangeFilter={handleChangeFilter}
              isDrawerOpen={isFilterDrawerOpen}
              onChangeIsDrawerOpen={setIsFilterDrawerOpen}
              sort={mobileFundSort}
              onChangeSort={handleChangeMobileSort}
            />
          )}
        </>
      )}
    </>
  )
}
