import React from 'react'
import useMedia from 'hooks/useMedia'
import DesktopComponent from './Desktop'
import MobileComponent from './Mobile'
import TabletComponent from './Tablet'

import { GridContainer } from './styles'

const ManagementInvestments: React.FC = ({ ...rest }) => {
  const isMobile = useMedia('xs')
  const isTablet = useMedia('lg')

  const renderResponsiveContent = () => {
    if (isMobile) {
      return <MobileComponent />
    }
    if (isTablet) {
      return <TabletComponent />
    }
    return <DesktopComponent />
  }

  return (
    <GridContainer as="section" {...rest}>
      {renderResponsiveContent()}
    </GridContainer>
  )
}

export default ManagementInvestments
