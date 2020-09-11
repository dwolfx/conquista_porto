import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Anbima from 'components/Anbima'
import useFetchPosition from 'hooks/Investments/useFetchPosition'
import useMedia from 'hooks/useMedia'

import useFilter from './useFilter'
import DesktopComponent from './Desktop'
import TabletComponent from './Tablet'
import { TFundsLayout } from './types'
import { GridContainer } from './styles'
import { RedeemLayerToggleClose } from 'store/modules/Investment/Redeem/action'
import Redeem from 'pages/Redeem'
import useFetchSuitabilityInfo from 'hooks/Suitability/useSuitabilityInfo'
import { SetIdFund } from 'store/modules/Investment/Position/action'

const ManagementInvestments: React.FC = ({ ...rest }) => {
  const [viewMode, setViewMode] = useState<TFundsLayout>('CARDS')
  const dispatch = useDispatch()
  const [filters, setFilters] = useState<string[]>([])
  const isTablet = useMedia('lg')
  const { idFund, isLayerOpen } = useSelector((state: any) => ({
    idFund: state.investmentPosition.idFund,
    isLayerOpen: state.redeemData.isLayerOpen,
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
    </>
  )
}

export default ManagementInvestments
