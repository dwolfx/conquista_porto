import React from 'react'

import { FullHeightCard } from 'pages/Objectives/Recommendation/styles'
import { IFund } from 'pages/Objectives/Recommendation/types'

import { columns, fundsType } from './tableData'
import * as s from './styles'

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
}: IProps) => (
  <FullHeightCard
    headerIcon="financial"
    headerTitle={
      <CardHeader />
    }
  >
    <CardInfos />

    <s.ContainerFunds>
      <s.Table
        columns={columns}
        onShowDetails={(rowDetails: IFund) => handleOpenDetails(rowDetails)}
        data={funds}
        fundsType={fundsType}
      />
    </s.ContainerFunds>
  </FullHeightCard>
)

export default DesktopView
