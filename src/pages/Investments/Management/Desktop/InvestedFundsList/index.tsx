import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import 'styled-components/macro'

import FundsFilter from 'pages/Investments/Management/Desktop/FundsFilter'
import { TFundsLayout } from 'pages/Investments/Management/types'
import {
  SetIdFund,
  GetPositionDataRequest,
} from 'store/modules/Investment/Position/action'

import FundsCarousel from './FundsCarousel'
import FundsList from './FundsList'
import { ContainerCard, LoadingStyled, ErrorText, ButtonStyled } from './styles'

interface IProps {
  filters: any
  filteredFunds: any[]
  viewMode: TFundsLayout
  isNextPriorButtonsVisible: boolean
  onHandleChangeView: (newStateLayout: TFundsLayout) => void
  onHandleChangeFilter: (newStateFilters: string[]) => void
}
const InvestedFundsList = ({
  filters,
  filteredFunds,
  viewMode,
  isNextPriorButtonsVisible,
  onHandleChangeView,
  onHandleChangeFilter,
}: IProps) => {
  const dispatch = useDispatch()
  const { idFund, displayInformation, hasError, isLoading, auth } = useSelector(
    (state: any) => ({
      idFund: state.investmentPosition.idFund,
      displayInformation: state.investmentPosition.displayInformation,
      hasError: state.investmentPosition.hasError,
      isLoading: state.investmentPosition.isLoading,
      auth: state.auth,
    })
  )

  const onHandleChangeIdFund = (idFund: string) => {
    dispatch(SetIdFund(idFund))
  }

  const renderContent = () => {
    if (isLoading) {
      return (
        <ContainerCard>
          <LoadingStyled
            data-testid="loading-account-info"
            type="bar"
            legend="Aguarde, estamos buscando suas informações..."
          />
        </ContainerCard>
      )
    }

    if (hasError) {
      return (
        <ContainerCard>
          <ErrorText>Não foi possível carregar a suas informações.</ErrorText>
          <ButtonStyled
            onClick={() => dispatch(GetPositionDataRequest(auth.cpf))}
            loading={isLoading}
            loadingColor="white"
          >
            Tentar novamente
          </ButtonStyled>
        </ContainerCard>
      )
    }

    return (
      <>
        <FundsFilter
          filters={filters}
          viewMode={viewMode}
          isNextPriorButtonsVisible={isNextPriorButtonsVisible}
          onHandleChangeView={onHandleChangeView}
          onHandleChangeFilter={onHandleChangeFilter}
        />
        {viewMode === 'CARDS' ? (
          <FundsCarousel
            displayInformation={displayInformation}
            idFund={idFund}
            onHandleChangeIdFund={onHandleChangeIdFund}
            filteredFunds={filteredFunds}
          />
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
