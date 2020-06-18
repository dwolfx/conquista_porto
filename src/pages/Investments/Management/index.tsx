import React, { useState } from 'react'
import useMedia from 'hooks/useMedia'
import useFilter from './useFilter'
import useFetchPosition from 'hooks/Investments/useFetchPosition'
import DesktopComponent from './Desktop'
import MobileComponent from './Mobile'
import TabletComponent from './Tablet'
import Anbima from 'components/Anbima'
import { TFundsLayout } from './filters'
import { GridContainer } from './styles'

const ManagementInvestments: React.FC = ({ ...rest }) => {
  const [fundsLayout, setFundsLayout] = useState<TFundsLayout>('CARDS')
  const [filters, setFilters] = useState<string[]>([])
  const isMobile = useMedia('xs')
  const isTablet = useMedia('lg')

  useFetchPosition()

  const fundsListFiltered = useFilter(filters)
  /* esta lista será utilizada nos demais components */
  console.log(fundsListFiltered)

  const handleChangeFundsLayout = (layoutCheanged: TFundsLayout) => {
    setFundsLayout(layoutCheanged)
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
        filterData={filters}
        fundsLayout={fundsLayout}
        onHandleChangeLayout={handleChangeFundsLayout}
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
