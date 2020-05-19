import React from 'react'

import { FullHeightCard } from 'pages/Objectives/Recommendation/styles'
import { IFund } from 'pages/Objectives/Recommendation/types'

import { columns, columnsSticky, fundsType } from './tableData'
import * as s from './styles'
import useMedia from 'hooks/useMedia'

interface IProps {
  cardHeader: React.JSXElementConstructor<object>
  cardInfos: React.JSXElementConstructor<object>
  funds: IFund[]
  handleOpenDetails: (fund: IFund) => void
}

const DesktopView = ({
  cardHeader: CardHeader,
  cardInfos: CardInfos,
  funds,
  handleOpenDetails,
}: IProps) => {
  const isTabletHorizontal = useMedia('lg')
  const isTabletVertical = useMedia('md')
  const columnsToRender = isTabletHorizontal || isTabletVertical ? columnsSticky : columns

  return (
    <FullHeightCard
      headerIcon="financial"
      headerTitle={
        <CardHeader />
      }
    >
      <CardInfos />
  
      <s.ContainerFunds>
        <s.Table
          columns={columnsToRender}
          onShowDetails={(rowDetails: IFund) => handleOpenDetails(rowDetails)}
          data={funds}
          fundsType={fundsType}
          isSticky={isTabletVertical || isTabletHorizontal}
        />
      </s.ContainerFunds>
    </FullHeightCard>
  )
}

export default DesktopView
