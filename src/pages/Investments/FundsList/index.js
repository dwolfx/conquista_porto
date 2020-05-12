import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useToast } from 'hooks/toast'

import { GetSuitabilityInfoRequest } from 'store/modules/SuitabilityInfo/action'
import { GetInvestmentDetailsRequest } from 'store/modules/Investment/Details/action'
import useFetchInvestmentsList from 'hooks/Investments/useFetchInvestmentsList'
import useMedia from 'hooks/useMedia'
import { Col } from 'styled-bootstrap-grid'

import Anbima from 'components/Anbima'
import Filter from './Filter'
import useFilter from './Filter/useFilter'
import { columns, fundsType } from './mock'
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
} from './styles'
import Detail from './Detail'
import MobileFilter from './MobileFilter'
import sortFundList from './MobileFilter/sortFundList'

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
  const [modalSuitabilityInfo, setModalSuitabilityInfo] = useState(
    modalSuitabilityInfoInitialState
  )

  const dispatch = useDispatch()

  const { addToast } = useToast()

  const fundsStatus = useSelector(state => ({
    isLoading: state.investmentsList.isLoading,
    isError: state.investmentsList.isError,
  }))
  useFetchInvestmentsList()

  const isMobile = useMedia('xs')

  const [filter, setFilter] = useState({
    byCategoriaArena: [],
    byPerfilRisco: [],
  })

  const [selectedFundId, setSelectedFundId] = useState(null)

  const [mobileFundSort, setMobileFundSort] = useState({
    sortBy: null,
    sortType: null,
  })

  const [isLayerOpen, setLayerOpen] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isOpenForInvestments, setIsOpenForInvestments] = useState(true)

  const filteredFundsList = useFilter(filter)

  const handleClickInvestButton = (fundId = null, hasDetailsFund = false) => {
    const onSuccess = data => {
      setModalSuitabilityInfo({ ...data })

      if (data.isValid) {
        setIsDrawerOpen(false)
        setLayerOpen(true)
        setSelectedFundId(fundId)
        if (!hasDetailsFund) {
          dispatch(GetInvestmentDetailsRequest(fundId))
        }
      }
    }

    dispatch(GetSuitabilityInfoRequest(onSuccess, 'investir', addToast))
  }

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
        handleDrawerOpen={() => setIsDrawerOpen(true)}
      />
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
              />
            </Col>
          </>
        ) : (
          <>
            <TableContent>
              <Filter filter={filter} onChangeFilter={handleChangeFilter} />
              <ContentWrapper>
                <Col col={12}>
                  <TableFunds
                    columns={columns}
                    isDrawerOpen={isDrawerOpen}
                    onChangeIsDrawerOpen={setIsDrawerOpen}
                    setIsOpenForInvestments={setIsOpenForInvestments}
                    handleLayerOpen={fundId => {
                      handleClickInvestButton(fundId)
                    }}
                    data={filteredFundsList}
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
      <Detail
        isOpen={isDrawerOpen}
        isLayerOpen={isLayerOpen}
        handleLayerOpen={handleClickInvestButton}
        isOpenForInvestments={isOpenForInvestments}
        handleClose={() => setIsDrawerOpen(false)}
      />
    </>
  )
}
