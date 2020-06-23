import React, { useState } from 'react'
import useMedia from 'hooks/useMedia'
import useFilter from './useFilter'
import useFetchPosition from 'hooks/Investments/useFetchPosition'
import DesktopComponent from './Desktop'
import MobileComponent from './Mobile'
import TabletComponent from './Tablet'
import Anbima from 'components/Anbima'
import { TFundsLayout } from './types'
import { GridContainer } from './styles'

const ManagementInvestments: React.FC = ({ ...rest }) => {
  const [viewMode, setViewMode] = useState<TFundsLayout>('CARDS')
  const [filters, setFilters] = useState<string[]>([])
  const isMobile = useMedia('xs')
  const isTablet = useMedia('lg')

  useFetchPosition()

  const filteredInvestedFunds = useFilter(filters)
  const handleChangeFundsView = (layoutCheanged: TFundsLayout) => {
    setViewMode(layoutCheanged)
  }

  const handleChangeFilter = (newFilter: string[]) => {
    setFilters(newFilter)
  }

  const renderResponsiveContent = () => {
    if (isMobile) {
      return <MobileComponent />
    }
    if (isTablet) {
      return <TabletComponent />
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
    <GridContainer as="section" {...rest}>
      {renderResponsiveContent()}
      <Anbima />
    </GridContainer>
  )
}

export default ManagementInvestments
