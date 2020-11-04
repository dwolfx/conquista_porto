import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Anbima from 'components/Anbima'
import useFetchPosition from 'hooks/Investments/useFetchPosition'
import useFetchSuitabilityInfo from 'hooks/Suitability/useFetchSuitabilityInfo'
import useMedia from 'hooks/useMedia'
import Redeem from 'pages/Redeem'
import AccountExtract from 'pages/Investments/Extract/AccountExtract'
import FundExtract from 'pages/Investments/Extract/FundExtract'
import { RedeemLayerToggleClose } from 'store/modules/Investment/Redeem/action'
import { SetIdFund } from 'store/modules/Investment/Position/action'

import useFilter from './useFilter'
import DesktopComponent from './Desktop'
import TabletComponent from './Tablet'
// import AmountsToBeSettledExtract from '../Extract/AmountsToBeSettledExtract'
import { TFundsLayout } from './types'
import { GridContainer } from './styles'
import { CloseAccountExtractLayer } from 'store/modules/BankExtract/action'
import { CloseBankExtractFundLayer } from 'store/modules/BankExtractFund/action'

const ManagementInvestments: React.FC = ({ ...rest }) => {
  const dispatch = useDispatch()
  const isTablet = useMedia('lg')
  const [filters, setFilters] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<TFundsLayout>('CARDS')
  const {
    idFund,
    isLayerOpen,
    isAccountExtractOpen,
    isFundExtractOpen,
  } = useSelector((state: any) => ({
    idFund: state.investmentPosition.idFund,
    isLayerOpen: state.redeemData.isLayerOpen,
    isAccountExtractOpen: state.bankExtract.isLayerOpen,
    isFundExtractOpen: state.bankExtractFund.isLayerOpen,
  }))

  useFetchPosition()
  useFetchSuitabilityInfo()

  const filteredInvestedFunds = useFilter(filters)

  useEffect(() => {
    if (
      filteredInvestedFunds &&
      filteredInvestedFunds.length > 0 &&
      filteredInvestedFunds[0].id
    ) {
      dispatch(SetIdFund(filteredInvestedFunds[0].id))
    }
    // eslint-disable-next-line
  }, [dispatch, filters])

  const handleChangeFundsView = (layoutCheanged: TFundsLayout) => {
    setViewMode(layoutCheanged)
  }

  const handleChangeFilter = (newFilter: string[]) => {
    setFilters(newFilter)
  }

  const renderResponsiveContent = () => {
    if (isTablet) {
      return (
        <TabletComponent
          filters={filters}
          viewMode={viewMode}
          filteredInvestedFunds={filteredInvestedFunds}
          onHandleChangeView={handleChangeFundsView}
          onHandleChangeFilter={handleChangeFilter}
        />
      )
    }
    return (
      <DesktopComponent
        filters={filters}
        viewMode={viewMode}
        filteredInvestedFunds={filteredInvestedFunds}
        onHandleChangeView={handleChangeFundsView}
        onHandleChangeFilter={handleChangeFilter}
      />
    )
  }

  return (
    <>
      <GridContainer as="section" {...rest}>
        {renderResponsiveContent()}
        <Anbima />
      </GridContainer>
      <Redeem
        isOpen={isLayerOpen}
        handleClose={() => dispatch(RedeemLayerToggleClose())}
        selectedFundId={idFund}
      />
      <AccountExtract
        isOpen={isAccountExtractOpen}
        handleClose={() => dispatch(CloseAccountExtractLayer())}
      />
      {/* <AmountsToBeSettledExtract
        isOpen={isAccountExtractOpen}
        handleClose={() => dispatch(CloseAccountExtractLayer())}
      /> */}
      <FundExtract
        isOpen={isFundExtractOpen}
        handleClose={() => dispatch(CloseBankExtractFundLayer())}
      />
    </>
  )
}

export default ManagementInvestments
