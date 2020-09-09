import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Slider from 'react-slick'
import 'styled-components/macro'

import FundsFilter from 'pages/Investments/Management/Desktop/FundsFilter'
import {
  SetIdFund,
  GetPositionDataRequest,
} from 'store/modules/Investment/Position/action'

import FundsCarousel from './FundsCarousel'
import FundsList from './FundsList'
import useMedia from 'hooks/useMedia'
import * as s from './styles'
import * as t from './types'

const InvestedFundsList = ({
  filters,
  filteredFunds,
  viewMode,
  isNextPriorButtonsVisible,
  onHandleChangeView,
  onHandleChangeFilter,
}: t.IInvestedFundsList) => {
  const dispatch = useDispatch()
  const isTablet = useMedia('lg')
  const cardSlider = React.createRef<Slider>()
  const [count, setCount] = useState(1)
  const { idFund, displayInformation, hasError, isLoading } = useSelector(
    (state: any) => ({
      idFund: state.investmentPosition.idFund,
      displayInformation: state.investmentPosition.displayInformation,
      hasError: state.investmentPosition.hasError,
      isLoading: state.investmentPosition.isLoading,
    })
  )

  const onHandleChangeIdFund = (idFund: number) => {
    dispatch(SetIdFund(idFund))
  }

  const renderContent = () => {
    if (isLoading) {
      return (
        <s.ContainerCard>
          <s.LoadingStyled
            data-testid="loading-account-info"
            type="bar"
            legend="Aguarde, estamos buscando suas informações..."
          />
        </s.ContainerCard>
      )
    }

    if (hasError) {
      return (
        <s.ContainerCard>
          <s.ErrorText>
            Não foi possível carregar a suas informações.
          </s.ErrorText>
          <s.ButtonStyled
            onClick={() => dispatch(GetPositionDataRequest())}
            loading={isLoading}
            loadingColor="white"
          >
            Tentar novamente
          </s.ButtonStyled>
        </s.ContainerCard>
      )
    }

    const PrevAndNextButtons = ({
      filteredFunds,
    }: {
      filteredFunds: t.IFund[]
    }) => (
      <s.ButtonWrapper>
        {filteredFunds && filteredFunds.length > 1 && (
          <>
            <s.ChangePageButton
              disabled={count <= 1 || filteredFunds.length === 3}
              onClick={() => {
                cardSlider.current && cardSlider.current.slickPrev()
              }}
            >
              <s.BackwardIcon name="backward" />
            </s.ChangePageButton>
            <s.ChangePageButton
              disabled={
                count >= filteredFunds.length - 2 || filteredFunds.length === 3
              }
              onClick={() => {
                cardSlider.current && cardSlider.current.slickNext()
              }}
            >
              <s.ForwardIcon name="forward" />
            </s.ChangePageButton>
          </>
        )}
      </s.ButtonWrapper>
    )

    return (
      <>
        {!isTablet && (
          <s.FilterAndButtonWrapper>
            <FundsFilter
              filters={filters}
              viewMode={viewMode}
              isNextPriorButtonsVisible={isNextPriorButtonsVisible}
              onHandleChangeView={onHandleChangeView}
              onHandleChangeFilter={onHandleChangeFilter}
            />
            {viewMode === 'CARDS' && (
              <PrevAndNextButtons filteredFunds={filteredFunds} />
            )}
          </s.FilterAndButtonWrapper>
        )}
        {viewMode === 'CARDS' ? (
          <>
            <FundsCarousel
              displayInformation={displayInformation}
              idFund={idFund}
              onHandleChangeIdFund={onHandleChangeIdFund}
              filteredFunds={filteredFunds}
              setCount={setCount}
              ref={cardSlider}
            />
          </>
        ) : (
          <FundsList
            displayInformation={displayInformation}
            idFund={idFund}
            onHandleChangeIdFund={onHandleChangeIdFund}
            filteredFunds={filteredFunds}
          />
        )}
      </>
    )
  }

  return renderContent()
}

export default InvestedFundsList
